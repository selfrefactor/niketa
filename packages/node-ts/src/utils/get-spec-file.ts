const {existsSync} = require('fs')
const {replace} = require('rambdax')

export function getSpecFile(filePath: string, extension: string) {
  if (!filePath.endsWith(extension)) {
    return {hasValidSpec: false}
  }

  if (filePath.includes(`.spec${extension}`)) {
    return {hasValidSpec: true, specFile: filePath}
  }

  const maybeSpecFile = replace(extension, `.spec${extension}`, filePath)

  if (!existsSync(maybeSpecFile)) {
    return {hasValidSpec: false}
  }

  return {hasValidSpec: true, specFile: maybeSpecFile}
}
