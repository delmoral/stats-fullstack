const smokeProductModel = require('../../models/smoke/smokeProduct');
//const smokeProdTemplateModel = require('../../models/smoke/smokeProdTemplate');

smokeProductController = {}

// Find all productos by smokeId                    X
// Find one producto by ID                          

// Añadir producto - spent de Smoke padre           X
// Editar producto - spent de Smoke padre- NO       
// Borrar producto - spent de Smoke padre           X

/** GET
 * Recibe el smokeId y devuelve los productos asociados
 * req.params: smokeId
 * res: [smokeProduct] / ko
 */
smokeProductModel.findProductsBySmokeId = async (req,res,err)=>{
    try{
        const productos = await smokeProductModel.find({smokeId: req.params.smokeId});
        res.json(productos);
    } catch(err){
        res.send({
            ok: false,
            message: 'Error finding products. Detail: ' + err
        })
    }
}

/** GET
 * -- ¿USELESS?
 */
smokeProductModel.findProductById = (req,res,err)=>{

}

/** POST
 * Recibe smokeId, productName y price y crea un nuevo producto. (nombre y price desde el TEMPLATE)
 * -- Actualizar spent?
 * res.body: smokeId, productName, price
 * res: ok / ko
 */
smokeProductModel.addProduct = async (req,res,err)=>{
    const newProduct = new smokeProductModel({
        smokeId: req.body.smokeId,
        productName: req.body.productName,
        price: req.body.price
    })
    try{
        await newProduct.save();
        res.send({
            ok: true,
            message: 'Product added'
        })
    } catch(err){
        res.send({
            ok:false,
            message: 'Error adding product. Detail: ' +err
        })
    }
    
}

/** 
 *      ¿NO DEBERÍA UTILIZARSE? -- SE RECOGEN LOS DATOS DEL TEMPLATE smokeProdTemplate
 */
smokeProductModel.editProduct = (req,res,err)=>{

}

/** POST/DELETE
 * Recibe el smokeProductId y lo borra
 * -- Actualizar spent?
 * req.params: id
 * res: ok / ko
 */
smokeProductModel.deleteProduct = async (req,res,err)=>{
    try{
        await smokeProductModel.findByIdAndDelete(req.params.id);
        res.send({
            ok: true,
            message: 'Product deleted successfully'
        })
    } catch(err){
        res.send({
            ok:false,
            message: 'Couldnt delete the product. Detail: ' + err
        })
    } 
}

module.exports = smokeProductController;