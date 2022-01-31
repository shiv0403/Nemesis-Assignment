const {
  data_get,
  data_post,
  data_delete,
} = require("../controllers/dataController");
const router = require("express").Router();

router.get("/data-get", data_get);
router.post("/data-post", data_post);
router.post("/data-delete", data_delete);

module.exports = router;
