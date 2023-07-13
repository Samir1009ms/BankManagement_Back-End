const jwt = require("jsonwebtoken");
const { request } = require("express");


const auth = (req, res, next) => {
  let token = req.headers.authorization
try{
   jwt.verify(token, process.env.JWT_SECRET);
   res.status(200).send(true)

}catch (error) {
  res.status(500).send(false);

}}

module.exports = auth


