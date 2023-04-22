const jwt = require("jsonwebtoken");
const { request } = require("express");

// istifadeci login deyilse login etdirmek ucundur
const auth = (req, res, next) => {
  try {
    // headers token atmaq ucun
    const token = request.headers.authorization.split(" ")[1];
    // tokenin decode olunmasi
    let decodedData;
    // tokenin decode olunmasi
    // if(token){

    //     // tokenin decode olunmasi
    //     decodedData = jwt.verify(token,process.env.JWT_SECRET);
    //     // istifadecinin id si
    //     req.userID=decodedData?.id;
    // }else{
    //     // tokenin yoxdursa decode olunmasi
    //     decodedData = jwt.decode(token);
    //     // istifadecinin id si
    //     req.userID=decodedData?.sub;
    // }

    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decodedData.id, isAdmin: decodedData.isAdmin };
    } else {
      decodedData = jwt.decode(token);
      req.user = { id: decodedData.sub, isAdmin: decodedData.isAdmin };
    }

    // istifadecinin id si
    next();
  } catch (error) {
    // error
    res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
