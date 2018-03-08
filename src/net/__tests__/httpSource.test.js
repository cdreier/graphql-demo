const HTTPSource = require('../HTTPSource')

jest.mock('node-fetch')

describe('testing http sources', () => {


  it('checks that transform callback is called', () => {
    const settings = {
      url: 'http://drailing.net/$q',
      args: {
        q: '',
      },
      transform: jest.fn(),
    }
    const source = new HTTPSource(settings)
    source.execute()
    expect(settings.transform).toHaveBeenCalled()
  })

  it('ensures that hash is diffrent', () => {
    const settings = {
      url: 'http://drailing.net/$q',
      args: {
        q: '',
      },
    }
    const source1 = new HTTPSource(settings)
    expect(source1.getHash({q: '1'})).not.toBe(source1.getHash({q: '2'}))
  })

  it('checks url construction, without stuff', () => {
    const settings = {
      url: 'http://drailing.net/',
      args: {},
    }
    const source = new HTTPSource(settings)
    expect(source._getUrl()).toBe('http://drailing.net/')
  })

  it('checks cachetime fallback', () => {
    const s = new HTTPSource()
    expect(s.getCacheTime()).toBe(1000)
  })

  it('checks cachetime in settings', () => {
    const s = new HTTPSource({
      cacheTime: 1234,
    })
    expect(s.getCacheTime()).toBe(1234)
  })

  it('checks url construction', () => {
    const settings = {
      url: 'http://drailing.net/$yay',
      args: {
        yay: 123,
      },
    }
    const source = new HTTPSource(settings)
    expect(source._getUrl()).toBe('http://drailing.net/123')
  })

  it('checks url construction', () => {
    const settings = {
      url: 'http://drailing.net/$yay/stress/$test',
      args: {
        yay: 123,
        test: 'aString',
      },
    }
    const source = new HTTPSource(settings)
    expect(source._getUrl()).toBe('http://drailing.net/123/stress/aString')
  })
})