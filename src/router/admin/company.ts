import * as handlers from "@/handlers";
import { zod } from "@ooic/core";
import { RouteGroupModuleType } from "@ooic/router";

const Company: RouteGroupModuleType = {
  handler: [handlers.auth.verifyToken],
  routes: [
    {
      method: "post",
      schema: {
        body: zod.object({
          title: zod.string(),
        }),
      },
      handler: [handlers.company.create],
    },
    {
      method: "get",
      handler: [handlers.company.list],
       schema: {
        query: zod.object({
          pageIndex: zod.number(),
          pageSize: zod.number(),
          sortBy: zod.string(),
          sortType: zod.string(),
        }),
      }
    },
    {
      path: "/:id",
      method: "get",
      schema: {
        params: zod.object({
          id: zod.string().regex(/^\d+$/).transform(Number),
        }),
      },
      handler: [handlers.company.getById],
    },
    {
      path: "/:id",
      method: "put",
      handler: [handlers.company.update],
      schema: {
        params: zod.object({
          id: zod.string().regex(/^\d+$/).transform(Number),
        }),
        body: zod.object({
          title: zod.string().optional(),
        }),
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
      handler: [handlers.company.destroy],
    },
  ],
};
export default Company;
