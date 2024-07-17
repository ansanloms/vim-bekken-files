vim9script

import autoload "bekken.vim" as b
import autoload "bekken/resource/files/list.vim"

export def ListAsync(Cb: func(list<dict<any>>): bool, ...args: list<any>): void
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
  return list.Filter(key, bekken)
enddef
