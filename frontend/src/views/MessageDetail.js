import React, { useRef } from "react";
import "./style/Message.css";
import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import { Link, useParams, useHistory } from "react-router-dom/";
import moment from "moment";

function MessageDetail() {
  const baseURL = "http://127.0.0.1:8000/api";
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  let [newMessage, setnewMessage] = useState({ message: "" });
  let [newSearch, setnewSearch] = useState({ search: "" });

  const axios = useAxios();
  const id = useParams();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const history = useHistory();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clickOnChat = (event) => {
    event.preventDefault();
    switch (event.detail) {
      case 1: {
        console.log('single click');
        break;
      }
      case 2: {
        console.log('double click');
        scrollToBottom();
        break;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [newMessage])

  useEffect(() => {
    try {
      axios.get(baseURL + "/my-messages/" + user_id + "/").then((res) => {
        setMessages(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Get all messages for a conversation
  useEffect( () => {
    let interval = setInterval(async () => {
      try {
        await axios
          .get(baseURL + "/get-messages/" + user_id + "/" + id.id + "/")
          .then((res) => {
            if (message.length > res.data.length) {
              scrollToBottom();
            }
            setMessage(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await axios.get(baseURL + "/profile/" + id.id + "/").then((res) => {
          setProfile(res.data);
          setUser(res.data.user);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  // capture changes made by the user in those fields and update the component's state accordingly.
  const handleChange = (event) => {
    setnewMessage({
      ...newMessage,
      [event.target.name]: event.target.value,
    });
  };

  // Send Message
  const SendMessage = async (event) => {
    event.preventDefault();

    if (newMessage.message !== null && newMessage.message !== "") {
      const formdata = new FormData();
      formdata.append("user", user_id);
      formdata.append("sender", user_id);
      formdata.append("reciever", id.id);
      formdata.append("message", newMessage);
      formdata.append("is_read", false);

      try {
        await axios.post(baseURL + "/send-messages/", formdata).then((res) => {
          document.getElementById("text-input").value = "";
          setnewMessage((newMessage = ""));
        });
      } catch (error) {
        console.log("error ===", error);
      }
    }
  };

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
        console.log(error);
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
                        type="submit"
                        style={{ border: "none", borderRadius: "50%" }}
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  {messages.map((message) => (
                    <Link
                      to={
                        "/inbox/" +
                        (message.sender.id === user_id
                          ? message.reciever.id
                          : message.sender.id) +
                        "/"
                      }
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
                            style={{ objectFit: "cover" }}
                          />
                        )}
                        {message.sender.id === user_id && (
                          <img
                            src={message.reciever_profile.image}
                            className="rounded-circle mr-1"
                            alt="2"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
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
              </div>
              <div onClick={clickOnChat} className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src={profile.image}
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>{profile.full_name}</strong>
                      <div className="text-muted small">
                        <em>@{user.username}</em>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <div
                    className="chat-messages p-4"
                    style={{ height: "20rem" }}
                  >
                    {message.map((message, index) => (
                      <>
                        {message.sender.id !== user_id && (
                          <div className="chat-message-left pb-4" key={index}>
                            <div>
                              <img
                                src={message.sender_profile.image}
                                className="rounded-circle mr-1"
                                alt="Chris Wood"
                                style={{ objectFit: "cover" }}
                                width={40}
                                height={40}
                              />
                              <div className="text-muted small text-nowrap mt-2"></div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                              <div className="font-weight-bold mb-1">
                                {message.sender_profile.full_name}
                              </div>
                              {message.message}
                              <br />
                              <div className="text-muted small text-nowrap mt-2">
                                {moment
                                  .utc(message.date)
                                  .local()
                                  .startOf("seconds")
                                  .fromNow()}
                              </div>
                            </div>
                          </div>
                        )}
                        {message.sender.id === user_id && (
                          <div className="chat-message-right pb-4" key={index}>
                            <div>
                              <img
                                src={message.sender_profile.image}
                                className="rounded-circle mr-1"
                                alt="Chris Wood"
                                style={{ objectFit: "cover" }}
                                width={40}
                                height={40}
                              />
                              <div className="text-muted small text-nowrap mt-2"></div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                              <div className="font-weight-bold mb-1">
                                You
                              </div>
                              {message.message}
                              <br />
                              <div className="text-muted small text-nowrap mt-2">
                                {moment
                                  .utc(message.date)
                                  .local()
                                  .startOf("seconds")
                                  .fromNow()}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <form className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                      value={newMessage.message}
                      name="message"
                      id="text-input"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <button onClick={SendMessage} type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MessageDetail;
