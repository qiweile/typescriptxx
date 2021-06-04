import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import DellAnalyzer from './dellAnalyzer'

class Crowller {
    private sectet = '%E6%B5%99%E6%B1%9F';
    private url = `http://www.weather.com.cn/weather/101210101.shtml`;
    private filePath = path.resolve(__dirname, '../data/course.json');
    async getRawHtml() {
        const result = await superagent.get(this.url);
        return result.text
    }
    writeFile(content:string) {
        fs.writeFileSync(this.filePath, JSON.stringify(content))
    }
    async initSpiderProcess() {
        const html = await this.getRawHtml()
        console.dir(this.analyzer.analyze)
        // const fileContent = this.analyzer.analyze(html,this.filePath)
        // this.writeFile(JSON.stringify(fileContent))
    }
    constructor(analyzer:any) {
        this.initSpiderProcess()
    }
}
const analyzer = new DellAnalyzer()
const crowller = new Crowller(analyzer)