vim9script

import autoload "bekken.vim" as b

const keyMapping = {
  "\<Cr>": "edit",
  "\<Tab>": "tabnew",
  "\<C-t>": "tabnew",
  "\<C-s>": "split | edit",
  "\<C-v>": "vsplit | edit",
}

export def ListAsync(Cb: func(list<dict<any>>): bool, ...args: list<any>): void
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
  if keyMapping->has_key(key)
    const selected = bekken.GetResource().selected

    if selected != null
      execute(keyMapping[key] .. " " .. selected.path)
    endif

    bekken.Close()
  endif

  return true
enddef
