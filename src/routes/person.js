const express = require("express");

const PersonController = require("../controllers/person");

const router = express.Router();

router.post("/", PersonController.createPerson);
router.get("/", PersonController.getAllPersons)
router.get('/:id', PersonController.fetchPerson);
router.put("/:id", PersonController.modifyPersonInfo);
router.delete("/:id", PersonController.deletePerson);

module.exports = router;
