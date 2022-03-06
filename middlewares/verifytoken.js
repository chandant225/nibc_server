const jwt = require("jsonwebtoken");
const { configs } = require("../configs/configuration");
const { Admin } = require("../models/admin_schema");
function authenticate(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "please login to visit this resource" });
  const payload = jwt.verify(token, configs.JWT_SECRET);
  const { _id } = payload;
  Admin.findById(_id)
    .then((admindata) => {
      req.admin = admindata;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports.authenticate = authenticate;
