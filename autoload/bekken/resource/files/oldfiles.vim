vim9script

import autoload "bekken.vim" as b
import autoload "bekken/resource/files/list.vim" as brfl

var keyMappings: dict<func> = {}

export def ListAsync(Cb: func(list<dict<any>>): bool, ...args: list<any>): void
  keyMappings->extend(copy(args->len() > 0 ? args[0] : brfl.defaultKeyMappings))

  denops#request_async(
    "bekken-files", "oldfiles", [],
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
