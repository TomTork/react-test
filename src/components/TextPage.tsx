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
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import Markdown from "react-markdown";

function TextPage() {
    console.log(window.location.search.substring(4));
    const serverHelper = new ServerHelper();
    const client = new Client();
    // const [mas, setData] = useState("");
    const index = window.location.search.substring(4);

    const [req, setReq] = useState({
        label: "",
        base: "",
        likes: 0,
        release_date: "",
        type: 0,
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
        users_like: "",
        images: ""
    } as IRequest);

    useEffect(() => {
        async function fetchData() {
            try {
                const content = await client.getAllData()
                const data = serverHelper.sortByTime(content);
                console.log(data[0].base);
                // if (!index) setData(data[Number(Cookies.get('id'))].Base);
                if (index) {
                    setReq(data[Number(index)]);
                    // setData(data[Number(window.location.search.substring(4))].Base);
                }
                else {
                    setReq({ label: "Error" } as IRequest);
                }
            } catch (error) {
                console.log('ERROR: ' + error);
            }
        }
        fetchData();
    }, []);
    document.title = req.label;
    const navigate = useNavigate();
    console.log(req.base)
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
                src={req.images["data"] != null ? "http://localhost:1337" + (req.images["data"][0]["attributes"] as ImageRequest).url : ""} />
            <h2 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.label}</h2>
            
            <Markdown 
                children={req.base}/>
            {/* <h4 style={{ padding: 20, whiteSpace: 'pre-wrap' }}><p>{req.base}</p></h4> */}
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.release_date}</h5>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.likes}</h5>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.updatedAt ? "Дата последнего изменения:" : ""} {req.updatedAt}</h5>
        </Container>
    </div>
}




export default TextPage;