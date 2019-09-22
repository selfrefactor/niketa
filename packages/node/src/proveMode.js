import { execNodeFile } from './ants/execNodeFile'
import { show } from './emitters/show'
import { additional } from './emitters/additional.js'
import { ERROR_ICON } from './coverageMode.js'
import { remove, take,wait } from 'rambdax'

const LIMIT = 150
const SEPARATOR = '🚦'

export async function proveMode({
  dir,
  notify,
  notifyClose,
  emit,
  filePath,
}){
  const [execResult, err] = await wait(execNodeFile({
    cwd     : dir,
    file : filePath,
  }))

  if (execResult === undefined){
    console.log(err)
    return show(emit, ERROR_ICON)
  }
  
  const toShow = err ? 
  remove([filePath, /\n/g], err) : 
  remove(/\n/g, execResult.join(SEPARATOR))
  
  if (toShow.length === 0) return
  additional(emit)

  if (toShow.length < LIMIT) return show(emit, toShow)

  if (!notifyClose){
    return show(emit, `${ take(LIMIT, toShow) } ...`)
  }

  notify(execResult.join('\n'))
  notifyClose()
}