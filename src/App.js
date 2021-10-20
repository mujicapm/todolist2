import React, { useReducer } from "react";
import UserBar from "./User/UserBar";
import CreateToDoItem from "./ToDos/CreateToDoItem";
import ToDoList from "./ToDos/ToDoList";
import appReducer from './Reducers';
// import handleDateCreated from "./HandleDate";

function App() {
  const initialToDoItems = [
    {
      UUID: "223423",
      title: "Task 1",
      description: "Some text",
      dateCreated: "5/10/2021",
      isComplete: false,
      dateComplete: "",
    },
    {
      UUID: "22493423",
      title: "Task 2",
      description: "Some text",
      dateCreated: "6/10/2021",
      isComplete: false,
      dateComplete: "",
    },
    {
      UUID: "22993423",
      title: "Task 3",
      description: "Some text",
      dateCreated: "8/8/2021",
      isComplete: false,
      dateComplete: "",
    },
  ];

  const [ state, dispatch ] = useReducer(appReducer, { user: '', ToDoItems: initialToDoItems })
  const {user, ToDoItems} = state;
  // function userReducer(state, action) {
  //   switch (action.type) {
  //     case "LOGIN":
  //     case "REGISTER":
  //       return action.username;
  //     case "LOGOUT":
  //       return "";
  //     default:
  //       return state;
  //   }
  // }
  //
  // function toDoReducer(state, action) {
  //   switch (action.type) {
  //     case "CREATE_TODO":
  //       const newPost = {
  //         UUID: action.UUID,
  //         title: action.title,
  //         description: action.description,
  //         dateCreated: action.dateCreated,
  //         isComplete: false,
  //         dateComplete: "",
  //       };
  //       return [newPost, ...state];
  //     case "TOGGLE_TODO":
  //       if (action.isComplete) {
  //         return state.map((toDoItem) =>
  //             toDoItem.UUID === action.UUID
  //                 ? {
  //                   ...toDoItem,
  //                   isComplete: !action.isComplete,
  //                   dateComplete: "",
  //                 }
  //                 : toDoItem
  //         );
  //       } else {
  //         return state.map((toDoItem) =>
  //             toDoItem.UUID === action.UUID
  //                 ? {
  //                   ...toDoItem,
  //                   isComplete: !action.isComplete,
  //                   dateComplete: handleDateCreated(),
  //                 }
  //                 : toDoItem
  //         );
  //       }
  //     case "DELETE_TODO":
  //       const newList = state.filter(
  //           (toDoItem) => toDoItem.UUID !== action.UUID
  //       );
  //       return newList;
  //     default:
  //       return state;
  //   }
  // }

  // const [user, dispatchUser] = useReducer(userReducer, "");
  // const [ToDoItems, dispatchToDo] = useReducer(toDoReducer, initialToDoItems);

  return (
      <div>
        <UserBar user={user} dispatch={dispatch} />
        <br />
        <br />
        <hr />
        <br />
        {user && (
            <CreateToDoItem ToDoItems={ToDoItems} dispatch={dispatch} />
        )}
        <ToDoList ToDoItems={ToDoItems} dispatch={dispatch} />
      </div>
  );
}

export default App;