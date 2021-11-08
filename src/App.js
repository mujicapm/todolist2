import React, {useEffect, useReducer} from "react";
import appReducer from './Reducers';
import { StateContext } from './Contexts';
import {Col, Container, Row} from "react-bootstrap";
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";


function App() {

    const [ state, dispatch ] = useReducer(appReducer, { user: '', ToDoItems: [] })

    return (
      <div>
        <StateContext.Provider value={{state: state, dispatch: dispatch}}>
            <Container>
                <Row>
                    <Col>
                        <HeaderBar/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <HomePage/>
                    </Col>
                </Row>
            </Container>
        </StateContext.Provider>
      </div>
    );
}

export default App;