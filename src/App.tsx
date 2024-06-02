import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Card, Container, Nav, Navbar } from "react-bootstrap";
import menuImage from "./assets/menu.svg";
import searchImage from "./assets/search.svg";
import testImage from "./assets/test.jpg";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import shareImage from "./assets/share.svg";
import heartImage from "./assets/heart.svg";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Android12Switch from "./components/SwitchC";
import Client from "./server/Client";
import IRequest from "./interfaces/IterfaceIRequest";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ServerHelper from "./components/HelperForServer";
import { v4 as uuidv4 } from 'uuid';
import { TextField } from "@mui/material";
import cancelImage from './assets/cancel.svg';

function App() {
  let flag = true;
  const serverHelper = new ServerHelper();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [colorShareIndex, setColorShareIndex] = useState(-1);
  const handleColorShareIndex = (i: number) => { setColorShareIndex(i) };
  const [colorHeartIndex, setColorHeartIndex] = useState(-1);
  const handleColorHeartIndex = (i: number) => { setColorHeartIndex(i) };
  //states: stories([0]), poems([1]), articles([2]), books([3]), all([])
  const [statesIndex, setStatesIndex] = useState(Array);
  const handleStatesIndex = (i: number[]) => { setStatesIndex(i) };
  const client = new Client();
  const [mas, setData] = useState(Array);
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = (x: string) => { setSearchInput(x) };
  const [showSearch, setShowSearch] = useState(false);
  const handleSearch = (x: boolean) => { setShowSearch(!x) };
  const [rawData, setRawData] = useState(Array);

  // throw ExceptionMap;
  document.title = "Том Торк";
  if (!Cookies.get('token')) { //token for new user
    Cookies.set('token', uuidv4());
  }
  else console.log(Cookies.get('token'));

  const navigate = useNavigate();

  if (flag) {
    flag = !flag;
    useEffect(() => {
      serverHelper.fetchData(client, setRawData, setData, rawData);
    })
  }
  console.log(rawData);

  return <>
    <Navbar expand="lg" style={{ backgroundColor: "rgba(215, 236, 255, 1)" }}>
      <Nav className="container-fluid">
        <Nav.Item className="ml-auto" style={{ paddingLeft: 10 }}>
          <Button onClick={handleShow} style={{
            margin: 1,
            backgroundColor: "rgba(164, 212, 255, 1)"
          }}>
            <img src={menuImage} width={30} height={30} />
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Сортировка</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <h5>Отсортируйте список доступной литературы:</h5>
              <FormGroup>
                <FormControlLabel className="d-flex justify-content-between" control={<Android12Switch />}
                  style={{ display: "flex", justifyContent: "end", paddingRight: 20, paddingTop: 10 }}
                  label={<span style={{ fontSize: 20 }}>Рассказы</span>} value="end" labelPlacement="start" />
                <FormControlLabel className="d-flex justify-content-between" control={<Android12Switch />}
                  style={{ display: "flex", justifyContent: "end", paddingRight: 20, paddingTop: 10 }}
                  label={<span style={{ fontSize: 20 }}>Статьи</span>} value="end" labelPlacement="start" />
                <FormControlLabel className="d-flex justify-content-between" control={<Android12Switch />}
                  style={{ display: "flex", justifyContent: "end", paddingRight: 20, paddingTop: 10 }}
                  label={<span style={{ fontSize: 20 }}>Поэмы</span>} value="end" labelPlacement="start" />
              </FormGroup>
              <Button style={{
                display: "flex", justifyContent: "center"
              }}>
                <a>Применить</a>
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </Nav.Item>
        <Nav.Item>
          <p className="text-start; fs-2" style={{ paddingLeft: 260, margin: 1, fontFamily: 'serif' }}>
            Том Торк — рассказы, стихи и статьи
          </p>
        </Nav.Item>
        <Nav.Item className="ml-auto">
          {<TextField className="content-wrapper"
            value={searchInput}
            style={{
              visibility: showSearch ? 'visible' : 'hidden',
              paddingRight: 20, marginBottom: 10
            }}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchInput(event.target.value);
                if (searchInput != "") setData(serverHelper.sortBySearch(rawData, searchInput));

              }}
            InputProps={{
              endAdornment: (
                <Button style={{
                  visibility: searchInput != '' ? 'visible' : 'hidden',
                  backgroundColor: "rgba(0, 0, 0, 0)", borderColor: "rgba(0, 0, 0, 0)"
                }}>
                  <img src={cancelImage} width={25} height={25}
                    onClick={() => {
                      setSearchInput('');
                    }}
                  />
                </Button>
              )
            }}
          />
          }
          <Button onClick={() => { handleSearch(showSearch) }}
            style={{
              backgroundColor: "rgba(164, 212, 255, 0)",
              borderBlockColor: "rgba(0, 0, 0, 0)",
              borderBottomColor: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(0, 0, 0, 0)",
              margin: 1
            }}>
            <img src={searchImage} width={30} height={30} />
          </Button>
        </Nav.Item>
      </Nav>
    </Navbar>

    <Container>
      {
        mas.map((item: any, index: number) => (
          <Row>
            {
              item.map((itemIn: IRequest, indexIn: number) => (
                <Col>
                  <Card className="mt-4">
                    <Card.Img variant="top" src={testImage} />
                    <Card.Body>
                      <Card.Title><h3>{itemIn.Label}</h3></Card.Title>
                      <Card.Text
                        onClick={() => {
                          Cookies.set('label', itemIn.Label);
                          Cookies.set('id', (index * 3 + indexIn).toString());
                          Cookies.set('likes', itemIn.likes.toString());
                          Cookies.set('date_release', itemIn.date_release);
                          Cookies.set('updatedAt', itemIn.updatedAt);
                          navigate('/text' + "/?id=" + Cookies.get('id'), { replace: true });
                        }}
                        style={{ whiteSpace: 'pre-wrap' }}>
                        {itemIn.Base.substring(0, 512) + "..."}</Card.Text>
                      <ButtonGroup style={{
                        position: "relative", justifyContent: "right", alignItems: 'right'
                      }}>
                        <Button className="center"
                          key={"share" + index.toString() + indexIn.toString()}
                          onClick={() => { console.log("share " + Number(index.toString() + indexIn.toString()) + " " + colorShareIndex) }}
                          style={{
                            backgroundColor: (colorShareIndex === Number(index.toString() + indexIn.toString()) ? "rgba(164, 212, 255, 0.5)" : "rgba(164, 212, 255, 1)"),
                            borderColor: "rgba(0, 0, 0)"
                          }} onMouseEnter={() => { handleColorShareIndex(Number(index.toString() + indexIn.toString())) }}
                          onMouseLeave={() => { handleColorShareIndex(-1) }}>
                          <img src={shareImage} width={20} height={20} />
                        </Button>
                        <Button className="center"
                          key={"like" + index.toString() + indexIn.toString()}
                          onClick={() => { console.log("like " + Number(index.toString() + indexIn.toString())) }}
                          style={{
                            backgroundColor: (colorHeartIndex === Number(index.toString() + indexIn.toString()) ? "rgba(164, 212, 255, 0.5)" : "rgba(164, 212, 255, 1)"),
                            borderColor: "rgba(0, 0, 0)"
                          }}
                          onMouseEnter={() => { handleColorHeartIndex(Number(index.toString() + indexIn.toString())) }}
                          onMouseLeave={() => { handleColorHeartIndex(-1) }}>
                          <img src={heartImage} width={20} height={20} />
                        </Button>
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
        ))
      }
    </Container >

    <h5 style={{
      display: "flex", justifyContent: "center", backgroundColor: "rgba(164, 212, 255, 0.5)",
      marginLeft: 312, marginRight: 312, borderEndStartRadius: 10, borderEndEndRadius: 10
    }}>
      <p style={{ marginTop: 30 }}>Официальный сайт Тома Торка. Вся актуальная информация доступна по ссылкам:
        &nbsp;
        <a href="https://t.me/tomtork_apw">telegram</a>,&nbsp;
        <a href="https://vk.com/tomtork_apw">vk</a>
      </p>&nbsp;

    </h5>
  </>

}

export default App;