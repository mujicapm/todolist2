import React, {useContext} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import UserBar from "../User/UserBar";
import CreateToDoItem from "../ToDos/CreateToDoItem";
import {StateContext} from "../Contexts";

export default function HeaderBar ({ setTheme }) {

    const {state} = useContext(StateContext);
    const {user} = state;

    return (
            <Container>
                <Row>
                    <Col>
                        <UserBar/>
                        <br />
                        <br />
                        <hr />
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {user && <CreateToDoItem/>}
                        <br />
                    </Col>
                </Row>
            </Container>
    )
}