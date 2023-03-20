import db, { DataTypes } from "../helper/database.js";

const Todo = db.define(
  "Todo",
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true
    },
    short_description: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_completed: DataTypes.BOOLEAN,
    is_deleted: DataTypes.BOOLEAN,
    created: DataTypes.DATE,
    modified: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "todo",
    timestamps: false
  }
);

export default Todo;
