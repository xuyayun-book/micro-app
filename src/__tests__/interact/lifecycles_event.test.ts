/* eslint-disable promise/param-names */
import { commonStartEffect, releaseAllEffect, ports } from '../common/initial'
import microApp from '../..'

describe('lifecycles_event', () => {
  let appCon: Element
  beforeAll(() => {
    commonStartEffect(ports.lifecycles_event)
    appCon = document.querySelector('#app-container')!

    microApp.start()
  })

  afterAll(() => {
    return releaseAllEffect()
  })

  // 生命周期函数测试覆盖
  test('render common app', async () => {
    const microappElement = document.createElement('micro-app')
    microappElement.setAttribute('name', 'test-app')
    microappElement.setAttribute('url', `http://127.0.0.1:${ports.lifecycles_event}/common/`)

    appCon.appendChild(microappElement)

    await new Promise((reslove) => {
      microappElement.addEventListener('mounted', (e) => {
        expect(e.currentTarget).toBe(microappElement)
        expect(e.target).toBe(microappElement)
        reslove(true)
      }, false)
    })
  })
})
