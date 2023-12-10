const TodoModel = require("../models/TodoModel");

class TodoController {
  async getTodolist(req, res) {
    const userId = req.user.id;
    try {
      const data = await TodoModel.getTodolist(userId);
      res.status(200).json({data: data});
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  async createTodo(req, res) {
    try {
      const { task, description } = req.body;
      const userId = req.user.id;

      await TodoModel.createTodo({
        task: task,
        description: description,
        user_id: userId,
      });

      res.status(201).json({
        status: 201,
        message: "Successfully create todo",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  async updateStatusTodo(req, res) {
    try {
      const { status } = req.body;

      await TodoModel.updateStatusTodo(
        req.params.id,
        status
      );

      res.status(201).json({
        status: 201,
        message: "Successfully update status",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  async deleteTodo (req, res) {
    try {
      await TodoModel.deleteTodo(req.params.id)
      res.status(201).json({
        status: 201,
        id: req.params.id,
        message: "Todo deleted"
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message
      })
    }
  }
}

module.exports = new TodoController();
