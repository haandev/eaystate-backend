import { sequelize, DataTypes, Model } from "@ooic/core";

export class Agent extends Model {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  /* type definitions */
}

Agent.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      login: {
        attributes: ["id", "username", "password"],
      },
    },
    tableName: "agent",
    sequelize,
  }
);
