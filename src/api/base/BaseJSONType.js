//@flow

class BaseJSONType {

  data: Object

  constructor(data: Object){
    this.data = data

    Object.keys(this.data).forEach(field => {
      // ['BaseJSONType'].prototype[field] = () => this.data[field] 
      this[field] = () => this.data[field]
    })
  }

}

export default BaseJSONType