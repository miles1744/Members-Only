import { Outlet, useNavigate } from "react-router"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";




const Home = () => {
    const { user, status } = useContext(UserContext);
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);

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
    
    
      const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/home/${id}`, {
          withCredentials: true
        });
      }

      useEffect(() => {
        if (status !== "ready" || !user) return;
      
        axios
          .get("http://localhost:3000/home", { withCredentials: true })
          .then((res) => {
            console.log("👀 messages from API:", res.data.messages);
            setMessages(res.data.messages || []);
          })
          .catch((err) => {
            console.error("Error fetching messages:", err);
          });
      }, [status, user, messages]);

    
      if (status === "loading") {
        return null; 
      }


    return(
        <>
        <Outlet/>
        <div className="message-container">
          {messages.length === 0 ? (
          <p></p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message">
              <h3>{msg.title}</h3>
              <p>{msg.body}</p>
              {msg.author_username === user.username ? (<div></div>):(
              <p>
                by {msg.first_name} {msg.last_name} <br/>
                at {msg.author_username}  <br/>
                {new Date(msg.created_at).toLocaleString()}
              </p>
              )}{user.admin ?
              (<button onClick={() => handleDelete(msg.id)}>Delete</button>): (<div></div>)}
            </div>
          ))
        )}
      </div>
        </>
    )
}

export default Home;