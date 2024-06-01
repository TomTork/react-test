import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import BackImage from "../assets/back.svg";
import Button from "react-bootstrap/Button";
import IRequest from "../interfaces/IterfaceIRequest";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function TextPage() {
    let req: IRequest = {
        Label: Cookies.get('label'), createdAt: "",
        updatedAt: Cookies.get('updatedAt'), publishedAt: "",
        Base: Cookies.get('base'), likes: Number(Cookies.get('likes')),
        users_likes: "", date_release: Cookies.get('date_release')
    } as IRequest;
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
            <h2 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.Label}</h2>
            <h4 style={{ padding: 20 }}>{req.Base}</h4>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.date_release}</h5>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>{req.likes}</h5>
            <h5 style={{ paddingLeft: 20, paddingRight: 20 }}>Дата последнего изменения: {req.updatedAt}</h5>
        </Container>
    </div>
}


export default TextPage;