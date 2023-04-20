const Post = require("../models/post");

const getPosts = async (req, res) => {
  try {
    // datalarin get sorgununda gelmesi ucun find axtarir (request body dn gelen sorgunu)
    const posts = await Post.find(req.body);
    // const post = await Post.find().lean(); // lean() ile lean object elde edirik
    const products = await Post.find(req.body);
    // const product = products.map(product=>product.products)
    res.send(products);
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPosts = async (req, res) => {
  try {
    // yeni product yaratmaq ucun   yalniz adminler
    const newPost = await Post.create(req.body);
    res.send(newPost);
    res.status(201).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  // productlar haqqinda melumat ucun :id sine gore
  try {
    const { id } = req.params;
    const product = Post.findById(id);
    const detailsPosts = await Post.findById(id);
    // res.send().json([product])
    res.status(200).json(detailsPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUptade = async (req, res) => {
  // productlar deyisdirilmesi ucun melumat ucun :id sine gore  yalniz adminler
  try {
    const { id } = req.params;
    const getUpdate = await Post.findByIdAndUpdate(
      id,
      { name: req.body.name },
      { new: true }
    );

    res.send(getUpdate);
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  // productlar silinmesi ucun melumat ucun :id sine gore yalniz adminler
  try {
    const { id } = req.params;
    const deletePosts = await Post.findByIdAndDelete(id);
    res.send(deletePosts);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  // productlar axtaris ucun melumat ucun :id sine gore
  const { search } = req.query;
  try {
    const title = new RegExp(search, "i");

    const posts = await Post.find({ name: title });

    res.send(posts);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPosts,
  getDetail,
  getUptade,
  deletePost,
  searchPost,
};
