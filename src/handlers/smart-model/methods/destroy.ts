import { SmartModel } from "@/model/SmartModel";
import { RequestHandler, StatusCodes } from "@ooic/core";

export const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const smartModel = await SmartModel.findByPk(id);

    smartModel.destroy();
    response.status(StatusCodes.OK).send(smartModel);
  } catch (error) {
    next(error);
  }
};

export default destroy;
