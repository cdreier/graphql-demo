//@flow
import HTTPSource from '../net/HTTPSource'
import BaseHTTPType from './base/BaseHTTPType'

const api = new HTTPSource({
  url: 'https://swapi.co/api/films/$filmId',
  args: {
    filmId: 2,
  },
})


class Film extends BaseHTTPType{

  static typeDefinition(): string {
    return `
      type Film {
        title: String
        episode_id: Int
        opening_crawl: String
        director: String
        producer: String
        release_date: String
      }
    `
  }

  static typeName(): string { 
    return 'film' 
  }
  static query(): string {
    return `${Film.typeName()}(filmId: Int): Film`
  }
  static resolver(): Function {
    return (args) => new Film(args)
  }

  constructor(args: Object){
    super(api, args)
  }

  title(){
    return this.__getAttribute(['title'])
  }
  episode_id(){
    return this.__getAttribute(['episode_id'])
  }
  opening_crawl(){
    return this.__getAttribute(['opening_crawl'])
  }
  director(){
    return this.__getAttribute(['director'])
  }
  producer(){
    return this.__getAttribute(['producer'])
  }
  release_date(){
    return this.__getAttribute(['release_date'])
  }

}


export default Film