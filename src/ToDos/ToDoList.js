import React, {useContext} from "react";
import ToDoItem from "./ToDoItem";
import {StateContext} from "../Contexts";

export default function ToDoList() {
    const{state} = useContext(StateContext);
    const{ToDoItems} = state;

    return (
        <div>
            {ToDoItems.map((p, i) =>
                <ToDoItem {...p} short={true} title={p.title} description={p.description} key={"ToDoItem-" + i} id={p.id}/>)}
        </div>
    );
}