const sessionModel = require('../../models/sport/session');

// TODOs

const sessionController = {}

// Ver sesiones por sportID         X
// Ver detalle de sesión por id     X~~
// Buscar sesion por sessionDate    

// Crear sesion nueva               X
// Borrar sesion                    
// Editar sesion                    

// Añadir ejercicio a lista         
// Borrar ejercicio de lista        

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
 * res: 
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

/**
 * 
 */
sessionController.deleteSession = (req,res,err) =>{

}

/**
 * 
 */
sessionController.editSession = (req,res,err) =>{

}

/**
 * Recibe sessionID y exercise y actualiza la lista 
 */
sessionController.addExerciseById = (req,res,err) =>{

}

/**
 * 
 */
sessionController.removeExerciseById = (req,res,err) =>{

}

module.exports = sessionController;