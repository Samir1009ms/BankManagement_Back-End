const Cart = require("../models/cart.js");
const Auth = require("../models/auth.js");
const Post = require("../models/post.js");
const db = require("../config/database.js");
const mongoose = require("mongoose");

const addCart = async (req, res) => {
  try {
    // userin id sinin goturmek
    const userId = req.body.userId;
    // productin id sini goturmek
    const productId = req.params.id;
    console.log(userId);

    // userin cartini yoxlamaq
    let cart = await Cart.findOne({ user: userId });
    // cartin olub olmadigini yoxlamaq
    if (!cart) {
      // cart yoxdursa yeni cart yaratmaq user id sine gore
      cart = new Cart({ user: userId, products: [] });
    }
    // cartin icindeki productlari goturmek
    // const existingProduct = cart.products.find(p => p.product.toString() === productId);
    // productin olub olmadigini yoxlamaq
    // if (existingProduct) {
    //     // product varsa sayini artirmaq
    //     // existingProduct += 1;
    // } else {
    //     // product yoxdursa yeni product yaratmaq
    //     cart.products.push({product: productId});
    // }
    // cartin icine yeni product yaratmaq
    if (!cart.products.includes(productId)) {
      cart.products.push(productId);
    }

    // carti save etmek
    await cart.save();

    // carti geri qaytarmaq
    res.send(cart);
    res.status(201).json({ message: "Ürün sepete eklendi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await Cart.findOne({ user: userId }).populate("products");
    if (!cart) {
      return res.status(404).json({ message: "Sepet bulunamadı" });
    }
    res.send(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
      try{
        const userId = req.params.userId;
        const productId = req.params.productId;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Səbət Tapılmadı" });
        }

        const cartİndex= cart.products.findIndex(p=>p.toString()===productId)

        if(cartİndex===-1){
            return res.status(404).json({ message: "Səbətdə bu məhsul yoxdur" });
        }

        cart.products[cartİndex].count=req.body.count;

        

        await cart.save();
        // res.send(cart);
        res.status(201).json({ message: "Ürün sayı güncellendi" , cart});

      }
        catch(error){
        res.status(500).json({ message: error.message });
        }

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
    cart.products = cart.products.filter((p) => p.toString() !== productId);
    await cart.save();
    res.send(cart);

    // res.status(201).json({ message: "Ürün sepetten silindi",cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addCart, updateCart, deleteCart }; // export edirik ki, diger fayllarda istifade ede bilek
