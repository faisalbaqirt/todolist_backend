const db = require("../db/db");

class TodoModel {
  async getTodolist(userId) {
    try {
      const data = await db
        .select("*")
        .from("todolist")
        .where("user_id", userId);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createTodo(data) {
    try {
      await db("todolist").insert(data);
    } catch (error) {
      throw error;
    }
  }

  async updateStatusTodo(id, status) {
    try {
      await db("todolist").where("id", id).update({
        status: status
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id) {
    try {
      const result = await db("todolist")
        .where("id", id)
        .delete()
        .returning("id");
      return result[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TodoModel();
