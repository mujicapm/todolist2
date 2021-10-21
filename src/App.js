import React, {useEffect, useReducer} from "react";
import UserBar from "./User/UserBar";
import CreateToDoItem from "./ToDos/CreateToDoItem";
import ToDoList from "./ToDos/ToDoList";
import appReducer from './Reducers';
import { StateContext } from './Contexts';
import { useResource } from 'react-request-hook';


function App() {

    const [ ToDoItems, getToDoItems ] = useResource(() => ({
        url: '/ToDoItems',
        method: 'get'
    }))

    const [ state, dispatch ] = useReducer(appReducer, { user: '', ToDoItems: [] })

    useEffect(getToDoItems, [])
    useEffect(() => {
        if (ToDoItems && ToDoItems.data) {
            dispatch({ type: 'FETCH_POSTS', ToDoItems: ToDoItems.data.reverse() })
        }
    }, [ToDoItems])

    const {user} = state;

    return (
      <div>
        <StateContext.Provider value={{state: state, dispatch: dispatch}}>
          <UserBar/>
          <br />
          <br />
          <hr />
          <br />
          {user && <CreateToDoItem/>}
          <ToDoList/>
        </StateContext.Provider>
      </div>
    );
}

export default App;