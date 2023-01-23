import { SingleRouteModuleType } from "@ooic/router";
import { zod } from "@ooic/core";
import * as handlers from "@/handlers";

const Register: SingleRouteModuleType = {
  method: "post",
  handler: [handlers.auth.register, handlers.auth.login],
  schema: {
    body: zod
      .object({
        username: zod.string(),
        password: zod.string(),
        passwordConfirm: zod.string(),
      })
      .refine((data) => data.passwordConfirm === data.password, "Passwords don't match"),
  },
};

export default Register;
