import React, {useEffect, useReducer} from "react";
import appReducer from './Reducers';
import { StateContext } from './Contexts';
import {Col, Container, Row} from "react-bootstrap";
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";
import CreateToDoItem from "./ToDos/CreateToDoItem"
import {mount, route} from "navi";
import TodoPage from "./pages/ToDoPage";


function App() {

    const [ state, dispatch ] = useReducer(appReducer, { user: '', ToDoItems: [] })

    const routes = mount({
        '/': route({view: <HomePage/>}),
        '/todo/create': route({view: <CreateToDoItem/>}),
        '/todo/:id': route(req => {
            return {view: <TodoPage id={req.params.id}/>}
        }),
    })

    //TODO On Slide "Defining Routes" - 1:19:50 10/19 Only implmented top left



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