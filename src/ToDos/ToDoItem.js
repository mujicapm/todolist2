import React, {useContext, useEffect} from 'react'
import { Link } from 'react-navi'
import { Card, Button } from 'react-bootstrap'

import { StateContext } from './Contexts'

import { useResource } from 'react-request-hook'


function ToDoItem({
  postId, title, content, dateCreated, complete, completedOn, short = false
}) {
    const {dispatch} = useContext(StateContext);

    const [deletedTodo, deleteTodo] = useResource((postId) => ({
        url: `/posts/${postId}`,
        method: "delete"
    }));

    const [toggledTodo, toggleTodo] = useResource((postId, completed) => ({
        url: `/posts/${postId}`,
        method: "patch",
        data: {
            complete:completed,
            completedOn: Date.now()
        }
    }));

    useEffect(() => {
        if (deletedTodo && deletedTodo.data && deletedTodo.isLoading === false) {
            dispatch({type: 'DELETE_POST', postId: postId})
        }
    }, [deletedTodo])

    useEffect(() => {
        if (toggledTodo && toggledTodo.data && toggledTodo.isLoading === false) {
            dispatch({type: 'TOGGLE_POST', complete:toggledTodo.data.complete, completedOn:toggledTodo.data.completedOn, postId})
        }
    }, [toggledTodo])

    let processedContent = content

    if (short) {
        if (content.length > 30) {
            processedContent = content.substring(0, 30) + '...'
        }
    }


    return (
        <Card>
            <Card.Body>
                <Card.Title><Link href={`/post/${postId}`}>{title}</Link>
                </Card.Title>
                <Card.Text>
                    {processedContent}
                    <i>Created on {dateCreated}</i>
                </Card.Text>

                <input type="checkbox" checked={complete} onChange={e => {toggleTodo(postId, e.target.checked)}} />
                <Button variant="link" onClick={(e) => {deleteTodo(postId)}}>Delete Post</Button>
                {complete && <i>Completed on: {new Date(completedOn).toLocaleDateString('en-us')}</i>}
                {short && <Link href={`/post/${postId}`}>View full post</Link>}

            </Card.Body>
        </Card>

    )
}

export default React.memo(ToDoItem);