import React, {useState, useReducer, useEffect} from 'react';
import { mount, route } from 'navi';
import { Router, View } from 'react-navi';

import { Container } from 'react-bootstrap';

import appReducer from './reducers';


import {StateContext } from './Contexts';
import CreateToDoItem from './ToDos/CreateToDoItem';
import HeaderBar from './pages/HeaderBar';
import HomePage from './pages/HomePage';
import TodoPage from "./pages/ToDoPage";


function App() {

    const [ state, dispatch ] = useReducer(appReducer, { user: {}, posts: [] })

    const {user} = state;

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
)
}

export default App;