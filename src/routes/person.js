const express = require("express");

const PersonController = require("../controllers/person");

const router = express.Router();

router.post("/", PersonController.createUser);
router.get("/", PersonController.getAllUsers)
router.get('/:name', PersonController.getPersonByName);
router.get('/:id', PersonController.fetchPerson);
router.put("/:name", PersonController.updateUserByName);
router.put("/:id", PersonController.modifyPersonInfo);
router.delete("/:id", PersonController.deletePerson);

module.exports = router;
