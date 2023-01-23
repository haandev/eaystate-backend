import { Company } from "@/model/Company";
import { RequestHandler } from "@ooic/core";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const body = request.body;
    await Company.create({
        ...body
    })
  } catch (error) {
    next(error)
  }
}

export default create