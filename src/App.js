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

  // const initialToDoItems = [
  //   {
  //     UUID: "223423",
  //     title: "Task 1",
  //     description: "Some text",
  //     dateCreated: "5/10/2021",
  //     isComplete: false,
  //     dateComplete: "",
  //   },
  //   {
  //     UUID: "22493423",
  //     title: "Task 2",
  //     description: "Some text",
  //     dateCreated: "6/10/2021",
  //     isComplete: false,
  //     dateComplete: "",
  //   },
  //   {
  //     UUID: "22993423",
  //     title: "Task 3",
  //     description: "Some text",
  //     dateCreated: "8/8/2021",
  //     isComplete: false,
  //     dateComplete: "",
  //   },
  // ];
    const [ state, dispatch ] = useReducer(appReducer, { user: '', ToDoItems: [] })

    useEffect(getToDoItems, [])
    useEffect(() => {
        if (ToDoItems && ToDoItems.data) {
            dispatch({ type: 'FETCH_POSTS', posts: ToDoItems.data })
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