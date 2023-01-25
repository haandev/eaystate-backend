import { Agent } from "@/model/Agent";
import { RequestHandler } from "@ooic/core";

export const getById: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const agent = await Agent.findByPk(id);
    response.send(agent);
  } catch (error) {
    next(error);
  }
};

export default getById;
