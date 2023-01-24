import { Company } from "@/model/Company";
import { RequestHandler, StatusCodes } from "@ooic/core";

export const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const company = await Company.findByPk(id);

    company.destroy();
    response.status(StatusCodes.OK).send(company);
  } catch (error) {
    next(error);
  }
};

export default destroy;
