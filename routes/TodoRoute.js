const express = require("express")
const router = express.Router()
const TodoController = require("../controllers/TodoController")
const isAuthenticated = require("../middleware/isAuthenticated")

router.use(isAuthenticated)

router.get("/", TodoController.getTodolist)
router.post("/", TodoController.createTodo)
router.put("/:id", TodoController.updateStatusTodo)
router.delete("/:id", TodoController.deleteTodo)


module.exports = router