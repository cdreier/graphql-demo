// @flow 

import fetch from 'node-fetch'
import log from '../logger'
import {Source} from './ISource'
import type {Settings} from './ISource'


class HTTPPostSource extends Source {
  
  constructor(settings: Settings){
    super(settings)
    this.method = 'POST'
  }

  getArgs(): Object {
    return Object.assign({}, this.settings.args, this.settings.body)
  }

  _getUrl(args: ?Object): string {
    // using example args as defaults
    const tmpArgs = Object.assign({}, this.settings.args, args)
    return Object.keys(tmpArgs).reduce((prev, key) => {
      return prev.replace('$' + key, tmpArgs[key])
    }, this.settings.url)
  }

  _getBody(args: Object = {}){
    const bodyKeys = Object.keys(this.settings.body || {})
    const foundArgs = Object.keys(args).filter(k => bodyKeys.includes(k))
    return Object.assign({}, this.settings.body, 
      foundArgs.reduce((cur, val) => Object.assign(cur, {[val]: args[val]}), {}))
  }

  getHash(args: Object): string{
    return new Buffer(`${this.method}${this.settings.url}${JSON.stringify(args)}`).toString('base64')
  }

  execute(args: Object): Promise<Object>{
    log.debug('calling server! : ', this.method, this._getUrl(args))
    return fetch(this._getUrl(args), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this._getBody(args)),
    }).then(response => response.json())
      .then(json => this._transform(json))
  }

}

module.exports = HTTPPostSource