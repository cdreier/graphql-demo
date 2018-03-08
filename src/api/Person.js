//@flow
import HTTPSource from '../net/HTTPSource'
import BaseHTTPType from './base/BaseHTTPType'
import Film from './Film'

const api = new HTTPSource({
  url: 'https://swapi.co/api/people/$personId',
  args: {
    personId: 1,
  },
})


class Person extends BaseHTTPType{
  
  static typeDefinition(): string {
    return `
    type Person {
      name: String
      height: String
      mass: String
      hair_color: String
      skin_color: String
      eye_color: String
      birth_year: String
      gender: String
      films: [Film]
    }
    `
  }

  static typeName(): string { 
    return 'person' 
  }
  static query(): string {
    return `${Person.typeName()}(personId: Int): Person`
  }
  static resolver(): Function {
    return (args) => new Person(args)
  }

  constructor(args: Object){
    super(api, args)
  }


  name(){
    return this.__getAttribute(['name'])
  }
  height(){
    return this.__getAttribute(['height'])
  }
  mass(){
    return this.__getAttribute(['mass'])
  }
  hair_color(){
    return this.__getAttribute(['hair_color'])
  }
  skin_color(){
    return this.__getAttribute(['skin_color'])
  }
  eye_color(){
    return this.__getAttribute(['eye_color'])
  }
  birth_year(){
    return this.__getAttribute(['birth_year'])
  }
  gender(){
    return this.__getAttribute(['gender'])
  }

  films(){
    return this.__getData()
      .map(p => p.films)
      .map(films => films.map(f => {
        f = f.replace('https://swapi.co/api/films/', '')
        f = f.replace('/', '')
        return new Film({
          filmId: f,
        })
      }))
      .toPromise()
  }


}


export default Person