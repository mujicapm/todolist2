//TODO Add individual todo page and then confirm styling

import {useResource} from "react-request-hook";
import {useEffect} from "react";
import ToDoItem from "../ToDos/ToDoItem";
import {Link} from "react-navi";

export default function TodoPage ({ id }) {

    const [ toDoItem, getToDoItem ] = useResource(() => ({
        url: `/ToDoItems/${id}`,
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