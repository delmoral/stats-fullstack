const jwt = require('jsonwebtoken');

const authService = {};

authService.generateToken = (user) =>{
    const u = {
        username: user.name,
        id: user.id
    }

    return token = jwt.sign(u, process.env.TOKEN_SECRET, {
        expiresIn: 60*60*24
    })
}

module.exports = authService;