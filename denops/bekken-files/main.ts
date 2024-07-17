import type { Entrypoint } from "./deps/@denops/std/mod.ts";
import * as path from "./deps/@std/path/mod.ts";
import { assert, is } from "./deps/@core/unknownutil/mod.ts";
import * as icon from "./icon.ts";
import * as project from "./project.ts";
import * as file from "./file.ts";

const getRenderValue = (pathname: string, basePath?: string) => {
  const { dir, base: name } = path.parse(pathname);

  const dirname = path.normalize(
    "./" + (basePath ? path.relative(basePath, dir) : dir),
  );

  return {
    path: path.normalize(pathname),
    line: `${icon.get(pathname)} ${name.padEnd(30, " ")} \t${dirname}`,
  };
};

export const main: Entrypoint = (denops) => {
  denops.dispatcher = {
    list: async (basePath) => {
      assert(basePath, is.String);

      return (await file.list(denops, basePath)).map((pathname) =>
        getRenderValue(pathname, basePath)
      );
    },

    oldfiles: async () => {
      return (await file.oldfiles(denops)).map((pathname) =>
        getRenderValue(pathname)
      );
    },

    projectDirectory: async (basePath, defaultPath) => {
      assert(basePath, is.String);
      if (!is.Undefined(defaultPath)) {
        assert(defaultPath, is.String);
      }

      return (await project.path(basePath)) || defaultPath;
    },
  };
};
