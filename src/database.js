import fs from 'node:fs/promises'

// console.log(import.meta.url); Entire Path until the database.js file
const databasePath = new URL('../db.json', import.meta.url);

export class DataBase {
  #database = {} // way to apply privation in variable

  constructor() {
    fs.readFile(databasePath, 'utf-8').then(data=> {
      this.#database = JSON.parse(data)
    }).catch(()=> {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    }else{
      this.#database[table] = [data]
    }

    this.#persist();
    return data
  }

}