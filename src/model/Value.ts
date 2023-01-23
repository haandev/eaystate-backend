import { sequelize, DataTypes, Model } from "@ooic/core";

export class Value extends Model {
  id: number;
  /* type definitions */
}

Value.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    value: {
        type: DataTypes.STRING(64),
        allowNull: false, 
        unique: true,
      },
    /* field initialization */
  },
  {
    tableName: "value",
    sequelize, 
  }
);
