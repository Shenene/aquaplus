import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";
import Exhibit from "./exhibit.js";

const SavedExhibit = sequelize.define(
  "SavedExhibit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    exhibitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exhibit,
        key: "id",
      },
    },

    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    tableName: "saved_exhibits",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "exhibitId"],
      },
    ],
  },
);

export default SavedExhibit;
