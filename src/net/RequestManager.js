// @flow
import Rx from 'rxjs'
import type {ISource} from './ISource'

const REQUESTS: Object = {}

const getCachedRequest = (source: ISource, args: Object) => {
  const hash = source.getHash(args)
  if (!REQUESTS[hash]){
    REQUESTS[hash] = Rx.Observable.defer(() => source.execute(args))
      .publishReplay(1, source.getCacheTime())
      .refCount()
      .take(1)
  }
  return REQUESTS[hash]
}

export {
  getCachedRequest,
}