import React, {useContext} from "react";
import {StateContext} from "../Contexts";
import {useResource} from "react-request-hook";
import handleDateCreated from "../HandleDate";
import { Link } from "react-navi";
import { Card } from 'react-bootstrap'

export default function ToDoItem({id, title, description, dateCreated, isComplete, dateComplete, short = false}) {
    const {dispatch} = useContext(StateContext);

    const [ ToDoItem, deleteToDoItem ] = useResource((id) => ({
        url: `/ToDoItems/${encodeURI(id)}`,
        method: 'delete'
    }))

    function handleDelete() {
        deleteToDoItem((id))
        dispatch({ type: "DELETE_TODO", id })
    }

    const [toggle, toggleToDo ] = useResource((id, isComplete, dateComplete) => ({
        url: `/ToDoItems/${encodeURI(id)}`,
        method: 'patch',
        data: { isComplete, dateComplete }
    }))



    function handleToggle(){
        if (!isComplete) {
            dateComplete = handleDateCreated();
        } else {}
        dispatch({ type: "TOGGLE_TODO", id: id, isComplete: !isComplete });
        toggleToDo(id, !isComplete, dateComplete);
    }

    let processedContent = description

    if (short) {
        if (description.length > 30) {
            processedContent = description.substring(0, 30) + '...'
        }
    }


    return (
        <Card>
        <Card.Body>
            <Card.Title><Link href={`/todo/${id}`}><h3>{title}</h3></Link>
            </Card.Title>
            <Card.Text>
            <div>{processedContent}</div>
            <br />
            <i>Created on {dateCreated}</i>
            <div>
                <label htmlFor="item-complete">Complete:</label>
                <input type="checkbox" name="item-complete" id="item-complete" value="0" checked={isComplete} onChange={(e) => {handleToggle();}}/>
                <button onClick={(e) => {
                    handleDelete();
                }}>Delete Post</button>
                {isComplete && <span style={{ color: "blue" }}><br/><i>Completed on: {dateComplete}</i><br/></span>}
                {short &&
                <div>
                    <br />
                    <Link href={`/todo/${id}`}>View Full Task</Link>
                </div>
                }
            </div>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}