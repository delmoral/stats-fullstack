const smokeProdTemplateModel = require('../../models/smoke/smokeProduct');

smokeProdTemplateController = {}

// Find all products                    X
// Find product by ID --NO              
// Find product by Name --NO            

// Crear producto                       X
// Editar producto                      X
// Borrar producto                      

/** GET
 * Devuelve todos los productos
 * req: n/a
 * res: [Productos] / ko
 */
smokeProdTemplateController.findProducts = async (req,res,err) =>{
    try{
        const productos = await smokeProdTemplateModel.find();
        res.json(productos);
    } catch(err){
        res.send({
            ok: false,
            message: 'Couldnt find any product. Detail: ' + err
        })
    }
}

/** NO? 
 * 
 */
smokeProdTemplateController.findProductsById = (req,res,err) =>{
    
}

/** NO
 * 
 */
smokeProdTemplateController.findProductsByName = (req,res,err) =>{
    
}

/** POST
 * Recibe un SmokeProdTemplate (prodName, prodPrice) y crea el documento.
 * req.body: SmokeProdTemplate(prodName, prodPrice)
 * res: ok / ko
 */
smokeProdTemplateController.createProduct = async (req,res,err) =>{
    const newSmokeProdTemplate = new smokeProdTemplateModel({
        prodName: req.body.smokeProdTemplate.prodName,
        prodPrice: req.body.smokeProdTemplate.prodPrice
    })
    try{
        await newSmokeProdTemplate.save();
        res.send({
            ok: true,
            message: 'Product created'
        })
    } catch(err){
        res.send({
            ok: false,
            message: 'Couldnt create product. Detail: ' + err
        })
    }
}

/** POST
 * Recibe SmokeProdTemplate(_id, prodName,prodPrice) y actualiza el documento
 * req.body: SmokeProdTemplate(_id, prodName,prodPrice)
 * res: ok / ko
 */
smokeProdTemplateController.editProduct = async (req,res,err) =>{
    let idProducto = req.body.smokeProdTemplate._id;
    const updatedProd = {
        prodName: req.body.smokeProdTemplate.prodName,
        prodPrice: req.body.smokeProdTemplate.prodPrice
    }
    try{
        await smokeProdTemplateModel.findByIdAndUpdate(idProducto, updatedProd);
        res.send({
            ok:true,
            message: 'Product edited'
        })
    } catch(err){
        res.send({
            ok:false,
            message: 'Couldt edit product. Detail: ' + err
        })
    }
}

/** POST/DELETE
 * Recibe el id del producto y elimina el documento
 * req.params: id
 * res: ok / ko
 */
smokeProdTemplateController.deleteProduct = async (req,res,err) =>{
    try{
        await smokeProdTemplateModel.findByIdAndDelete(req.params.id);
        res.send({
            ok:true,
            message: 'Product deleted'
        })
    } catch(err){
        res.send({
            ok:false,
            message: 'Couldt delete product. Detail: ' + err
        })
    }
}

module.exports = smokeProdTemplateModel;