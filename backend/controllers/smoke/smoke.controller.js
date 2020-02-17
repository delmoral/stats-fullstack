const smokeModel = require('../../models/smoke/smoke');

smokeController = {}

// Encontrar Smoke por userID       X

// Acualizar spent                  
// Actualizar consumed              

/** GET
 * Recibe userId y devuelve Smoke
 * req.params: userId
 * res: Smoke / ko
 */
smokeController.findSmokeByUserID = async (req,res,err) =>{
    try{
        let smoke = await smokeModel.find({userId: req.params.userId});
        res.json(smoke);
    } catch(err){
        res.send({
            ok: false,
            message: 'Error -> ' + err
        })
    }
}

/**
 * 
 */
smokeController.updateSpend = (req,res,err) =>{

}

/**
 * 
 */
smokeController.updateSpend = (req,res,err) =>{

}

module.exports = smokeController;