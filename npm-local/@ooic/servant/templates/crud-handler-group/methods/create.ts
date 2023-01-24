import { {{{model}}} } from "@/model/{{{model}}}";
import { RequestHandler, StatusCodes } from "@ooic/core";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const body = request.body;
    const {{{singular}}} = await {{{model}}}.create({
        ...body
    })
    response.status(StatusCodes.CREATED).send({{{singular}}})
  } catch (error) {
    next(error)
  }
}

export default create