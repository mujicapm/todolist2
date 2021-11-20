import {useResource} from "react-request-hook";
import {useContext, useEffect} from "react";
import ToDoList from "../ToDos/ToDoList";
import {StateContext} from "../Contexts";

export default function HomePage () {
    const {state, dispatch} = useContext(StateContext)
    const [ ToDoItems, getToDoItems ] = useResource(() => ({
        url: '/ToDoItems',
        method: 'get'
    }))

    useEffect(getToDoItems, [])
    useEffect(() => {
        if (ToDoItems && ToDoItems.data) {
            dispatch({ type: 'FETCH_POSTS', ToDoItems: ToDoItems.data.reverse() })
        }
    }, [ToDoItems])

    return (
        <>
            <ToDoList/>
        </>
    )
}