import db, { DataTypes } from "../helper/database.js";

const User = db.define(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "user",
    timestamps: false
  }
);

export default User;
