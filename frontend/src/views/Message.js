import React from "react";
import "./style/Message.css";
import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import { Link, useHistory } from "react-router-dom/";
import moment from "moment";

function Message() {
  const baseURL = "http://127.0.0.1:8000/api";
  // Create New State
  const [messages, setMessages] = useState([]);
  let [newSearch, setnewSearch] = useState({ search: "" });

  // Initialize the useAxios Function to post and get data from protected routes
  const axios = useAxios();

  // Get and Decode Token
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  // Get Userdata from decoded token
  const user_id = decoded.user_id;
  const history = useHistory();

  useEffect(() => {
    try {
      // Send a get request to the api endpoint to get the message of the logged in user
      axios.get(baseURL + "/my-messages/" + user_id + "/").then((res) => {
        // Set the data that was gotten back from the database via the api to the setMessage state
        setMessages(res.data);
        // Console Log the data that was gotten from the db
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSearchChange = (event) => {
    setnewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });
  };

  const SearchUser = () => {
    axios
      .get(baseURL + "/search/" + newSearch.username + "/")
      .then((res) => {
        if (res.status === 404) {
          console.log(res.data.detail);
          alert("User does not exist");
        } else {
          history.push("/search/" + newSearch.username + "/");
        }
      })
      .catch((error) => {
        alert("User Does Not Exist");
      });
  };
  return (
    <div>
      <main className="content" style={{ marginTop: "150px" }}>
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card">
            <div className="row g-0">
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 ">
                  <div className="d-flfex align-itemfs-center">
                    <div className="flex-grow-1 d-flex align-items-center mt-2">
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        name="username"
                      />
                      <button
                        className="ml-2"
                        onClick={SearchUser}
                        style={{ border: "none", borderRadius: "50%" }}
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {messages.map((message) => (
                  <Link
                    to={
                      "/inbox/" +
                      (message.sender.id === user_id
                        ? message.reciever.id
                        : message.sender.id) +
                      "/"
                    }
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <small>
                      <div className="badge bg-success float-right text-white">
                        {moment
                          .utc(message.date)
                          .local()
                          .startOf("seconds")
                          .fromNow()}
                      </div>
                    </small>
                    <div className="d-flex align-items-start">
                      {message.sender.id !== user_id && (
                        <img
                          src={message.sender_profile.image}
                          className="rounded-circle mr-1"
                          alt="1"
                          width={40}
                          height={40}
                        />
                      )}
                      {message.sender.id === user_id && (
                        <img
                          src={message.reciever_profile.image}
                          className="rounded-circle mr-1"
                          alt="2"
                          width={40}
                          height={40}
                        />
                      )}
                      <div className="flex-grow-1 ml-3">
                        {message.sender.id === user_id &&
                          (message.reciever_profile.full_name !== null
                            ? message.reciever_profile.full_name
                            : message.reciever.username)}

                        {message.sender.id !== user_id &&
                          message.sender.username}
                        <div className="small">
                          <small>{message.message}</small>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src="http://127.0.0.1:8000/media/default.jpg"
                        className="rounded-circle mr-1"
                        alt="User"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>User</strong>
                      <div className="text-muted small">
                        <em>Online</em>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                <div className="chat-messages p-4">
                    <div className="chat-message-right pb-4">
                      <div>
                        <img
                          src={"http://127.0.0.1:8000/media/" + decoded.image}
                          className="rounded-circle mr-1"
                          alt="You"
                          width={40}
                          height={40}
                        />
                        <div className="text-muted small text-nowrap mt-2">
                          2:33 am
                        </div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div className="font-weight-bold mb-1">You</div>
                        Hello, where am I?
                      </div>
                    </div>
                    <div className="chat-message-left pb-4">
                      <div>
                        <img
                          src="http://127.0.0.1:8000/media/default.jpg"
                          className="rounded-circle mr-1"
                          alt="User"
                          width={40}
                          height={40}
                        />
                        <div className="text-muted small text-nowrap mt-2">
                          2:34 am
                        </div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div className="font-weight-bold mb-1">User</div>
                        Welcom to PingChat
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                    />
                    <button className="btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Message;
