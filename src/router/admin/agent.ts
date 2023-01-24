import * as handlers from "@/handlers";
import { zod } from "@ooic/core";
import { RouteGroupModuleType } from "@ooic/router";

const Agent: RouteGroupModuleType = {
  handler: [handlers.auth.verifyToken],
  routes: [
    {
      method: "post",
      schema: {
        body: zod.object({}),
      },
      handler: [],
    },
    {
      method: "get",
      handler: [],
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
      handler: [],
    },
    {
      path: "/:id",
      method: "put",
      handler: [],
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
      handler: [],
    },
  ],
};
export default Agent;