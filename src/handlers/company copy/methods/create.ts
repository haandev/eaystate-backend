import { Company } from "@/model/Company";
import { RequestHandler, StatusCodes } from "@ooic/core";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const body = request.body;
    const company = await Company.create({
        ...body
    })
    response.status(StatusCodes.CREATED).send(company)
  } catch (error) {
    next(error)
  }
}

export default create