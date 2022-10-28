const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing contactMe data
 */
class ContactMeService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the contactMe data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get all contactMe items
   */
  async getList() {
    const data = await this.getData();
    return data;
  }

  /**
   * Add a new contactMe item
   **/
  async addEntry(fname, lname, email, comment) {
    console.log("adding entry")
    const data = (await this.getData()) || [];
    data.unshift({fname, lname, email, comment});
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * Fetches contactMe data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = ContactMeService;
