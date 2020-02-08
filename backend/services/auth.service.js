const jwt = require('jsonwebtoken');

const authService = {};

authService.generateToken = (user) =>{
    const u = {
        username: user.name,
        id: user.id
    }

    return token = jwt.sign(u, '1234', {
        expiresIn: 60*60*24
    })
}

module.exports = authService;