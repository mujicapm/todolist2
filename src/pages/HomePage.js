import {useResource} from "react-request-hook";
import {useContext, useEffect} from "react";
import ToDoList from "../ToDos/ToDoList";
import {StateContext} from "../Contexts";

export default function HomePage () {
    const {state, dispatch} = useContext(StateContext)
    const [ ToDoItems, getToDoItems ] = useResource(() => ({
        url: '/todo',
        method: 'get',
        headers: {"Authorization": `${state.user.access_token}`}
    }))


    useEffect(() =>{
        getToDoItems()
    }, [state.user.access_token])

    useEffect(() => {
        if (ToDoItems && ToDoItems.isLoading === false && ToDoItems.data) {
            console.log(ToDoItems.data)
            dispatch({ type: 'FETCH_POSTS', ToDoItems: ToDoItems.data.ToDoItems })
        }
    }, [ToDoItems])
    const { data, isLoading } = ToDoItems;

    return (
        <>
            {isLoading && 'Tasks are loading...'} <ToDoList/>
        </>
    )
}