import { sequelize, DataTypes, Model } from "@ooic/core";

export class Company extends Model {
  id: number;
  title: string;
}

Company.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    /* field initialization */
  },
  {
    tableName: "company",
    sequelize,
  }
);
