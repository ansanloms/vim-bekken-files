import * as fs from "./deps/@std/fs/mod.ts";
import * as path from "./deps/@std/path/mod.ts";

export const marks = [
  ".git",
  ".bzr",
  ".hg",
  ".svn",
  "build.xml",
  "prj.el",
  ".project",
  "pom.xml",
  "package.json",
  "Makefile",
  "configure",
  "Rakefile",
  "NAnt.build",
  "P4CONFIG",
  "tags",
  "gtags",
  "deno.json",
  "deno.jsonc",
  "docker-compose.yml",
  "docker-compose.yaml",
  "compose.yml",
  "compose.yaml",
  "composer.json",
] as const;

const isProjectDirectory = async (baseDir: string) => {
  if (!(await fs.exists(baseDir))) {
    return false;
  }

  for await (const entry of Deno.readDir(baseDir)) {
    if (marks.includes(entry.name as (typeof marks)[number])) {
      return true;
    }
  }

  return false;
};

const getProjectDirectory = async (baseDir: string) => {
  if (await isProjectDirectory(baseDir)) {
    return baseDir;
  }

  const nextBaseDir = path.dirname(baseDir);
  if (nextBaseDir === baseDir) {
    return undefined;
  }

  return await getProjectDirectory(nextBaseDir);
};

export { getProjectDirectory as path };
