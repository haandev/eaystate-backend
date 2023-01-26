import * as handlers from "@/handlers";
import { zod } from "@ooic/core";
import { RouteGroupModuleType } from "@ooic/router";

const Model: RouteGroupModuleType = {
  handler: [handlers.auth.verifyToken],
  routes: [
    {
      method: "post",
      schema: {
        body: zod.object({
          tableName: zod.string(),
          modelName: zod.string(),
          singular: zod.string(),
          plural: zod.string(),
          description: zod.string(),
          icon: zod.string().optional(),
          isHierarchy: zod.boolean(),
          userOwnable: zod.boolean(),
          groupOwnable: zod.boolean(),
          sortable: zod.boolean(),
          paranoid: zod.boolean(),
        }),
      },
      handler: [handlers.smartModel.create],
    },
    {
      method: "get",
      handler: [handlers.smartModel.list],
      schema: {
        query: zod.object({
          pageIndex: zod.number(),
          pageSize: zod.number(),
          sortBy: zod.string(),
          sortType: zod.string(),
        }),
      },
    },
    {
      path: "/:id",
      method: "get",
      schema: {
        params: zod.object({
          id: zod.string().regex(/^\d+$/).transform(Number),
        }),
      },
      handler: [handlers.smartModel.getById],
    },
    {
      path: "/:id",
      method: "put",
      handler: [handlers.smartModel.update],
      schema: {
        params: zod.object({
          id: zod.string().regex(/^\d+$/).transform(Number),
        }),
        body: zod.object({}),
      },
    },
    {
      path: "/:id",
      method: "delete",
      schema: {
        params: zod.object({
          id: zod.string().regex(/^\d+$/).transform(Number),
        }),
      },
      handler: [handlers.smartModel.destroy],
    },
  ],
};
export default Model;
