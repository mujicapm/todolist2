
import {useResource} from "react-request-hook";
import {useContext, useEffect} from "react";
import ToDoItem from "../ToDos/ToDoItem";
import {Link} from "react-navi";
import {StateContext} from "../Contexts";

export default function TodoPage ({ id }) {

    const {state} = useContext(StateContext);

    const [ toDoItem, getToDoItem ] = useResource(() => ({
        url: `/todo/${id}`,
        headers: {"Authorization": `${state.user.access_token}`},
        method: 'get'
    }))

    useEffect(getToDoItem, [id])

    return (
        <div>
            {(toDoItem && toDoItem.data)
                ? <ToDoItem {...toDoItem.data} />
                : 'Loading...'
            }
            <div><Link href="/">Go back</Link></div>
        </div>
    )
}