const { Router } = require("express");
const controller = require("./controller.js");
const requiredAccess = require("../../middlewares/requiredAccess.js");
const router = Router();
//GET 	/products                                                                             <-- Trae todos los productos
//GET 	/products?category=Monitores&brand=Razer	query={category:"Monitores",brand:"Razer"}	<-- Trae todos los Monitores de marca razer
router.get("/", async (req, res) => {
  try {
    if (req.query)
      res.status(200).json(await controller.getAllProductsBy(req.query));
    else res.status(200).json(await controller.getAllProducts());
  } catch (error) {
    res.status(400).send(error);
  }
});
//GET 	/products/2											                                                      <-- Trae el producto de product_id = 2
//router.use(requiredAccess(2));
router.get("/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    res.status(200).json(await controller.getProductById(product_id));
  } catch (error) {
    res.status(400).send(error);
  }
});
//POST	/products					body={name:"Mouse Pepito",image:"asd.png"...}	                      <-- Crea un nuevo producto. el body debe respetar el modelo Product
router.post("/", async (req, res) => {
  const product = { ...req.body };
  try {
    res.status(200).send(await controller.createProduct(product));
  } catch (error) {
    res.status(400).send(error);
  }
});
//PUT	/products					body={product_id:1,name:"Mouse Pepe"...}	                            <-- Modifica un producto existente . el body debe respetar el modelo Product
router.put("/", async (req, res) => {
  try {
    res.status(200).send(await controller.updateProduct(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});
//DELETE	/products/3									                                                        <-- Borra el producto de product_id = 3 (El borrado es lógico)
router.use(requiredAccess(3));
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    res.status(200).send(await controller.deleteProduct(productId));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
