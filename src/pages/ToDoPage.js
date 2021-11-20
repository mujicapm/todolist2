//TODO Add individual todo page and then confirm styling

import {useResource} from "react-request-hook";
import {useEffect} from "react";

export default function TodoPage ({ id }) {

    const [ ToDoItem, getToDoItem ] = useResource(() => ({
        url: `/ToDoItems/${id}`,
        method: 'get'
    }))

    useEffect(getToDoItem, [id])

    return (
        <div>
            {(ToDoItem && ToDoItem.data)
                ? <ToDoItem {...ToDoItem.data} />
                : 'Loading...'
            }
            <hr />
        </div>
    )
}