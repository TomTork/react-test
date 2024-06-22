import IRequest from "../interfaces/IterfaceIRequest";
import Client from "../server/Client";

class ServerHelper {
    sortByTime(mas: IRequest[]) {
        return mas.sort((a, b) => a.release_date.localeCompare(b.release_date)).reverse();
    }
    SplitMassive(mas: any[]) {
        const objMas = [];
        for (let i = 0; i < mas.length; i += 3) {
            objMas.push(mas.slice(i, i + 3));
        }
        return objMas;
    }
    sortByType(type: number, mas: IRequest[]){
        return mas.filter((x) => x.type === type)
    }
    sortBySearch(mas: IRequest[], query: string) {
        const massive = [];
        for (let i = 0; i < mas.length; i++) {
            if (mas[i].base.includes(query) || mas[i].label.includes(query)) {
                massive.push(mas[i]);
            }
        }
        return this.SplitMassive(massive);
    }
    async fetchData(setRawData: any, setData: any, rawData: any) {
        const client = new Client();
        try {
            const content = await client.getAllData();
            setRawData(this.sortByTime(content));
            setData(this.SplitMassive(rawData));
        } catch (error) {
            console.log('MY-ERROR: ' + error);
        }
    }
    toTypeValue(value: string, limit: number = 50){
        if(value.length <= limit) return value;
        return value.substring(0, limit - 3) + "...";
    }

    findIndex(c: string, n: number = 8, par: string = '\n'){
        let num = 0;
        let answer = 0;
        for(let i = 0; i < c.length; i++){
            if(c[i] == '\n') {num++; answer = i}
            if(num == n) break;
        }
        return answer;
    }

    toTypeContent(content: string){
        if(countOccurrences(content, '\n') <= 16) return content;
        return content.substring(0, this.findIndex(content));
    }
}

const countOccurrences = (text: string, search: string) => (text.match(new RegExp(search, 'g')) || []).length;

export default ServerHelper;