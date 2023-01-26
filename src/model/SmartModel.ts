import { sequelize, DataTypes, Model } from "@ooic/core";
import { SmartField } from "./SmartField";
import { SmartRelation } from "./SmartRelation";

export class SmartModel extends Model {
  id: number;
  tableName: string;
  modelName: string;
  singular: string;
  plural: string;
  description: string;
  icon: string;
  isHierarchy: boolean;
  userOwnable: boolean;
  groupOwnable: boolean;
  sortable: boolean;
  paranoid: boolean;
  fields: Array<SmartField>;
  initialized:boolean
  relationsAsSource: Array<SmartRelation>;
  relationsAsTarget: Array<SmartRelation>;
}

SmartModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    tableName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    modelName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    }, 
    singular: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    plural: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isHierarchy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    initialized: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    userOwnable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    groupOwnable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sortable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paranoid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "smartmodel",
    sequelize,
  }
);

SmartModel.sync();
