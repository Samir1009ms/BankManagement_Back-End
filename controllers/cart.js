const Cart = require("../models/cart.js");
const addCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.params.id;
    let cart = await Cart.findOne({user:userId})

    if(!cart){
         cart = new Cart({
            user:userId,
            products:[]
        })
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if(productIndex !== -1){
        cart.products[productIndex].count += 1;
    }
    else{
        cart.products.push({product:productId,count:1})
    }
    await cart.save()
    res.send(cart)
  }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
}


const getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "Sepet bulunamadı" });
    }
    res.send(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.params;
  const { count } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ message: "Sepet bulunamadı" });
  }

  const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId
  );
  cart.products[productIndex].count = count
  await cart.save()

  res.status(200).json({ message: "Səbət güncəlləndi", cart });
};


const deleteCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Sepet bulunamadı" });
    }
    // products dizisindeki belirli bir öğeyi kaldırmak için filter() yöntemini kullanın
    cart.products = cart.products.filter((p) => p.product.toString() !== productId);
    await cart.save();
    res.send(cart);

    res.status(201).json({ message: "Ürün sepetten silindi",cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addCart, updateCart, deleteCart }; // export edirik ki, diger fayllarda istifade ede bilek
