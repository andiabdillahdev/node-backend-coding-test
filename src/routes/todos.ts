import express from "express";
import todoController from "../controller/todo.controller";
import todosValidation from "../middleware/validation/todoValidation";
import todoValidation from "../middleware/validation/todoValidation";

const router = express.Router();

router.get("/", todoController.GetAll);
router.get("/:id", todoController.GetOne);
router.post("/", todosValidation.validation, todoController.Create);
router.patch("/:id", todoValidation.validation, todoController.Update);
router.delete("/:id", todoController.Delete);

export default router;
