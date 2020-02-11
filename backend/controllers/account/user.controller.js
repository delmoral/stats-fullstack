const userModel = require('../../models/account/user');
const sportModel = require('../../models/sport/sport');
const smokeModel = require('../../models/smoke/smoke');
const authService = require('../../services/auth.service');
const bcrypt = require('bcrypt');

const userController = {};

/**
 * Crear nuevo perfil - crea también Sport y Smoke...
 * req.body: name, userName, password, email, phoneNumber, avatar
 * res: ok / ko
 */
userController.singup = async (req, res, err) => {
    const newUser = new userModel({
        name: req.body.name,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        avatar: req.body.avatar
    });
    //let newSport;
    let newSmoke;
    let userID;
    // Crear nuevo Sport y Smoke asociados a la id que genera el nuevo User
    try{
        await newUser.save((user)=>{
            newUserID = user._id;
        });
// Es correcto varias awaits?
        const newSport = await new sportModel({
            userId: newUserID,
            sessions: []
        }).save();

        const newSmoke = await new smokeModel({
            userId: newUserID,
            spent: 0,
            consumed: 0
        }).save();

        res.send({
            ok: true,
            body: {
                profile: newUser
            }
        });
    }catch(err){
        res.send({
            ok: false,
            message: 'error: '+err
        })
    }
};

/**
 * Inicia sesión dado un usuario y contraseña
 * req: userName, password
 * res: ok, body.user, body.token / ko
 */
userController.login = async (req,res,err) =>{
    try{
        let user = await userModel.findOne({ userName: req.body.userName});
        if(user === null){
            res.send({
                ok: false,
                message: 'User not found'
            })
            //return
        }
        
        bcrypt.compare(req.body.password, user.password, (err, valid) =>{
            if(!"valid"){
                res.send({
                    ok: false,
                    message: "Invalid password"
                });
            }

            let userToken = {
                username: req.body.userName,
                id: user._id
            }
            let token = authService.generateToken(userToken);

            await userModel.findByIdAndUpdate({_id:user._id}, {
                $set: {
                    lastLogin: Date.now
                }
            })
            
            res.send({
                ok: true,
                body: {
                    user: user
                },
                token: token

            })
        })
    }catch(err){
        res.send({
            ok: false,
            message: 'Error logging in: '+err
        })
    }
};

/**
 * Validar campo Unico userName
 * req.params: username
 * res: ok / ko
 */
userController.usernameValidate = (req,res,err)=>{
    try{
        await userModel.find({ userName: req.params.username});
        if(users.length > 0) throw {message: 'User used'}
        res.status(200).send({
            ok:true,
            message: 'User avaible'
        })
    }catch(err){
        res.status(200).send({
            ok:false,
            message: 'User unavaible'
        })
    }
};

/**
 * 
 */
userController.relogin = async (req,res,err)=>{
    let userToken = {
        id: req.user.id,
        username: req.user.username
    }
    let newToken = authService.generateToken(userToken);

    try{
        await userModel.findOne({_id: req.user.id});
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
                    
                }, 
                token: newToken
            })
        }
    }catch(err){
        res.send({
            ok:false,
            message: "Error finding user"
        })
    }
};

/**
 * Recibe el nombre de usuario y devuelve objeto User
 * req.params: username
 * res: ok, User / ko
 */
userController.getUserByUsername = async (req,res,err) =>{
    let user = req.params.user;
    if(user === null){
        res.send({
            ok: false,
            message: "'user' param required"
        })
    }
    try{
        await userModel.findOne({userName: username})
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
    }catch(err){
        res.send({
            ok: false,
            message: "Erorr getting user data"
        })
    }
}

/**
 * Recibe nombre de usuario y avatar (gestionado con multer) y actualiza ese campo del perfil
 * req.body: userName, avatar
 * req: ok, message / ko, message
 */
userController.updateAvatar = async (req, res, err) =>{
    let username = req.body.username;
    const newAvatar = {
        avatar: req.body.avatar
    }

    try{
        await userModel.update({ userName: username }, newAvatar);
        res.send({
            ok:true,
            message: "Avatar updated"
        });
    } catch(err){
        res.send({
            ok:false,
            message: "Error updating avatar"
        })
    }
}

/**
 * Recibe un body User y actualiza el perfil con los campos recibidos.
 * req.body: name, password, email, phoneNumber
 * res: ok, message / ko, message
 */
userController.updateProfile = async (res, res, err) =>{
    let username = req.body.user.userName;
    const updates = {
        name: req.body.name,
        
    }
    try{
        await userModel.update({userName: username}, req.body.user);
        res.send({
            ok:true,
            message: "User updated"
        });
    } catch(err){
        res.send({
            ok:false,
            message: "Error updating user: " + err
        });
    }
}

// Falta contemplar el borrado de los Sport, Smoke y demás objetos asociados
/**
 * 
 */
userController.deleteUser = async (req,res,err) =>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.res({
            ok: true,
            message: "User deleted"
        })
    } catch(err){
        res.send({
            ok:false,
            message: "Error deleting user"
        })
    }
}

module.exports = userController;