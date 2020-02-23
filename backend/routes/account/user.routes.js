const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../../controllers/account/user.controller');

/** MIDDLEWARE  ~~~~
 * Para cada petición a raíz comprueba el token, si es correcto establece un user.
 * Solo se accede a /secure con un user.
 * en este caso devuelve el usuario, ¿quizá modificarlo?
 */
router.use('/', (req,res,next)=>{
    let token = req.headers['authorization'];
    if(!token){
        req.user = null;
        next();
        return;
    }

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err){
            req.user = null;
            next();
        } else{
            req.user = user;
            next();
        }
    })
})

/** MIDDLEWARE
 * Comprueba que en la pecitión viene un user, lo deja pasar.
 * En router.use('/) se establece user si el token es correcto.
 * de lo contrario devuelve 401 Unautorized
 */
router.use('/secure', (req,res,next)=>{
    if(req.user === null){
        res.status(401).send({
            ok: false,
            message: 'Invalid Token'
        });
        return
    }
    next();
})

// Ruta test
router.get('/', (req, res) =>{
    res.json({
        status: 'Api works'
    })
});

// public
router.post('/singup', userController.singup);
router.post('/login', userController.login);
router.get('/usernameValidate/:username', userController.usernameValidate);

// private
router.get('/secure/relogin', userController.relogin);
router.get('/secure/profile/:user', userController.getUserByUsername);
router.put('/secure/avatar', userController.updateAvatar);
router.put('/secure/profile', userController.updateProfile);
router.delete('/secure/delete/:id', userController.deleteUser);

module.exports = router;