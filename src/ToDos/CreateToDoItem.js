import React, {useState, useContext, useEffect} from "react";
import { v4 } from "uuid";
import handleDateCreated from "../HandleDate";
import { StateContext } from '../Contexts';
import {useResource} from "react-request-hook";

export default function CreatePost({}) {
    const{dispatch} = useContext(StateContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [UUID, setUUID] = useState("");
    const isComplete = false;
    const dateComplete = null;

    const [ ToDoItem, putToDoItem ] = useResource(({UUID, title, description, dateCreated, isComplete, dateComplete}) => ({
        url: '/ToDoItems',
        method: 'post',
        data:
            {
                UUID,
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
    function handleUUID() {
        setUUID(v4());
    }
    function handleOnClick() {
        setDateCreated(handleDateCreated());
        handleUUID();
    }

    function handleCreate() {
        putToDoItem({UUID, title, description, dateCreated, isComplete, dateComplete})
    }

    useEffect(() => {
        if (ToDoItem && ToDoItem.data) {
            dispatch({type: "CREATE_TODO", id: ToDoItem.data.id, UUID: ToDoItem.data.UUID, title: ToDoItem.data.title, description: ToDoItem.data.description, dateCreated: ToDoItem.data.dateCreated, isComplete: ToDoItem.data.isComplete, dateComplete: ToDoItem.data.dateComplete});
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