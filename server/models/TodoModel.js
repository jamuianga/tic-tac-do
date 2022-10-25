import db, { DataTypes } from "../helper/database.js";

const Todo = db.define(
  "Todo",
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATEONLY
    },
    priority: {
      type: DataTypes.STRING
    },
    is_completed: DataTypes.BOOLEAN,
    is_deleted: DataTypes.BOOLEAN,
    created: {
      type: DataTypes.DATE
    },
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
