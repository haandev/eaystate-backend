import { SmartModel } from "@/model/SmartModel";
import { RequestHandler } from "@ooic/core";

export const list: RequestHandler = async (request, response, next) => {
  const { pageIndex, pageSize, sortBy, sortType, ...query } = request.query;
  try {
    const smartModel = await SmartModel.scope({
      method: ["pager", { pageIndex, pageSize }],
    }).findAndCountAll({
      include: ["fields", "relationsAsSource", "relationsAsTarget"],
    });
    response.send(smartModel);
  } catch (error) {
    next(error);
  }
};

export default list;
 