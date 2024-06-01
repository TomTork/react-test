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

function SplitMassive(mas: any[]) {
  const objMas = [];
  for (let i = 0; i < mas.length; i += 3) {
    objMas.push(mas.slice(i, i + 3));
  }
  return objMas;
}

function sortByTime(mas: IRequest[]) {
  return mas.sort((a, b) => a.date_release.localeCompare(b.date_release)).reverse();
}

function App() {
  document.title = "Том Торк";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSearch, setShowSearch] = useState(false);
  const handleSearch = (x: boolean) => { setShowSearch(!x) };

  const [colorShareIndex, setColorShareIndex] = useState(-1);
  const handleColorShareIndex = (i: number) => { setColorShareIndex(i) };

  const [colorHeartIndex, setColorHeartIndex] = useState(-1);
  const handleColorHeartIndex = (i: number) => { setColorHeartIndex(i) };

  //states: stories([0]), poems([1]), articles([2]), books([3]), all([])
  const [statesIndex, setStatesIndex] = useState(Array);
  const handleStatesIndex = (i: number[]) => { setStatesIndex(i) };

  const client = new Client();
  const [mas, setData] = useState(Array);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const stories2 = await client.getAllData("stories2");
        const poems2 = await client.getAllData("poems2");
        const articles2 = await client.getAllData("articles2");
        const data = sortByTime(stories2.concat(poems2).concat(articles2));
        setData(SplitMassive(data));
      } catch (error) {
        console.log('ERROR: ' + error);
      }
    }
    fetchData();
  }, []);

  return <>
    <Navbar expand="lg" style={{ backgroundColor: "rgba(215, 236, 255, 1)" }}>
      <Nav className="container-fluid">
        <Nav.Item style={{ paddingLeft: 10 }}>
          <Button onClick={handleShow} style={{
            margin: 1,
            backgroundColor: "rgba(164, 212, 255, 1)",
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
          <p className="text-start; fs-2" style={{ paddingLeft: 15, margin: 1, fontFamily: 'serif' }}>
            Том Торк — рассказы, стихи и статьи
          </p>
        </Nav.Item>
        <Nav.Item className="ml-auto">
          <Button onClick={() => { handleSearch(showSearch) }} style={{ backgroundColor: "rgba(164, 212, 255, 1)" }}>
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
                    <Card.Body onClick={() => {
                      Cookies.set('label', itemIn.Label);
                      Cookies.set('base', itemIn.Base);
                      Cookies.set('likes', itemIn.likes.toString());
                      Cookies.set('date_release', itemIn.date_release);
                      Cookies.set('updatedAt', itemIn.updatedAt);
                      navigate('/text', { replace: true });
                    }}>
                      <Card.Title><h3>{itemIn.Label}</h3></Card.Title>
                      <Card.Text>{itemIn.Base.substring(0, 512) + "..."}</Card.Text>
                      <ButtonGroup style={{
                        position: "relative", justifyContent: "right", alignItems: 'right'
                      }}>
                        <Button className="center"
                          key={"share" + index.toString() + indexIn.toString()}
                          onClick={() => { console.log("share " + Number(index.toString() + indexIn.toString()) + " " + colorShareIndex) }}
                          style={{
                            backgroundColor: (colorShareIndex === Number(index.toString() + indexIn.toString()) ? "rgba(164, 212, 255, 0.5)" : "rgba(164, 212, 255, 1)"),
                            borderColor: "rgba(164, 212, 255)"
                          }} onMouseEnter={() => { handleColorShareIndex(Number(index.toString() + indexIn.toString())) }}
                          onMouseLeave={() => { handleColorShareIndex(-1) }}>
                          <img src={shareImage} width={20} height={20} />
                        </Button>
                        <Button className="center"
                          key={"like" + index.toString() + indexIn.toString()}
                          onClick={() => { console.log("like " + Number(index.toString() + indexIn.toString())) }}
                          style={{
                            backgroundColor: (colorHeartIndex === Number(index.toString() + indexIn.toString()) ? "rgba(164, 212, 255, 0.5)" : "rgba(164, 212, 255, 1)"),
                            borderColor: "rgba(164, 212, 255)"
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