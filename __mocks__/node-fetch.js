
const fetch = (url, conf) => {
  return new PromiseMock(url, conf)
}

class PromiseMock {

  constructor(url, conf){
    this.url = url
    this.conf = conf
  }

  then(cb){
    cb(new ResponseMock())
    return new PromiseMock()
  }

  catch(){
    
  }
}

class ResponseMock {
  json(){

  }
  text(){

  }
}



export default fetch