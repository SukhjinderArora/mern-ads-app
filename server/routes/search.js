const router = require("express").Router();

const searchController = require("../controllers/search");

router.get("/", searchController.search);

module.exports = router;
