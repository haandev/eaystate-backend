import { SmartModel } from "@/model/SmartModel";
import { RequestHandler } from "@ooic/core";
import bcrypt from "bcryptjs";

export const update: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const smartModel = await SmartModel.findByPk(id);
    await smartModel.update({
      ...request.body,
    });
    response.send(smartModel);
  } catch (error) {
    next(error);
  }
};

export default update;
