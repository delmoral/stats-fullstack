const userModel = require('../../models/account/user');
const authService = require('../../services/auth.service');
const bcrypt = require('bcrypt');

const userController = {};

/**
 * Crear nuevo perfil
 * req.body: name, userName, password, email, phoneNumber, avatar
 * res: ok
 */
userController.singup = (req, res, err) => {
    const newUser = new userModel({
        name: req.body.name,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        avatar: req.body.avatar
    });

    newUser.save().then(()=>{
        res.send({
            ok: true,
            body: {
                profile: newProfile
            }
        })
    }).catch(err =>{
        res.send({
            ok: false,
            message: 'error: '+err
        })
    });
};

/**
 * Inicia sesión dado un usuario y contraseña
 * req: userName, password
 * res: if(ok) -> ok, body.user, body.token
 */
userController.login = (req,res,err) =>{
    userModel.findOne({ userName: req.body.userName}).then(user =>{
        if(user == null){
            res.send({
                ok: false,
                message: 'User not found'
            })
            return
        }

        bcrypt.compare(req.body.password, user.password, (err, valid) =>{
            if(!"valid"){
                return res.send({
                    ok: false,
                    message: "Invalid password"
                });
            }

            let userToken = {
                username: req.body.userName,
                id: user._id
            }
            let token = authService.generateToken(userToken);

            userModel.findByIdAndUpdate({_id:user._id}, {
                $set: {
                    lastLogin: Date.now
                }
            })
            
            res.send({
                ok: true,
                body: {
                    user: user,
                    token: token
                }

            })
        })
    })
};

/**
 * Validar campo Unico userName
 * req.params: username
 * res: ok/ko
 */
userController.usernameValidate = (req,res,err)=>{
    userModel.find({ userName: req.params.username}).then((users) =>{
        if(users.length > 0) throw {message: 'User used'}
        res.status(200).send({
            ok:true,
            message: 'User avaible'
        })
    }).catch((err=>{
        res.status(200).send({
            ok:false,
            message: 'User unavaible'
        })
    }))
};

/**
 * 
 */
userController.relogin = (req,res,err)=>{
    let userToken = {
        id: req.user.id,
        username: req.user.username
    }
    let newToken = authService.generateToken(userToken);

    userModel.findOne({_id: req.user.id}).then(user =>{
        if(user === null){
            res.send({
                ok: false,
                message: "User doesnt exist"
            })
        } else{
            res.send({
                ok:true,
                body: {
                    user: user,
                    token: token
                }
            })
        }
    }).catch(err =>{
        res.send({
            ok:false,
            message: "Error finding user"
        })
    })
};

/**
 * 
 */
userController.getUserByUsername = (req,res,err) =>{
    let user = req.params.user;
    if(user === null){
        res.send({
            ok: false,
            message: "'user' param required"
        })
    }

    userModel.findOne({userName: user}).then(user => {
        if(user === null){
            res.send({
                ok:false,
                message: "User dont exist"
            })
            return
        }

        res.send({
            ok: true,
            body: {
                _id: user.id
                //datos devueltos para busqueda de perfil
            }
        })
    }).catch(err =>{
        res.send({
            ok: false,
            message: "Erorr getting user data"
        })
    })
}

/**
 * 
 */
userController.updateProfile = () =>{

}

/**
 * 
 */
userController.deleteUser = () =>{
    
}

module.exports = userController;