import handleDateCreated from "./HandleDate";

function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
        case "REGISTER":
            // const newUser = {
            //     id: action.id,
            //     username: action.username,
            //     password: action.password,
            // };
            // return [newUser, ...state];
            return action.username;
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}

function toDoReducer(state, action) {
    switch (action.type) {
        case "CREATE_TODO":
            const newPost = {
                id: action.id,
                title: action.title,
                description: action.description,
                dateCreated: action.dateCreated,
                isComplete: action.isComplete,
                dateComplete: action.dateComplete
            };
            return [newPost, ...state];
        case "TOGGLE_TODO":
            if (action.isComplete) {
                return state.map((toDoItem) =>
                    toDoItem.id === action.id
                        ? {
                            ...toDoItem,
                            isComplete: !action.isComplete,
                            dateComplete: "",
                        }
                        : toDoItem
                );
            } else {
                return state.map((toDoItem) =>
                    toDoItem.id === action.id
                        ? {
                            ...toDoItem,
                            isComplete: !action.isComplete,
                            dateComplete: handleDateCreated(),
                        }
                        : toDoItem
                );
            }
        case "DELETE_TODO":
            const newList = state.filter(
                (toDoItem) => toDoItem.id !== action.id
            );
            return newList;
        case 'FETCH_POSTS':
            return action.ToDoItems
        default:
            return state;
    }
}

export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        ToDoItems: toDoReducer(state.ToDoItems, action)
    }
}