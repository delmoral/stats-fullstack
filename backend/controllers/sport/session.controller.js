const sessionModel = require('../../models/sport/session');
const excerciseModel = require('../../models/sport/exercise');

const sessionController = {}

// Ver sesiones por sportID         X
// Ver detalle de sesión por id     X
// Buscar sesion por sessionDate    X~~

// Crear sesion nueva               X
// Borrar sesion                    X
// Editar sesion                    X

// Añadir ejercicio a lista         X
// Borrar ejercicio de lista        X

/** GET
 * Recibe sportID y devuelve todas las sesiones
 * req.params: sportId
 * res: sessions / ko
 */
sessionController.findSessionsBySportId = async (req,res,err) =>{
    const sessions = await sessionModel.find({ sportId: req.params.sportId })
    res.json(sessions);
}

/** GET
 * Recibe sessionID y encuentra la Sesión
 * req.params: sessionID
 * res: session / ko
 */
sessionController.findSessionById = async (req,res,err) =>{
    await sessionModel.find({ _id: req.params.sessionId}, (err,session) =>{
        if(err) res.status(404).end();
        res.json(session);
    });
}

/** GET
 * Recibe sessionDate y encuentra la Sesión 
 *  (quizá necesario recibir también el sportId)
 * req.params: sessionDate
 * res: session / ko
 */
sessionController.findSessionByDate = async (req,res,err) =>{
    await sessionModel.find({ sessionDate: req.params.sessionDate}, (err,session) =>{
        if(err) res.status(404).end();
        res.json(session);
    });
}

/** POST
 * Recibe un sportId y sessionDate para crear Sesíon nueva
 * req.body: sportId, sessionDate
 * res: ok / ko
 * sessionDate = 150220 -> día mes año
 */
sessionController.createSession = async (req,res,err) =>{
    const newSession = new sessionModel({
        sportId: req.body.sportId,
        sessionDate: req.body.sessionDate
    });
    await newSession.save();
    res.send({
        ok: true,
        message: 'Session created successfully'
    });
}

/** DELETE
 * Podemos borrar por sessionID, o por sportId y sessionDate 
 *  (Borrar también los ejercicios?)
 * req.params: sessionId, sportId, sessionDate
 * res: ok / ko
 */
sessionController.deleteSession = async (req,res,err) =>{
    if(req.params.sessionId){
        await sessionModel.findByIdAndDelete(req.params.sessionId);
        res.send({
            ok: true,
            message: 'Session deleted'
        });
    } else if(req.params.sportId && req.params.sessionDate){
        await sessionModel.findOneAndDelete({
            sportId: req.params.sportId,
            sessionDate: erq.params.sessionDate
        });
        res.send({
            ok: true,
            message: 'Session deleted'
        });
    } else{
        res.status(404).end();
    }
}

/** POST
 * Recibe sessionId (¿o sportId y sessionDate?) y datos en body para actualizar sesión
 * req.params: sessionId
 * req.body: session
 * res: ok / ko
 */
sessionController.editSession = async (req,res,err) =>{
    const { id } = req.params;
    const session = {
        // sportId no se puede cambiar
        sessionDate: req.body.sessionDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }
    await sessionModel.findByIdAndUpdate(id, {$set: session});
    res.send({
        ok: true,
        message: 'Session updated'
    });
}

/** POST
 * Recibe sessionID y exerciseId y actualiza la lista 
 * req.params: sessionId, excerciseId
 * res: ok / ko
 */
sessionController.addExerciseById = async (req,res,err) =>{
    // Añadimos con push el nuevo ejercicio YA EXISTENTE 
    // (¿almacenar ejercicios predefinidos?) nombres predefinidos para problema con series/reps
    await sessionModel.findOneAndUpdate({_id: req.params.sessionId} , 
        {$push: {exercises: req.params.exerciseId}})
    res.send({
        ok: true,
        message: 'Excercise ' + req.body.exerciseId + ' added to sessionId '+ req.body.sessionId
    });
}

/** POST/DELETE
 * Busca el excerciseId en la lista y lo quita. (Borramos también ejercicio).
 * req.params: sportID, sessionID 
 * res: ok / ko
 */
sessionController.removeExerciseById = async (req,res,err) =>{
    // Quita ese ejercicio
    await sessionModel.findOneAndUpdate({_id: req.params.sessionId}, 
        {$pull: {_id: req.params.exerciseId}});
    await excerciseModel.findByIdAndDelete(req.params.exerciseId);
    res.send({
        ok: true,
        message: 'Excercise removed. Also from sessionId '+ req.body.sportId
    });
}

module.exports = sessionController;