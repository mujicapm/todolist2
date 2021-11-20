//TODO Add individual todo page and then confirm styling

import {useResource} from "react-request-hook";
import {useEffect} from "react";
import ToDoItem from "../ToDos/ToDoItem";

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
            <hr />
        </div>
    )
}