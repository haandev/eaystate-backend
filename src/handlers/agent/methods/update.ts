import { Agent } from "@/model/Agent";
import { RequestHandler } from "@ooic/core";
import bcrypt from "bcryptjs";

export const update: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const agent = await Agent.findByPk(id);
    await agent.update({
      ...request.body,

      ...(request.body.password
        ? { password: await bcrypt.hash(request.body.password, 10) }
        : {}),
    });
    response.send(agent);
  } catch (error) {
    next(error);
  }
};

export default update;
