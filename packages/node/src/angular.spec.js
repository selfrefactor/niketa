import { ms } from 'string-fn'
import { delay } from 'rambdax'
import { NiketaClient } from './niketa-client'
import { ANGULAR, generateMessage, getFullSnap } from './test-data'
jest.setTimeout(ms('2 minutes'))

let niketaClient
const emit = jest.fn()

beforeEach(() => {
  niketaClient = new NiketaClient({
    port    : 9999,
    emit,
    testing : true,
  })
})
afterEach(() => {
  niketaClient = undefined
  emit.mockClear()
})

test('angular scenario', async () => {
  const step = async fileName => {
    await niketaClient.onSocketData(generateMessage({
      fileName,
      hasTypescript : true,
      dir           : ANGULAR.dir,
    }))
  }

  await step(ANGULAR.htmlFile)
  await step(ANGULAR.angularSpec)
  await step(ANGULAR.scssFile)
  await step(ANGULAR.angularFile)
  await step(ANGULAR.scssFile)

  expect(getFullSnap({
    niketaClient,
    emit,
  })).toMatchSnapshot()
})

test('with angular source - force lint', async () => {
  const currentFile = ANGULAR.angularFile
  await niketaClient.onSocketData(generateMessage({
    fileName      : currentFile,
    hasTypescript : true,
    dir           : ANGULAR.dir,
  }))
  expect(niketaClient.lastLintedFiles[ 0 ]).toBe(undefined)
  await delay(3000)
  expect(niketaClient.lastLintedFiles[ 0 ]).toBe(undefined)
  expect(emit.mock.calls[ 0 ]).toMatchSnapshot()
})
