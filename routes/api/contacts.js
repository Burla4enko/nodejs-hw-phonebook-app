const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemasJoi } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemasJoi.addSchema), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemasJoi.putSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemasJoi.patchSchema),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
