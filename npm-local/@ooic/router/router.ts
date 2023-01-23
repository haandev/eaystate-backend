import fs from "fs";
import { toKebabCase } from "@ooic/utils";
import { Express, RequestHandler } from "express";
import { RequestSchemaType, RouteGroupModuleType, RouteType, SingleRouteModuleType } from "./types";
const loadRouteFolder = (app, folderName) => {
  const f = folderName.replace("@/","src/")
  const items = fs.readdirSync(`${f}/`, {
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

const routeMounter = (app, router: RouteType, path: string) => {
  path = path.replace("@/router","")
  if ("method" in router) {
    app[router.method](
      `${path}`,
      ...("schema" in router ? [RequestValidationCtor(router.schema), ...router.handler] : [...router.handler])
    );
  }

  if ("routes" in router) {
    router.routes.forEach((subRouter) => {
      routeMounter(app, subRouter, `${path}${subRouter.path}`);
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
      if (schema.query) request.query = schema.body.parse(request.query);
      if (schema.params) request.params = schema.body.parse(request.params);
      next()
    } catch (error) {
      next(error);
    }
  };
  return requestValidationMiddleware;
};

//"src/router/"
