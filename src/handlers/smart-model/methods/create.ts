import { SmartModel } from "@/model/SmartModel";
import bcrypt from "bcryptjs";
import { RequestHandler, StatusCodes } from "@ooic/core";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const body = request.body;
    
    const smartModel = await SmartModel.create({
      ...body,
    });
    response.status(StatusCodes.CREATED).send(smartModel);
  } catch (error) {
    next(error);
  }
};

export default create;
