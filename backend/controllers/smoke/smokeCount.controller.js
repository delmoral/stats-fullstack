const smokeCountModel = require('../../models/smoke/smokeCount');

smokeCountController = {}

// Crear smokeCount para fecha nueva            X

// Find SmokeCounts by smokeID                  X
// Find SmokeCount by fecha y smokeID           X

// Añadir +1 Cigarro a fecha "hoy"              X~~
// Borrar -1 Cigarro                            X~~

/** POST
 * Recibe smokeDate e smokeId, comprueba si existe registro, y si no existe lo crea.
 * req.body: smokeId,smokeDate
 * res: ok / ko
 */
smokeCountController.createSmokeCountByDate = async (req,res,err) =>{
    // Buscamos un registro de la misma fecha
    let counts = await smokeCountModel.findOne(({ smokeId: req.body.smokeId, smokeDate: req.body.smokeDate}));
    // Existe, 
    if(!counts){
        const newSmokeCount = new smokeCountModel({
            smokeId: req.body.smokeId,
            smokeDate: req.body.smokeDate,
            cigarretes: 0
        })
        await newSmokeCount.save();
        res.send({
            ok: true,
            message: 'Smoke count added'
        })
    } else{
        res.send({
            ok:false,
            message: 'Smoke Count already exists for this date'
        })
    }
}

/** GET
 * Recibe smokeId y devuelve todos los smokeCount asociados.
 * req.params: smokeId
 * res: [SmokeCount] / ko
 */
smokeCountController.findSmokeCountsBySmokeId = async (req,res,err) =>{
    let smokeCounts = await smokeCountModel.find({smokeId: req.params.smokeId});
    if(smokeCounts){
        res.json(smokeCounts);
    } else{
        res.send({
            ok: false,
            message: 'No counts for the provided smokeId'
        })
    }
}

/** GET
 * Recibe smokeId y smokeDate y devuelve el smokeCount.
 * req.params: smokeId, smokeDate
 * res: smokeCount / ko
 */
smokeCountController.findSmokeByDateAndSmokeId = async (req,res,err) =>{
    let smokeCount = await smokeCountModel.findOne(({smokeId: req.params.smokeId, smokeDate: req.params.smokeDate}));
    if(smokeCount){
        res.json(smokeCount);
    } else{
        res.send({
            ok: false,
            message: 'No smokeCount found'
        })
    }
}

/** POST
 * Recibe un SmokeCount y actualiza el valor de cigarretes +1  
 * -- actualiza consumed de Smoke padre
 * req.body: SmokeCount
 * res: ok / ko
 */
smokeCountController.addCigarrete = async (req,res,err) =>{
    let id = req.body.smokeCount._id;
    try{
        await smokeCountModel.findByIdAndUpdate(id, {$set: {cigarretes: req.body.smokeCount.cigarretes + 1}});
        res.send({
            ok: true,
            message: 'Smoke Count updated'
        })
    } catch(err){
        res.send({
            ok: false,
            message: 'Couldnt update smokeCount'
        })
    }
}

/** POST
 * Recibe un smokeCount y actualiza el valor de cigarretes -1
 * -- actualiza consumed de Smoke padre
 * req.body: smokeCount
 * res: ok / ko
 */
smokeCountController.deleteCigarrete = async (req,res,err) =>{
    let id = req.body.smokeCount._id;
    try{
        await smokeCountModel.findByIdAndUpdate(id, {$set: {cigarretes: req.body.smokeCount.cigarretes - 1}});
        res.send({
            ok: true,
            message: 'Smoke Count updated'
        })
    } catch(err){
        res.send({
            ok: false,
            message: 'Could not update smokeCount'
        })
    }
}

module.exports = smokeCountController;