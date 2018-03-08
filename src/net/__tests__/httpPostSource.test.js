const HTTPPostSource = require('../HTTPPostSource')

jest.mock('node-fetch')

describe('testing http post sources', () => {

  it('checks that transform callback is called', () => {
    const settings = {
      url: 'http://drailing.net/$q',
      args: {
        q: '',
      },
      transform: jest.fn(),
    }
    const source = new HTTPPostSource(settings)
    source.execute()
    expect(settings.transform).toHaveBeenCalled()
  })

  it('merges args', () => {
    const settings = {
      url: 'http://drailing.net/$q',
      args: {
        q: '',
      },
      body: {
        data: '',
      },
    }
    const source = new HTTPPostSource(settings)
    expect(Object.keys(source.getArgs()).length).toBe(2)
  })

  it('ensures that hash is diffrent', () => {
    const settings = {
      url: 'http://drailing.net/$q',
      args: {
        q: '',
      },
    }
    const source1 = new HTTPPostSource(settings)
    expect(source1.getHash({q: '1'})).not.toBe(source1.getHash({q: '2'}))
  })

  it('checks url construction, without stuff', () => {
    const settings = {
      url: 'http://drailing.net/',
      args: {},
    }
    const source = new HTTPPostSource(settings)
    expect(source._getUrl()).toBe('http://drailing.net/')
  })

  it('checks cachetime fallback', () => {
    const s = new HTTPPostSource()
    expect(s.getCacheTime()).toBe(1000)
  })

  it('checks cachetime in settings', () => {
    const s = new HTTPPostSource({
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
    const source = new HTTPPostSource(settings)
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
    const source = new HTTPPostSource(settings)
    expect(source._getUrl()).toBe('http://drailing.net/123/stress/aString')
  })
})