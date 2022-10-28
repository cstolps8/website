const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * 
 * Logic for reading work history
 * 
 */

class WorkHistoryService {

    constructor(datafile) {
        this.datafile = datafile
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data);
    }

    async getWorkHistoryById(id){

        const data = (await this.getData()) || [];

        let jobId
        data.forEach(job => {
            if(job.id === id){
                jobId = job;
                return job
            }
        });

        return jobId


    }
    
}

module.exports = WorkHistoryService;