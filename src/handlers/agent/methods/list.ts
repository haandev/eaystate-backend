import { Agent } from "@/model/Agent";
import { RequestHandler } from "@ooic/core";

export const list: RequestHandler = async (request, response, next) => {
  const { pageIndex, pageSize, sortBy, sortType, ...query } = request.query;
  try {
    const agents = await Agent.scope({
      method: ["pager", { pageIndex, pageSize }],
    }).findAndCountAll({
      where: query,
      order: [[sortBy as any, sortType as "asc" | "desc"]],
      include: [{ association: "company" }],
    });
    response.send(agents);
  } catch (error) {
    next(error);
  }
};

export default list;
