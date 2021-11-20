import React, {useEffect, useReducer} from "react";
import appReducer from './Reducers';
import { StateContext } from './Contexts';
import {Col, Container, Row} from "react-bootstrap";
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";
import CreateToDoItem from "./ToDos/CreateToDoItem"
import {mount, route} from "navi";
import TodoPage from "./pages/ToDoPage";
import {Router, View } from "react-navi";


function App() {

    const [ state, dispatch ] = useReducer(appReducer, { user: '', ToDoItems: [] })

    const routes = mount({
        '/': route({view: <HomePage/>}),
        '/todo/create': route({view: <CreateToDoItem/>}),
        '/todo/:id': route(req => {
            return {view: <TodoPage id={req.params.id}/>}
        }),
    })




return (
      <div>
        <StateContext.Provider value={{state: state, dispatch: dispatch}}>
            <Router routes={routes}>
                <Container>
                    <HeaderBar/>
                    <hr />
                    <View />
                </Container>
            </Router>
        </StateContext.Provider>
      </div>
    );
}

export default App;