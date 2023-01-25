import { SmartModel } from "@/model/SmartModel";
import { RequestHandler } from "@ooic/core";

export const getById: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const smartModel = await SmartModel.findByPk(id);
    response.send(smartModel);
  } catch (error) {
    next(error);
  }
};

export default getById;
