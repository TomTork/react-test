import { TextField } from "@mui/material";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ReactQuill from "react-quill";

function AdminPage(){
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    return <div>
        <Container>
            <TextField className="content-wrapper"
            placeholder="Введи название произведения..."
            style={{ top: 0, marginLeft: 0, marginRight: 0, display: 'flex',
                marginTop: 25
             }}/>
            <ReactQuill theme="snow" style={{ paddingTop: 10 }}/>
            <Button className="center" onClick={() => {  }}
                />
        </Container>
        

    </div>
}

export default AdminPage;