import { Agent } from "@/model/Agent";
import bcrypt from "bcryptjs";
import { RequestHandler, StatusCodes } from "@ooic/core";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const body = request.body;
    
    const agent = await Agent.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });
    response.status(StatusCodes.CREATED).send(agent);
  } catch (error) {
    next(error);
  }
};

export default create;
