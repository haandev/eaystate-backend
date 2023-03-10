import * as handlers from "@/handlers";
import { zod } from "@ooic/core";
import { RouteGroupModuleType } from "@ooic/router";

const Agent: RouteGroupModuleType = {
  handler: [handlers.auth.verifyToken],
  routes: [
    {
      method: "post",
      schema: {
        body: zod.object({
          name: zod.string(),
          surname: zod.string(),
          username: zod.string(),
          phone: zod.string(),
          password: zod.string().optional(),
          companyId: zod.number(),
        }),
      },
      handler: [handlers.agent.create],
    },
    {
      method: "get",
      handler: [handlers.agent.list],
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
      handler: [handlers.agent.getById],
    },
    {
      path: "/:id",
      method: "put",
      handler: [handlers.agent.update],
      schema: {
        params: zod.object({
          id: zod.string().regex(/^\d+$/).transform(Number),
        }),
        body: zod.object({
          name: zod.string(),
          surname: zod.string(),
          username: zod.string(),
          phone: zod.string(),
          password: zod.string().optional(),
          companyId: zod.number(),
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
      handler: [handlers.agent.destroy],
    },
  ],
};
export default Agent;
