const express = require("express");
const ctrl = require("../../controllers/users");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemasJoi } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasJoi.registerSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemasJoi.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemasJoi.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemasJoi.updateSubscription),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
