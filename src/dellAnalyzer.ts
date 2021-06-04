import fs from 'fs'
import cheerio from 'cheerio'
interface Course {
    day: string;
    weather: string;
    airTemperature: string;
}
interface courseResult {
    time: number;
    data: Course[]
}
interface Content {
    [propName: number]: Course[]
}
export default class DellAnalyzer {
    private getCourseInfo(html: string) {
        const $ = cheerio.load(html);
        const courseItems = $('.t.clearfix li');
        let weatherData: Course[] = []
        courseItems.map((index, ele) => {
            let day = $(ele).children('h1').text().replace('日', '号')
            let weather = $(ele).children('p').eq(0).text()
            let airTemperature = `${$(ele).children('p').eq(1).children('span').text()} - ${$(ele).children('p').eq(1).children('i').text()}`
            weatherData.push({ day, weather, airTemperature })
        })
        // console.log(weatherData)
        return {
            time: new Date().valueOf(),
            data: weatherData
        }
    }
    generateJsonContent(courseInfo: courseResult,filePath: string) {
        let fileContent: Content = {}
        // 判断 filePath 路径是否存在
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
    }
    public analyzer(html: string, filePath:string) {
        const courseInfo = this.getCourseInfo(html)
        const fileContent = this.generateJsonContent(courseInfo, filePath)
        return JSON.stringify(fileContent)
    }
}