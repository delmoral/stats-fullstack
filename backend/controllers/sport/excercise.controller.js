const exerciseModel = require('../../models/sport/exercise');

const exerciseController = {}

// Ver todos los ejercicios por session     X

// Crear ejercicio nuevo                    X
// Borrar ejercicio                         X
// Editar ejercicio                         X~~

// Añadir serie (indicando repeticiones)    X~~

/** GET
 * Recibe sessionId y devuelve sus ejercicios
 * req.params: sessionId
 * res: Exercises / ko
 */
exerciseController.findExercisesBySessionId = async (req,res,err) =>{
    await exerciseModel.find({ sessionId: req.params.sessionId}, (err,sessions) =>{
        if(err) res.status(404).end();
        res.json(sessions);
    });
}

/** POST
 * Recibe sessionId y nombre y crea el ejercicio.
 * req.body: sessionId, exerciseName
 * res: ok / ko
 */
exerciseController.createExercise = async (req,res,err) =>{
    const exercise = new exerciseModel({
        sessionId: req.body.sessionId,
        exerciseName: req.body.exerciseName
    })
    console.log(exercise);
    await exercise.save();
    res.send({
        ok: true,
        message: 'Excercise created'
    });
}

/** POST/DELETE
 * Recibe exerciseId y lo borra
 * req.params: exerciseId
 * res: ok / ko
 */
exerciseController.deleteExercise = async (req,res,err) =>{
    await exerciseModel.findByIdAndDelete(req.params.exerciseId);
    res.send({
        ok: true,
        message: 'Exercise deleted'
    })
}

/** POST
 * Recibe Exercise y lo modifica segun Exercise._id
 * req.params: exerciseId
 * req.body: Exercise
 * 
 */
exerciseController.editExercise = async (req,res,err) =>{
    const id  = req.params.id;
    const exercise = {
        sessionId: req.body.sessionId,
        exerciseName: req.body.exerciseName,
        series: req.body.series,
        reps: req.body.reps
    }
    await exerciseModel.findByIdAndUpdate(id, exercise);
    res.send({
        ok: true,
        message: 'Exercise updated'
    })
}

/** POST
 * Recibe exerciseId, series y repeticiones. Modifica el ejercicio.
 * req.body: exerciseId, series, reps
 * res: ok/ ko
 */
exerciseController.addSerieByExercise = async (req,res,err) =>{
    // Requiere test!!!!!!!!
    await exerciseModel.findOneAndUpdate({_id: req.body.exerciseId}, 
        ({series: (req.body.series + 1), reps: req.body.reps}) );
    res.send({
        ok: true,
        message: 'Excercise updated with new serie'
    });
}

module.exports = exerciseController;