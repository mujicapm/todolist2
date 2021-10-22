import React, {useContext} from "react";
import {StateContext} from "../Contexts";
import {useResource} from "react-request-hook";

export default function ToDoItem({
  id,
  title,
  description,
  dateCreated,
  isComplete,
  dateComplete
}) {
    const {dispatch} = useContext(StateContext);

    const [ ToDoItem, deleteToDoItem ] = useResource((id) => ({
        url: `/ToDoItems/${encodeURI(id)}`,
        method: 'delete',
    }))

    function handleDelete() {
        deleteToDoItem((id))
        dispatch({ type: "DELETE_TODO", id })
    }

    return (
        <div>
          <h3>{title}</h3>
          <div>{description}</div>
          <div>{dateCreated}</div>
          <div>
            <label htmlFor="item-complete">Complete:</label>
            <input
              type="checkbox"
              name="item-complete"
              id="item-complete"
              value="0"
              checked={isComplete}
              onChange={(e) => {
                dispatch({ type: "TOGGLE_TODO", id, isComplete });
              }}
            />
          </div>
          <div>
            <label htmlFor="item-completeTimeStamp">Date Completed:</label>
            <input
              type="text"
              name="item-completeTimeStamp"
              id="create-completeTimeStamp"
              value={dateComplete}
              readOnly
            />
          </div>
          <div>
            <input
              type="button"
              name="delete-item"
              id="delete-item"
              value="Delete"
              onClick={(e) => {
                  handleDelete();
              }}
            />
          </div>
        </div>
      );
}