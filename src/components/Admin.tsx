import { TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { Button, Container, ListGroupItem } from "react-bootstrap";
import ReactQuill from "react-quill";
import { sha512 } from 'sha512-crypt-ts';
import Client from "../server/Client";
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';

function AdminPage(){
    document.title = "Admin panel"
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState(0);
    const client = new Client();
    const hashToken = "$6$saltsalt$eYsE16OmFez/h6e5bMn9j7zNS1gSHmcVqPNy3.TI3cxMCnteOdxYQtWDk.3jGKaYvkqVP0HE743soQE.mrixG/";
    return <div>
        <Container>
            <TextField className="content-wrapper"
            placeholder="Введи название произведения..."
            style={{ top: 0, marginLeft: 0, marginRight: 0, display: 'flex',
                marginTop: 25
             }} value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}/>
            <ReactQuill theme="snow" style={{ paddingTop: 10 }} value={value} onChange={(value_) => { setValue(value_) }}/>
            <TextField className="content-wrapper"
            maxRows={1}
            placeholder="Введи токен..."
            style={{ top: 0, marginLeft: 0, marginRight: 0, display: 'flex',
                marginTop: 10, marginBottom: 15 }}
                value={token} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setToken(event.target.value) }}/>
        <ListGroup horizontal style={{ borderRadius: 0 }}>
            <ListGroupItem>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Жанр произведения
                    </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/poem" onClick={() => setType(0)}>Поэма</Dropdown.Item>
                    <Dropdown.Item href="#/story" onClick={() => setType(1)}>Рассказ</Dropdown.Item>
                    <Dropdown.Item href="#/article" onClick={() => setType(2)}>Статья</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </ListGroupItem>
            <ListGroupItem>
                <Button className="center" onClick={() => {
                    if(sha512.crypt(token, 'saltsalt').toString() == hashToken){
                        client.sendNewData(name, value, type, token);
                    }
                }}>Отправить
                </Button>
            </ListGroupItem>
        
        </ListGroup>
        
        
        
        </Container>
        

    </div>
}

export default AdminPage;