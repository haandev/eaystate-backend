import { SingleRouteModuleType } from "@ooic/router";
import { zod } from "@ooic/core";
import * as handlers from "@/handlers";

const PasswordChange: SingleRouteModuleType = {
  method: "post",
  handler: [handlers.auth.verifyToken, handlers.auth.passwordChange],
  schema: {
    body: zod
      .object({
        username: zod.string(),
        newPassword: zod.string(),
        newPasswordConfirm: zod.string(),
        oldPassword: zod.string(),
      })
      .refine((data) => data.newPassword === data.newPasswordConfirm, "Passwords don't match"),
  },
};

export default PasswordChange;
