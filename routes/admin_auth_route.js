const { SignUp, SignIn } = require("../controllers/admin_authController");

const router = require("express").Router();

router.post("/sign_up", SignUp);
router.post("/sign_in", SignIn);

module.exports = router;
