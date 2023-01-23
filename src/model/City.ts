import { sequelize, DataTypes, Model } from "@ooic/core";

export class City extends Model {
  id: number;
  title: String;
  /* type definitions */
}

City.init(
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
    tableName: "city",
    sequelize,
  }
);
