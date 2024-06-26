import { TextField } from "@mui/material";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ReactQuill from "react-quill";
import { sha512 } from 'sha512-crypt-ts';

function AdminPage(){
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
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
            placeholder="Введи токен..."
            style={{ top: 0, marginLeft: 0, marginRight: 0, display: 'flex',
                marginTop: 10, marginBottom: 15 }}
                value={token} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setToken(event.target.value) }}/>
            <Button className="center" onClick={() => {
                if(sha512.crypt(token, 'saltsalt').toString() == hashToken){
                    
                }
             }}>Отправить</Button>
        </Container>
        

    </div>
}

export default AdminPage;