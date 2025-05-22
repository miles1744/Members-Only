import { useState, useContext, useEffect } from "react";
import { Outlet , Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

const Create = () => {
    const { user, status } = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");


    
    useEffect(() => {
      if (
        status === "ready"
        && (
          user === null
          || user.membership_status === "inactive"
        )
      ) {
        navigate("/", { replace: true });
      }
    }, [status, user, navigate]);
  

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
          await axios.post(
            "http://localhost:3000/create",
            { title, body },  
            { withCredentials: true }
        );
        navigate("/home", { replace: true });
        } catch (err) {
          console.error("Create failed:", err);
        }
      };

    return (
        <div>
            <Outlet/>

            <div className="create-message-container">
                <h1>Create a Message</h1>
                <form onSubmit={handleCreatePost}>
                    <input type="text" name="title" value={title}  onChange={(e) => {setTitle(e.target.value)} } placeholder="Title"/>
                    <textarea type="text" name="body" value={body} onChange={(e) => {setBody(e.target.value)}} placeholder="Body"> </textarea>
                    <button type="submit" className="btn-create">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create;