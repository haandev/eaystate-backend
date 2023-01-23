import { SingleRouteModuleType } from "@ooic/router";
import { zod } from "@ooic/core";
import * as handlers from "@/handlers";

const RefreshToken: SingleRouteModuleType = {
  method: "post",
  handler: [handlers.auth.refreshToken],
};

export default RefreshToken;
