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
    } else{
        res.send({
            ok: false,
            message: "No sport found"
        })
    }
}

/**
 * Recibe idSesion, lee la lista de sesiones y la añade al final.
 * 
 */
sportController.addSession = (req, res, err) =>  {

}

/**
 * Busca el idSesion en la lista y lo elimina. (Debería borrar la sesión?)
 */
sportController.removeSession = (req, res, err) => {

}

module.exports = sportController;