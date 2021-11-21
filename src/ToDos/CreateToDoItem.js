import React, {useState, useEffect, useContext} from 'react'
import { StateContext } from './Contexts'
import { useResource } from 'react-request-hook'

import { useNavigation } from 'react-navi'


export default function CreatePost({}) {

    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [dateCreated, setDateCreated] = useState("");
    const navigation = useNavigation()

    const {state, dispatch} = useContext(StateContext)
    const {user} = state;

    const [ ToDoItem, putToDoItem ] = useResource(({title, content, dateCreated, complete, completedOn}) => ({
        url: '/todo',
        method: 'post',
        headers: {"Authorization": `${state.user.access_token}`},
        data:
            {
                title,
                content,
                dateCreated,
                complete,
                completedOn,
            }
    }))


    function handleTitle (evt) { setTitle(evt.target.value) }

    function handleContent (evt) { setContent(evt.target.value) }

    function handleCreate () {
        putToDoItem({ title, content})
    }

    function handleCreate() {
        putToDoItem({title, content, dateCreated, complete, completedOn})
    }

    useEffect(() => {
        if (ToDoItem && ToDoItem.data) {
            dispatch({type: "CREATE_TODO", id: ToDoItem.data.id, title: ToDoItem.data.title, content: ToDoItem.data.content, dateCreated: ToDoItem.data.dateCreated, complete: ToDoItem.data.complete, completedOn: ToDoItem.data.completedOn});
            console.log(ToDoItem.data)
            navigation.navigate(`/todo/${ToDoItem.data.id}`)
        }
    }, [ToDoItem])


    return (
        <form onSubmit={e => {e.preventDefault(); handleCreate();} }>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    name="create-title"
                    id="create-title"
                />
            </div>
            <textarea value={content} onChange={handleContent} />
            <input type="submit" value="Create" />
        </form>
    )
}