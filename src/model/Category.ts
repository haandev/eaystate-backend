import { sequelize, DataTypes, Model, HierarchicalModel } from "@ooic/core";

export class Category extends HierarchicalModel {
  id: number;
  /* type definitions */
}

Category.init(
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
    /* field initialization */
  },
  {
    tableName: "category",
    sequelize,
  }
);

Category.initHierarchy()