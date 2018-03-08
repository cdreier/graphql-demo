// @flow 

import fetch from 'node-fetch'
import log from '../logger'
import {Source} from './ISource'

class HTTPSource extends Source {

  getArgs(): Object {
    return this.settings.args
  }

  _getUrl(args: ?Object): string {
    // using example args as defaults
    const tmpArgs = Object.assign({}, this.settings.args, args)
    return Object.keys(tmpArgs).reduce((prev, key) => {
      return prev.replace('$' + key, tmpArgs[key])
    }, this.settings.url)
  }

  getHash(args: Object): string{
    return new Buffer(`${this.method}${this.settings.url}${JSON.stringify(args)}`).toString('base64')
  }

  execute(args: Object): Promise<Object>{
    log.info('calling server! : ', this.method, this._getUrl(args))
    return fetch(this._getUrl(args), {
      method: this.method,
      headers: this.headers,
    }).then(response => {
      // console.log(response)
      return response.json()
    })
      .then(json => {
        // console.log(json)
        return this._transform(json)
      })
      .catch(e => {
        log.error('faild to request server', this, e)
      })
  }

}

module.exports = HTTPSource