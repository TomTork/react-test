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
    sortBySearch(mas: any, query: string) {
        const massive = [];
        for (let i = 0; i < mas.length; i++) {
            for (let j = 0; j < mas[0].length; j++) {
                if (query in mas[i][j]) {
                    massive.push(mas[i][j]);
                }
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
}

export default ServerHelper;