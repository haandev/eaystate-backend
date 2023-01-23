import { sequelize, DataTypes, Model } from "@ooic/core";

export class Province extends Model {
  id: number;
  title: string;

  /* type definitions */
}

Province.init(
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
    tableName: "province",
    sequelize,
  }
);

