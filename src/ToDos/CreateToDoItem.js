import React, {useState, useContext, useEffect} from "react";
import handleDateCreated from "../HandleDate";
import { StateContext } from '../Contexts';
import {useResource} from "react-request-hook";

export default function CreatePost({}) {
    const{dispatch} = useContext(StateContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const isComplete = false;
    const dateComplete = null;

    const [ ToDoItem, putToDoItem ] = useResource(({title, description, dateCreated, isComplete, dateComplete}) => ({
        url: '/ToDoItems',
        method: 'post',
        data:
            {
                title,
                description,
                dateCreated,
                isComplete,
                dateComplete
            }
    }))

    function handleTitle(evt) {
        setTitle(evt.target.value);
    }
    function handleDescription(evt) {
        setDescription(evt.target.value);
    }
    function handleOnClick() {
        setDateCreated(handleDateCreated());
    }

    function handleCreate() {
        putToDoItem({title, description, dateCreated, isComplete, dateComplete})
    }

    useEffect(() => {
        if (ToDoItem && ToDoItem.data) {
            dispatch({type: "CREATE_TODO", id: ToDoItem.data.id, title: ToDoItem.data.title, description: ToDoItem.data.description, dateCreated: ToDoItem.data.dateCreated, isComplete: ToDoItem.data.isComplete, dateComplete: ToDoItem.data.dateComplete});
        }
    }, [ToDoItem])

    function handleSubmit(e) {
        e.preventDefault();
        handleCreate();
        setTitle("");
        setDescription("");
    }

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
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
            <div>
                <label htmlFor="create-description">Description:</label>
                <input
                    type="textarea"
                    value={description}
                    onChange={handleDescription}
                    name="create-description"
                    id="create-description"
                    rows="5"
                    cols="33"
                />
            </div>
            <input
                type="submit"
                value="Create"
                onClick={handleOnClick}
                name="create"
            />
        </form>
    );
}