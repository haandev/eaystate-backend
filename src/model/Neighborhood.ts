import { sequelize, DataTypes, Model } from "@ooic/core";

export class Neighborhood extends Model {
  id: number;
  title: string;
  /* type definitions */
}

Neighborhood.init(
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
    tableName: "neighborhood",
    sequelize,
  }
);
