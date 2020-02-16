const sportModel = require('../../models/sport/sport');
const sessionModel = require('../../models/sport/session');

const sportController = {}

// Crear Sport nuevo                X~~
// Borrar Sport                      ~~
// Encontrar Sport por userID       X~~
// Añadir sesión a la lista         X~~
// eliminar sesión de la lista      X


/** POST
 * Crea Sport a partir de un id de usuario proporcionado. 
 * --Sin embargo esto debería ocurrir en la creación del User.
 * req.body: id
 * res: ok / ko
 */
sportController.createSport = async (req,res,err)=>{
    const sport = new sportModel({
        userId: req.body.id
    })
    await sport.save();

    res.send({
        ok: true,
        message: 'Sport created'
    })
}

/** POST
 * Borra Sport a partir de un id de usuario proporcionado.
 * --Sin embargo esto debería ocurrir en la creación del User.
 */
sportController.deleteSport = () =>{

}

/** GET
 * Busca y devuelve un Sport por id de usuario
 * req.params: userID
 * res.body: sport
 */
sportController.findSportById = (req, res, err) => {
    // HAY QUE RELLENAR EL SPORT CON LAS SESSIONES -> POPULATE
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

/** POST
 * Recibe sportID y sessionID y actualiza la lista de sesiones.
 * req.params: sportID, sessionID
 * 
 * res: ok / ko
 */
sportController.addSession = async (req, res, err) =>  {
    // Añadimos con push la nueva sesión YA EXISTENTE. ¿POPULATE?
    await sportModel.findOneAndUpdate({_id: req.params.sportId}, {$push: {sessions: req.params.sessionId}}).populate(sessions);
    res.send({
        ok: true,
        message: 'Session ' + req.body.sessionId + ' added to sportID '+ req.body.sportId
    });
}

/** POST/DELETE
 * Busca el idSesion en la lista y lo elimina. También elimina la sesión. (Debería borrar los ejercicios?)
 * req.params: sportID, sessionID 
 * res: ok / ko
 */
sportController.removeSession = async (req, res, err) => {
    // Borra UNA sesion
    await sportModel.findOneAndUpdate({_id: req.params.sportId}, {$pull: {_id: req.params.sessionId}});
    await sessionModel.findByIdAndDelete(req.params.sessionId);
    res.send({
        ok: true,
        message: 'Session removed. Also from sportID '+ req.body.sportId
    })
}

module.exports = sportController;