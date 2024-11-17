vim9script

import autoload "bekken.vim" as b

export const defaultKeyMappings: dict<func(string): void> = {
  "\<Cr>": (path: string) => {
    execute("edit " .. path)
  },
  "\<Tab>": (path: string) => {
    execute("tabnew " .. path)
  },
  "\<C-t>": (path: string) => {
    execute("tabnew " .. path)
  },
  "\<C-s>": (path: string) => {
    execute("split | edit " .. path)
  },
  "\<C-v>": (path: string) => {
    execute("vsplit | edit " .. path)
  },
}

var keyMappings: dict<func> = {}

export def ListAsync(Cb: func(list<dict<any>>): bool, ...args: list<any>): void
  keyMappings->extend(copy(defaultKeyMappings))
  if args->len() > 1
    keyMappings->extend(copy(args[1]))
  endif

  denops#request_async(
    "bekken-files", "list", [args->len() > 0 ? args[0] : expand("%:h")],
    (val: list<dict<any>>) => Cb(val),
    (err: any) => {
      echoerr err
      return Cb([])
    },
  )
enddef

export def Filter(key: string, bekken: b.Bekken): bool
  if keyMappings->has_key(key)
    const selected = bekken.GetResource().selected

    if selected != null
      keyMappings[key](selected.path)
    endif

    bekken.Close()
  endif

  return true
enddef
