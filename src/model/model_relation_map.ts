import { User } from "./User";
import { Login } from "./Login";
import { Agent } from "./Agent";
import { Company } from "./Company";
import { Neighborhood } from "./Neighborhood";
import { City } from "./City";
import { Province } from "./Province";
import { Estate } from "./Estate";
import { Feature } from "./Feature";
import { Category } from "./Category";
import { Value } from "./Value";
import { SmartField } from "./SmartField";
import { SmartModel } from "./SmartModel";
import { SmartRelation } from "./SmartRelation";

const pagerScopeFactory = (params) => {
  const { pageIndex, pageSize } = params;
  return {
    attributes: { exclude: ["password"] },
    offset: (pageIndex - 1) * pageSize,
    limit: pageSize,
  };
};
const localeScopeFactory = (locale) => ({
  include: [
    {
      association: "locales",
      ...(locale ? { where: { locale } } : {}),
      required: false,
    },
  ],
});
const byOwnerScopeFactory = (userId: number) => ({
  where: { ownerId: userId },
});



SmartField.belongsTo(SmartModel, { as: "model", foreignKey: "modelId" });

SmartRelation.belongsTo(SmartModel, {as: "sourceModel", foreignKey:"sourceModelId"})
SmartRelation.belongsTo(SmartModel, {as: "targetModel", foreignKey:"targetModelId"})

Login.belongsTo(User, { foreignKey: "userId" });

Agent.belongsTo(Company, { foreignKey: "companyId", as: "company" });
Company.hasMany(Agent, { foreignKey: "companyId", as: "agents" });

Neighborhood.belongsTo(City, { foreignKey: "cityId", as: "city" });
City.hasMany(Neighborhood, { foreignKey: "cityId", as: "neighborhoods" });

City.belongsTo(Province, { foreignKey: "provinceId", as: "provinces" });
Province.hasMany(City, { foreignKey: "provinceId", as: "cities" });

Estate.belongsTo(Neighborhood, {
  foreignKey: "neighborhoodId",
  as: "neighborhood",
});
Neighborhood.hasMany(Estate, { foreignKey: "neighborhoodId", as: "estates" });

Agent.belongsToMany(Estate, { as: "estates", through: "estate_agent" });
Estate.belongsToMany(Agent, { as: "agents", through: "estate_agent" });

Feature.belongsToMany(Category, {
  as: "categories",
  through: "category_feature",
});
Category.belongsToMany(Feature, {
  as: "features",
  through: "category_feature",
});

Estate.hasMany(Value, { foreignKey: "featureId", as: "values" });
Value.belongsTo(Feature, { foreignKey: "featureId", as: "feature" });
Value.belongsTo(Estate, { foreignKey: "estateId", as: "estate" });

Company.addScope("pager", pagerScopeFactory);
Agent.addScope("pager", pagerScopeFactory);
SmartModel.addScope("pager",pagerScopeFactory)