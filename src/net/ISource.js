// @flow

export interface ISource {
  getHash(args: Object): String;
  execute(args: Object): Promise<Object>;
  getArgs(): Object;
  getCacheTime(): number;
}

export type Settings = {
  url: string,
  args: Object,
  headers: Object,
  body: Object,
  transform: Function,
  cacheTime: number,
}

const DEFAULT_CACHE_TIME = 1000

export class Source {

  settings: Settings
  headers: Object
  method: string

  constructor(settings: Settings = {}){ 
    this.settings = settings
    this.method = 'GET'
    this.headers = Object.assign({}, {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }, settings.headers || {})
  }

  addHeader(k, v){
    this.headers[k] = v
  }

  getCacheTime(): number{
    return this.settings.cacheTime || DEFAULT_CACHE_TIME
  }

  _transform(json: Object): Object{
    if (this.settings.transform != null){
      return this.settings.transform(json)
    }
    return json
  }

}