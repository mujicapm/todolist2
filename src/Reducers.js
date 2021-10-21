import handleDateCreated from "./HandleDate";

function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
        case "REGISTER":
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
                UUID: action.UUID,
                title: action.title,
                description: action.description,
                dateCreated: action.dateCreated,
                isComplete: false,
                dateComplete: undefined,
            };
            return [newPost, ...state];
        case "TOGGLE_TODO":
            if (action.isComplete) {
                return state.map((toDoItem) =>
                    toDoItem.UUID === action.UUID
                        ? {
                            ...toDoItem,
                            isComplete: !action.isComplete,
                            dateComplete: "",
                        }
                        : toDoItem
                );
            } else {
                return state.map((toDoItem) =>
                    toDoItem.UUID === action.UUID
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
                (toDoItem) => toDoItem.UUID !== action.UUID
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