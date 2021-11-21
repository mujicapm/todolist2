import React, {useContext} from "react";
import { StateContext } from '../Contexts';

// export default function Logout() {
//
//     const {state, dispatch} = useContext(StateContext);
//     const {user} = state;
//
//     return (
//         <form
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 dispatch({ type: "LOGOUT" });
//             }}
//         >
//             Logged in as: <b>{user.username}</b>
//             <input type="submit" value="Logout" />
//         </form>
//     );
// }
export default function Logout() {
    const {state, dispatch} = useContext(StateContext)
    const {user} = state;

    return (
        <form onSubmit={e => {e.preventDefault(); dispatch({type:"LOGOUT"}) } }>
            Logged in as: <b>{user.username}</b>
            <input type="submit" value="Logout" />
        </form>
    )
}