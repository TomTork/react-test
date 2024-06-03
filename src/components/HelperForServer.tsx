import IRequest from "../interfaces/IterfaceIRequest";
import Client from "../server/Client";

class ServerHelper {
    sortByTime(mas: IRequest[]) {
        return mas.sort((a, b) => a.date_release.localeCompare(b.date_release)).reverse();
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
            const stories2 = await client.getAllData("stories2");
            const poems2 = await client.getAllData("poems2");
            const articles2 = await client.getAllData("articles2");
            setRawData(this.sortByTime(stories2.concat(poems2).concat(articles2)));
            setData(this.SplitMassive(rawData));
        } catch (error) {
            console.log('MY-ERROR: ' + error);
        }
    }
}

export default ServerHelper;