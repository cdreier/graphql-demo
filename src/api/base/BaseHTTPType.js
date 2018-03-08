//@flow
import type {ISource} from '../../net/ISource'
import {getCachedRequest} from '../../net/RequestManager'

class BaseHTTPType {

  static bootstrap(){
    return true
  }

  api: ISource
  args: Object

  constructor(api: ISource, args: Object){
    this.api = api
    this.args = args
  }

  __getData(){
    return getCachedRequest(this.api, this.args)
  }

  __getAttribute(path: Array<string>){
    return this.__getData()
      .map(json => path.reduce((obj, val) => obj[val], json))
      .toPromise()
  }
}

export default BaseHTTPType