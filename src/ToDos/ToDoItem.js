import React, {useContext} from "react";
import {StateContext} from "../Contexts";

export default function ToDoItem({
  id,
  title,
  description,
  dateCreated,
  isComplete,
  dateComplete
}) {
    const {dispatch} = useContext(StateContext);
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
                dispatch({ type: "DELETE_TODO", id });
              }}
            />
          </div>
        </div>
      );
}