const sportModel = require('../../models/sport/sport');
// ¿sessionModel y exerciseModel?

const sportController = {}

// Encontrar Sport por userID
// Añadir sesión a la lista
// eliminar sesión de la lista


/**
 * Busca y devuelve un Sport por id de usuario
 */
sportController.findSportById = (req, res, err) => {
    let sport = await sportModel.findOne( {userId: req.params.userId});
    if(sport === null){
        
        res.send({
            ok: false,
            body: {
                sport: sport
            }
        })
        //return
    }
}

sportController.addSession = () =>  {

}

module.exports = sportController;