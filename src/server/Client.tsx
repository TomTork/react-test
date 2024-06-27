import { ExceptionMap } from "antd/es/result";
import IRequest from "../interfaces/IterfaceIRequest";
import { Strapi } from "@strapi/strapi";

class Client {
    urlServer = "http://localhost:1337/";
    token: string = "e19b0a1847fc19072500888e4f536ef0bb60a5c384ceba6d9344a6743bca28363326a85642a38a5b8eb16c87c59779bfdc284fad7968a1702aac1a3eebebe8df94362039c61e956804a1810e1cce66abebfe58321bc414f92f331d012be6f8e51c9f809bf0840f9c57d5c613ca60e465b570b5ee712e5725c3c85140a5c549c6";
    async getAllData(url: string = "contents") {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + this.token);
        const request: RequestInfo = new Request(this.urlServer + "api/" + url + '?populate=*', {
            method: 'GET',
            headers: headers
        });
        const { data, errors } = await (await fetch(request)).json();
        if (!errors) console.log(errors);
        let mas: IRequest[] = new Array();
        let currentRequest: IRequest = {
            id: 0,
            label: "",
            base: "",
            likes: 0,
            release_date: "",
            type: 0,
            createdAt: "",
            updatedAt: "",
            publishedAt: "",
            users_like: "",
            images: null
        } as IRequest;
        for (let i = 0; i < data.length; i++) {
            mas.push({
                id: Number(data[i]["id"]),
                label: data[i]["attributes"]["label"],
                base: data[i]["attributes"]["base"],
                likes: Number(data[i]["attributes"]["likes"]),
                release_date: data[i]["attributes"]["release_date"],
                type: Number(data[i]["attributes"]["type"]),
                createdAt: data[i]["attributes"]["createdAt"],
                updatedAt: data[i]["attributes"]["updatedAt"],
                publishedAt: data[i]["attributes"]["publishedAt"],
                users_like: data[i]["attributes"]["users_like"],
                images: this.countOccurrences(data[i].toString(), "images") ? data[i]["attributes"]["images"] : null
            } as IRequest);
        }
        console.log(mas);
        return mas;
    }
    async getFromId(id: number){
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + this.token);
        const request: RequestInfo = new Request(this.urlServer + "api/contents?filters[id][$in]=" + id.toString(), {
            method: 'GET',
            headers: headers
        });
        const { data, errors } = await (await fetch(request)).json();
        if (!errors) console.log(errors);
        return data[0]["attributes"] as IRequest;
    }
    async getAllFromType(type: number){
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + this.token);
        const request: RequestInfo = new Request(this.urlServer + "api/contents?populate=*&filters[type][$in]=" + type.toString(), {
            method: 'GET',
            headers: headers
        });
        const { data, errors } = await (await fetch(request)).json();
        if (!errors) console.log(errors);
        let mas: IRequest[] = new Array();
        for (let i = 0; i < data.length; i++) {
            mas.push({
                id: Number(data[i]["id"]),
                label: data[i]["attributes"]["label"],
                base: data[i]["attributes"]["base"],
                likes: Number(data[i]["attributes"]["likes"]),
                release_date: data[i]["attributes"]["release_date"],
                type: Number(data[i]["attributes"]["type"]),
                createdAt: data[i]["attributes"]["createdAt"],
                updatedAt: data[i]["attributes"]["updatedAt"],
                publishedAt: data[i]["attributes"]["publishedAt"],
                users_like: data[i]["attributes"]["users_like"],
                images: this.countOccurrences(data[i].toString(), "images") ? data[i]["attributes"]["images"] : null
            } as IRequest);
        }
        console.log(mas);
        return mas;
    }
    countOccurrences = (text: string, search: string) => (text.match(new RegExp(search, 'g')) || []).length;
    tokenUpdateLikes = "3c4d2744e2f853cbb54c247d32f6048a84247fc4a7c64caa5c80ac9079ed000ea3e1b0d9552fd8cfb5ea6a6665d74506cae045afddf8560ad8cf5da127e57a1228a604fb83fd4fc061115c961fadb0b36853d3d10b2b3bef1130c68aa88fed55512ca9df4eac2abc0c1102f46f37a3b5a92f4748ac7347fd62152e9ae257bfb7";
    async addLike(token: string, id: number){
        const data = await this.getFromId(id);
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + this.tokenUpdateLikes);
        if(data.users_like == null || !this.countOccurrences(data.users_like, token)){
            fetch(this.urlServer + "api/contents/" + id, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({ "data": { "likes": data.likes + 1,
                     "users_like": this.addNewUser(data.users_like, token).toString() } })
            })
            .then(response => response.json())
            .then(data => console.log(data));            
        }
        else{
            fetch(this.urlServer + "api/contents/" + id, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({ "data": { "likes": data.likes - 1,
                     "users_like": this.removeUser(data.users_like, token) } })
            })
            .then(response => response.json())
            .then(data => console.log(data));
        }
        
    }
    addNewUser(data?: string, newToken: string = ""): string{
        if(data == null){
            return newToken;
        }
        return data + "," + newToken;
    }
    removeUser(data?: string, oldToken?: string): string{
        if(data != null && oldToken != null && this.countOccurrences(data, ",")) return data.replace("," + oldToken, "");
        else if(data != null && oldToken != null) return data.replace(oldToken, "");
        else if(data != null) return data;
        return "";
    }
    async sendNewData(label: string, value: string, type: number, token: string){
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Authorization', 'Bearer ' + token);
            fetch(this.urlServer + "api/contents", {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({"data": {
                    "label": label,
                    "base": value,
                    "likes": 0,
                    "release_date": new Date(),
                    "type": type,
                    "users_like": ""
                }})
            })
            .then(response => response.json())
            .then(data => console.log(data));
        } catch (e){
            console.log(e);
        }
        
    }
}

export default Client;