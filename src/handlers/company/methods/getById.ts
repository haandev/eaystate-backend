import { Company } from "@/model/Company";
import { RequestHandler } from "@ooic/core";

export const getById: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const company = Company.findByPk(id);
    response.send(company);
  } catch (error) {
    next(error);
  }
};

export default getById;
