import React from "react";
import ToDoItem from "./ToDoItem";

export default function ToDoList({ ToDoItems = [], dispatch }) {

    return (
        <div>
            {ToDoItems.map((p, i) => (
                <ToDoItem {...p} key={"ToDoItem-" + i} dispatch={dispatch} />
            ))}
        </div>
    );
}