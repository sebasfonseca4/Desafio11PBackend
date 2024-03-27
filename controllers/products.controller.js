import ProductDAO from "../daos/products.dao.js";
import UsersDAO from "../daos/users.dao.js";
import CartDAO from "../daos/carts.dao.js";

const GetProducts = async (req, res) => {
    try {
        const products = await ProductDAO.getAll();
        const userId = req.session.user;
        const user = await UsersDAO.getUserByID(userId);
        res.render("products", { user, products });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error obteniendo productos");
      }
}

const GetProductById = async (req, res) => {
  const { pid } = req.params;
  try {
      const product = await ProductDAO.getById(pid);
      res.render('detailProduct', { product });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo detalle del producto');
  }
}

const AddProductCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const userId = req.session.user;
    await CartDAO.addProduct(userId, productId);
    res.redirect("/store/products");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error agregando producto al carrito");
  }
}

export default  {
    GetProducts,
    GetProductById,
    AddProductCart
}