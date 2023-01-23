import { Company } from "@/model/Company";
import { RequestHandler } from "@ooic/core";

export const list: RequestHandler = async (request, response, next) => {
  try {
    const companies = await Company.findAll();
    response.send(companies);
  } catch (error) {
    next(error);
  }
};

export default list;
