import React, {useContext} from 'react'
import {Col, Container, Row, Navbar, Nav} from "react-bootstrap";
import UserBar from "../User/UserBar";
import CreateToDoItem from "../ToDos/CreateToDoItem";
import {StateContext} from "../Contexts";
import {Link} from "react-navi";
import Header from "../Header";


export default function HeaderBar ({ setTheme }) {

    const {state} = useContext(StateContext);
    const {user} = state;

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><Header text="My ToDos" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user && <Nav.Link><Link href="/todo/create">Create New Post</Link></Nav.Link>}
                    </Nav>
                    <React.Suspense fallback={"Loading..."}>
                        <UserBar />
                    </React.Suspense>
                </Navbar.Collapse>
            </Container>
        </Navbar>


        // <Container>
            //     <Row>
            //         <Col>
            //             <UserBar/>
            //             <br />
            //             <br />
            //             <hr />
            //             <br />
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col>
            //             {user && <Link href="/todo/create">Create New Post</Link>}
            //             <br />
            //         </Col>
            //     </Row>
            // </Container>
    )
}