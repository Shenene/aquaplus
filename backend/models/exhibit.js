import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exhibit = sequelize.define(
  "Exhibit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    summary: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    habitat: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    diet: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    lifespan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    conservationStatus: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    mobileImageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "exhibits",
    timestamps: true,
  },
);

export default Exhibit;
