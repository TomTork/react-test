import IRequest from "../interfaces/IterfaceIRequest";

class Client {
    token: string = "e19b0a1847fc19072500888e4f536ef0bb60a5c384ceba6d9344a6743bca28363326a85642a38a5b8eb16c87c59779bfdc284fad7968a1702aac1a3eebebe8df94362039c61e956804a1810e1cce66abebfe58321bc414f92f331d012be6f8e51c9f809bf0840f9c57d5c613ca60e465b570b5ee712e5725c3c85140a5c549c6";
    async getAllData(url: string = "contents") {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + this.token);
        const request: RequestInfo = new Request("http://localhost:1337/api/" + url + '?populate=*', {
            method: 'GET',
            headers: headers
        });
        const { data, errors } = await (await fetch(request)).json();
        if (!errors) console.log(errors);
        let mas: IRequest[] = new Array();
        for (let i = 0; i < data.length; i++) {
            mas.push((data[i]["attributes"] as IRequest));
        }
        console.log(mas[0].images['data']);
        return mas;
    }
}

export default Client;