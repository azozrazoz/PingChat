import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Person } from "react-bootstrap-icons";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  console.log(user);
  const token = localStorage.getItem("authTokens");

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <img
              style={{ width: "2.5rem", padding: "6px" }}
              src="http://127.0.0.1:8000/media/main_icon.svg"
              alt=""
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  {" "}
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              {token === null && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/register">
                      <i className="fas fa-user-plus"></i> Register
                    </Link>
                  </li>
                </>
              )}

              {token !== null && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/inbox">
                      {" "}
                      <i className="fas fa-envelope"></i>
                      Inbox
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      to={"/profile/" + user.user_id}
                      style={{ cursor: "pointer" }}
                    >
                      <Person />
                      <strong>{user.username}</strong>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
