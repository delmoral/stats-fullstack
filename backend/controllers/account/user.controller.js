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

            const user = {
                username: req.body.userName,
                id: user._id
            }
            const token = authService.generateToken(user);

            userModel.findByIdAndUpdate(user._id, {
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

