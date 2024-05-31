export interface IRequest {
    Label: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    Base: string,
    likes: number,
    users_likes?: string,
    date_release: string
}

class Client {
    token: string = "b51b8cc2eb6b9dcdf16c26153cd79a3420a36ab8f45121800c01f4621806b5a6125850f5563dd524c5b5bba9941d18604a8d66f390833bd98b01f7c851fc970d79b15a5e3ea91731a7c0ce34926c9c4dfbdfe5263d0b5fdd7d8b1ebd03b77ef8b3dd025a2b5c494b5235814595f853163258e0e5ba6cf97de66f3e798ec08227";

    constructor() {
        console.log(this.token);
    }
    async getAllData(url: string = "stories2") {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + this.token);
        const request: RequestInfo = new Request("http://localhost:1337/api/" + url, {
            method: 'GET',
            headers: headers
        });
        const { data, errors } = await (await fetch(request)).json();
        let mas: IRequest[] = new Array();
        for (let i = 0; i < data.length; i++) {
            mas.push((data[i]["attributes"] as IRequest));
        }
        return mas;
    }
}

export default Client;