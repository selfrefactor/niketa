import { bothHaveLogs } from './both-have-logs'

test('happy', () => {
  bothHaveLogs(0)
  bothHaveLogs(1)
  bothHaveLogs(2)
  console.log({
    a : 1,
    b : 2,
  })
  expect(1).toBe(2)
})
