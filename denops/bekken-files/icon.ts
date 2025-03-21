import * as path from "./deps/@std/path/mod.ts";

const extension = {
  txt: "",
  styl: "",
  sass: "",
  scss: "",
  htm: "",
  html: "",
  slim: "",
  haml: "",
  ejs: "",
  css: "",
  less: "",
  md: "",
  mdx: "",
  markdown: "",
  rmd: "",
  json: "",
  jsonc: "",
  webmanifest: "",
  js: "",
  mjs: "",
  cjs: "",
  jsx: "",
  rb: "",
  gemspec: "",
  rake: "",
  php: "",
  py: "",
  pyc: "",
  pyo: "",
  pyd: "",
  coffee: "",
  mustache: "",
  hbs: "",
  conf: "",
  ini: "",
  yml: "",
  yaml: "",
  toml: "",
  bat: "",
  mk: "",
  jpg: "",
  jpeg: "",
  bmp: "",
  png: "",
  webp: "",
  gif: "",
  ico: "",
  twig: "",
  cpp: "",
  "c++": "",
  cxx: "",
  cc: "",
  cp: "",
  c: "",
  cs: "󿠚",
  h: "",
  hh: "",
  hpp: "",
  hxx: "",
  hs: "",
  lhs: "",
  nix: "",
  lua: "",
  java: "",
  sh: "",
  fish: "",
  bash: "",
  zsh: "",
  ksh: "",
  csh: "",
  awk: "",
  ps1: "",
  ml: "λ",
  mli: "λ",
  diff: "",
  db: "",
  sql: "",
  dump: "",
  clj: "",
  cljc: "",
  cljs: "",
  edn: "",
  scala: "",
  go: "",
  dart: "",
  xul: "",
  sln: "",
  suo: "",
  pl: "",
  pm: "",
  t: "",
  rss: "",
  fsscript: "",
  fsx: "",
  fs: "",
  fsi: "",
  "f#": "",
  rs: "",
  rlib: "",
  d: "",
  erl: "",
  hrl: "",
  ex: "",
  exs: "",
  eex: "",
  leex: "",
  heex: "",
  vim: "",
  ai: "",
  psd: "",
  psb: "",
  ts: "",
  tsx: "",
  jl: "",
  pp: "",
  vue: "",
  elm: "",
  swift: "",
  xcplayground: "",
} as const;

const filename = {
  "gruntfile.coffee": "",
  "gruntfile.js": "",
  "gruntfile.ls": "",
  "gulpfile.coffee": "",
  "gulpfile.js": "",
  "gulpfile.ls": "",
  "mix.lock": "",
  ".DS_Store": "",
  ".gitconfig": "",
  ".gitignore": "",
  ".gitattributes": "",
  ".gitlab-ci.yml": "",
  ".bashrc": "",
  ".zshrc": "",
  ".zshenv": "",
  ".zprofile": "",
  ".vimrc": "",
  ".gvimrc": "",
  _vimrc: "",
  _gvimrc: "",
  ".bash_profile": "",
  "favicon.ico": "",
  license: "",
  node_modules: "",
  "react.jsx": "",
  Procfile: "",
  Dockerfile: "",
  "docker-compose.yml": "",
  "docker-compose.yaml": "",
  "compose.yml": "",
  "compose.yaml": "",
  Rakefile: "",
  "config.ru": "",
  Gemfile: "",
  Makefile: "",
  "CmakeLists.txt": "",
  "composer.json": "",
  Vagrantfile: "",
  "package.json": "",
  "package-lock.json": "",
} as const;

const pattern = {
  ".*jquery.*\\.js$": "",
  ".*angular.*\\.js$": "",
  ".*backbone.*\\.js$": "",
  ".*require.*\\.js$": "",
  ".*materialize.*\\.js$": "",
  ".*materialize.*\\.css$": "",
  ".*vimrc.*": "",
  Vagrantfile$: "",
} as const;

const defaultIcon = "";

const getIconByPath = (pathname: string) => {
  const { ext, base: name } = path.parse(pathname);

  const filenameIcon = filename[name.trim() as keyof typeof filename];
  if (filenameIcon) {
    return filenameIcon;
  }

  const patternIcon = Object.entries(pattern)
    .find(([k]) => new RegExp(k).test(name.trim()))
    ?.at(1);
  if (patternIcon) {
    return patternIcon;
  }

  const extensionIcon =
    extension[ext.toLowerCase().trim().substring(1) as keyof typeof extension];

  if (extensionIcon) {
    return extensionIcon;
  }

  return defaultIcon;
};

export { getIconByPath as get };
