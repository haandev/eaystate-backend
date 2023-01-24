import { Company } from "@/model/Company";
import { RequestHandler } from "@ooic/core";

export const list: RequestHandler = async (request, response, next) => {
  const { pageIndex, pageSize, sortBy, sortType, ...query } = request.query;
  try {
    const companies = await Company.scope({
      method: ["pager", { pageIndex, pageSize }],
    }).findAndCountAll({
      where: query,
      order: [[sortBy as any, sortType as "asc" | "desc"]],
    });
    response.send(companies);
  } catch (error) {
    next(error);
  }
};

export default list;
