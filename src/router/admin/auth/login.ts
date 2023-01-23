import { SingleRouteModuleType } from "@ooic/router";
import { zod } from "@ooic/core";
import * as handlers from "@/handlers";

const Login: SingleRouteModuleType = {
  method: "post",
  handler: [handlers.auth.login],
  schema: {
    body: zod.object({
      username: zod.string(),
      password: zod.string(),
    }),
  },
};

export default Login;
