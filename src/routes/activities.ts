import express from "express";
import activitiesController from "../controller/activities.controller";
import activityValidator from "../middleware/validation/activitiesValidation";

const router = express.Router();

router.get("/", activitiesController.getAll);
router.get("/:id", activitiesController.getOne);
router.post("/", activityValidator.validation, activitiesController.Create);
router.patch("/:id", activityValidator.validation, activitiesController.Update);
router.delete("/:id", activitiesController.Delete);

export default router;
