const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemasJoi } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemasJoi.addSchema), ctrl.add);

router.put(
  "/:id",
  isValidId,
  validateBody(schemasJoi.putSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemasJoi.patchSchema),
  ctrl.updateFavorite
);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
