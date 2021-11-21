function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            return {
                'username': action.username,
                'access_token': action.access_token
            }
        case 'LOGOUT':
            return {
                'username': undefined,
                'access_token': undefined
            }
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
                content: action.content,
                dateCreated: action.dateCreated,
                complete: false,
                completedOn: undefined
            };
            return [newPost, ...state];
        case "TOGGLE_TODO":
            return state.map((p) => {
                if(p.id === action.id) {
                    p.complete = action.complete;
                    p.completedOn = action.completedOn;
                }
                return p;
            })

        case "DELETE_TODO":
            return state.filter((p) => p.id !== action.postId)
        case 'FETCH_POSTS':
            return action.ToDoItems
        default:
            return state;
    }
}
export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        posts: toDoReducer(state.ToDoItems, action)
    }
}