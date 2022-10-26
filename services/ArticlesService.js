const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing data
 */
class ArticleService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get all items
   */
  async getList() {
    const data = await this.getData();
    return data;
  }

  /**
   * Add a new item
   **/
  async addEntry(fname, lname, email, comment) {
    console.log("adding entry")
    const data = (await this.getData()) || [];
    data.unshift({ fname, lname, email, comment });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * 
   * @param {string} title 
   * 
   * Get article by title
   */
  async getArticleByTitle(title) {
    const data = (await this.getData()) || [];

    // for some reason i cant return from the if statement so I have to define this first
    let articles

    data.forEach(article => {
      if (article.title === title) {
        articles = article;
        return article; // never returns here
      }
    });

    return articles
  }

  /**
   * Fetches data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = ArticleService;