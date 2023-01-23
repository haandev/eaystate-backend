import { sequelize, DataTypes, Model } from "@ooic/core";

export class Feature extends Model {
  id: number;
  title: string;
  type: "number" | "multiple" | "boolean";
  /* type definitions */
}

Feature.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
    },
    /* field initialization */
  },
  {
    tableName: "feature",
    sequelize,
  }
);
