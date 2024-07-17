import type { Denops } from "./deps/@denops/std/mod.ts";
import * as fs from "./deps/@std/fs/mod.ts";
import * as variable from "./deps/@denops/std/variable/mod.ts";
import { assert, is } from "./deps/@core/unknownutil/mod.ts";

const getFilesUsingCmd = async (basePath: string, cmd: string[]) => {
  const command = new Deno.Command(cmd[0], {
    args: [...cmd.slice(1), basePath],
  });

  const { code, stdout, stderr } = await command.output();

  if (code === 0) {
    return new TextDecoder()
      .decode(stdout)
      .trim()
      .split("\n");
  } else {
    throw new Error(new TextDecoder().decode(stderr));
  }
};

const getFileUsingDeno = async (basePath: string) => {
  const result: string[] = [];

  for await (const walkEntry of fs.walk(basePath)) {
    if (walkEntry.isFile) {
      result.push(walkEntry.path);
    }
  }

  return result;
};

const getFiles = async (denops: Denops, basePath: string) => {
  if (!(await fs.exists(basePath))) {
    return [];
  }

  const cmd = await variable.globals.get<string[]>(
    denops,
    "bekken#files#get_file_list_cmd",
    [],
  );
  assert(cmd, is.ArrayOf(is.String));

  return cmd.length > 0
    ? await getFilesUsingCmd(basePath, cmd)
    : await getFileUsingDeno(basePath);
};

const getOldfiles = async (denops: Denops) => {
  const oldfiles = await variable.vim.get<string[]>(denops, "oldfiles", []);
  assert(oldfiles, is.ArrayOf(is.String));

  return oldfiles;
};

export { getFiles as list, getOldfiles as oldfiles };
