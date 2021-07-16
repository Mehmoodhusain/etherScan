// IMPORT FILES
const { login } = require("../controller/signin");
const { dashboard } = require("../controller/dashboard");
const { signup } = require("../controller/signup");
const { balance } = require("../controller/balance");
const { search } = require("../controller/search");
const { etherValue } = require("../controller/etherValue");
const { transaction } = require("../controller/transaction");
const { errorFunction } = require("../middleware/errorFunction");
const { jwtVerification } = require("../middleware/tokenVerification");

// IMPORT LIBRARIES
const router = require("express").Router();

// ROUTES
router.post("/signup", errorFunction(signup));
router.post("/etherValue", errorFunction(etherValue));
router.post("/signin", errorFunction(login));
router.post("/balance", errorFunction(balance));
router.get("/dashboard", jwtVerification, errorFunction(dashboard));
router.post("/transaction", jwtVerification, errorFunction(transaction));
router.get("/search", errorFunction(search));

module.exports = router;