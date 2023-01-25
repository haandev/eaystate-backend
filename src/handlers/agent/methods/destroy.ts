import { Agent } from "@/model/Agent";
import { RequestHandler, StatusCodes } from "@ooic/core";

export const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const agent = await Agent.findByPk(id);

    agent.destroy();
    response.status(StatusCodes.OK).send(agent);
  } catch (error) {
    next(error);
  }
};

export default destroy;
