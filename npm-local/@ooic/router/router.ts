import fs from "fs";
import path from "path";
import { toKebabCase } from "@ooic/utils";
import { Express, RequestHandler } from "express";
import { RequestSchemaType, RouteGroupModuleType, RouteType, SingleRouteModuleType } from "./types";
const loadRouteFolder = (app, folderName) => {
  const f = folderName.replace("@/","../../../src/")
  const p = path.resolve(__dirname,f)
  const items = fs.readdirSync(`${p}/`, {
    withFileTypes: true,
  });
  items.forEach(async (item) => {
    if (item.isFile()) {
      const f = `${folderName}/${item.name}`.replace("@/","./../../../src/").replace(/\.[^/.]+$/, "")
      const y = f.replace("./../../../src/router","")
      const loadedModule = await import("@/router"+y);
      const name = toKebabCase(item.name.split(".")[0]);
      const router: RouteGroupModuleType | SingleRouteModuleType = loadedModule.default;

      if (name !== "index") routeMounter(app, router as RouteType, `${folderName}/${name}`);
      else routeMounter(app, router as RouteType, `${folderName}`);

    } else {
      loadRouteFolder(app, folderName + "/" + item.name);
    }
  });
};

const routeMounter = (app, router: RouteType, path: string, middleware:any[]=[]) => {
  path = path.replace("@/router","")
  if ("method" in router) {
    app[router.method](
      `${path}`, ...middleware,
      ...("schema" in router ? [RequestValidationCtor(router.schema), ...router.handler] : [...router.handler])
    );
  }

  if ("routes" in router ) {
    const handlers = router.handler || []
    router.routes.forEach((subRoute) => {
      if ("path" in subRoute)
      routeMounter(app, subRoute, `${path}${subRoute.path}`, [...middleware, ...handlers]);
      else routeMounter(app, subRoute, `${path}`, [...middleware, ...handlers]);
    });
  }
};

export const initRouter = async (app: Express) => {
  loadRouteFolder(app,  "@/router");
};

export const RequestValidationCtor = (schema: RequestSchemaType) => {
  const requestValidationMiddleware: RequestHandler = async (request, response, next) => {
    try {
      if (schema.body) request.body = schema.body.parse(request.body);
      if (schema.query) request.query = schema.query.parse(request.query);
      if (schema.params) request.params = schema.params.parse(request.params);
      next()
    } catch (error) {
      next(error);
    }
  };
  return requestValidationMiddleware;
};

//"src/router/"
