import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import BackImage from "../assets/back.svg";
import Button from "react-bootstrap/Button";
import IRequest from "../interfaces/IterfaceIRequest";
import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
import ServerHelper from "./HelperForServer";
import Client from '../server/Client';
import ImageRequest from "../interfaces/InterfaceImageRequest";

function TextPage() {
    console.log(window.location.search.substring(4));
    const serverHelper = new ServerHelper();
    const client = new Client();
    // const [mas, setData] = useState("");
    const index = window.location.search.substring(4);

    const [req, setReq] = useState({
        Label: "", createdAt: "",
        updatedAt: "", publishedAt: "",
        Base: "", likes: -1,
        users_likes: "", date_release: "",
        Image: ""
    } as IRequest);

    useEffect(() => {
        async function fetchData() {
            try {
                const stories2 = await client.getAllData("stories2");
                const poems2 = await client.getAllData("poems2");
                const articles2 = await client.getAllData("articles2");
                const data = serverHelper.sortByTime(stories2.concat(poems2).concat(articles2));
                console.log(data[0].Base);
                // if (!index) setData(data[Number(Cookies.get('id'))].Base);
                if (index) {
                    setReq(data[Number(index)]);
                    // setData(data[Number(window.location.search.substring(4))].Base);
                }
                else {
                    setReq({ Label: "Error" } as IRequest);
                }
            } catch (error) {
                console.log('ERROR: ' + error);
            }
        }
        fetchData();
    }, []);
    document.title = req.Label;
    const navigate = useNavigate();
    return <div>
        <Navbar expand="lg" style={{ backgroundColor: "rgba(215, 236, 255, 1)" }}>
            <Nav className="container-fluid">
                <Nav.Item style={{ paddingLeft: 10 }}>
                    <Button onClick={() => { navigate("/", { replace: true }) }} style={{
                        margin: 1,
                        backgroundColor: "rgba(164, 212, 255, 1)"
                    }}>
                        <img src={BackImage} width={30} height={30} />
                    </Button>
                </Nav.Item>
            </Nav>
        </Navbar>
        <Container>
            <img width={600}
                style={{
                    paddingLeft: 20, paddingRight: 20, paddingTop: 10,
                    borderRadius: 30, borderWidth: 10, paddingBottom: 10
                }}
                src={req.Image["data"] != null ? "http://localhost:1337" + (req.Image["data"][0]["attributes"] as ImageRequest).url : ""} />
            <h2 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.Label}</h2>
            <h4 style={{ padding: 20, whiteSpace: 'pre-wrap' }}>{req.Base}</h4>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.date_release}</h5>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.likes}</h5>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.updatedAt ? "Дата последнего изменения:" : ""} {req.updatedAt}</h5>
        </Container>
    </div>
}


export default TextPage;