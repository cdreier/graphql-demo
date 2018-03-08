// @flow
import leftPad from 'left-pad'
var LOGLEVEL: number = 0
const LOGLEVELS = {
  debug: 0,
  info: 5,
  warn: 10,
  error: 15,
}

const pad = input => leftPad(input, 2, '0')

const getTimestamp = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

class Logger {

  info(...args: Array<any>){
    if (LOGLEVEL <= LOGLEVELS.info){
      console.log('[INFO] - ', getTimestamp(), ...args) // eslint-disable-line no-console
    }
  }

  debug(...args: Array<any>){
    if (LOGLEVEL <= LOGLEVELS.debug){
      console.log('[DEBUG] - ', getTimestamp(), '-----', ...args) // eslint-disable-line no-console
    }
  }

  warn(...args: Array<any>){
    if (LOGLEVEL <= LOGLEVELS.warn){
      console.warn('[WARN] - ', getTimestamp(), ...args) // eslint-disable-line no-console
    }
  }

  error(...args: Array<any>){
    if (LOGLEVEL <= LOGLEVELS.error){
      console.error('[ERROR] - ', getTimestamp(), ...args) // eslint-disable-line no-console
    }
  }
}

export const setLoglevel = {
  info: () => { 
    LOGLEVEL = LOGLEVELS.info
  },
  debug: () => {
    LOGLEVEL = LOGLEVELS.debug
  },
  warn: () => { 
    LOGLEVEL = LOGLEVELS.warn
  },
  error: () => { 
    LOGLEVEL = LOGLEVELS.error
  },
}

const instance = new Logger()

export default instance