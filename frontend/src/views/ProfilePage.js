import React from "react";
import "./style/Message.css";
import { useState, useEffect, useContext } from "react";
import useAxios from "../utils/useAxios";
import { useParams } from "react-router-dom/";
import AuthContext from "../context/AuthContext";

function ProfilePage() {
  const baseURL = "http://127.0.0.1:8000/api";
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  const axios = useAxios();
  const id = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await axios.get(baseURL + "/profile/" + id.id + "/").then((res) => {
          setProfile(res.data);
          console.log(profile);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <main className="content" style={{ marginTop: "150px" }}>
        <div className="container p-0">
          <div className="card p-5">
            <div class="row">
              <div class="col-md-3">
                <img
                  src={profile.image}
                  alt={profile.full_name}
                  class="rounded-circle mr-1"
                  style={{
                    objectFit: "cover",
                    width: "10rem",
                    height: "10rem",
                    boxShadow: "0px 4px 15px 1px black",
                  }}
                />
              </div>
              <div class="col-md-9">
                <h2>{profile.full_name}</h2>
                <p>Email: {user.email}</p>
                <p>Bio: {profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
