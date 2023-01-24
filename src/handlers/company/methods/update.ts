import { Company } from "@/model/Company";
import { RequestHandler } from "@ooic/core";

export const update: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const company = await Company.findByPk(id);
    await company.update(request.body)
    response.send(company);
  } catch (error) {
    next(error);
  }
};

export default update;
