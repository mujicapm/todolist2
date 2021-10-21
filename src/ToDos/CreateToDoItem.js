import React, { useState, useContext } from "react";
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

    // const [ ToDoItem, putToDoItem ] = useResource(({UUID, title, description, dateCreated}) => ({
    //     url: '/ToDoItems',
    //     method: 'post',
    //     data:
    //         {
    //             UUID,
    //             title,
    //             description,
    //             dateCreated
    //         }
    // }))

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
    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: "CREATE_TODO",
            UUID,
            title,
            description,
            dateCreated,
        });
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