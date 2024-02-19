import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Homepage() {
  return (
    <div>
      <main role="madin" style={{ marginTop: 50 }}>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Welcome to PingChat!</h1>
            <p>
              <strong>Respect confidentiality:</strong> Do not transfer personal
              data or confidential information via messenger, especially if you
              are not sure about the security of your communication. <br />
              <strong>Be polite:</strong> Keep a tone and respect in all your
              messages, avoiding insults, threats and rude expressions. <br />
              <strong>Do not spam:</strong> Do not send unwanted messages, mass
              mailings or unnecessary information. <br />
              <strong>Do not spread rumors and fakes:</strong> Check the
              authenticity of information before sharing it in messengers to
              avoid spreading rumors and false information. <br />
              <strong>Follow the ethics of confidentiality:</strong> Do not
              forward other people's private messages without the consent of the
              sender, even if they seem interesting or funny to you. <br />
              <strong>Take care of security:</strong> Use strong passwords to
              protect your account and personal data. <br />
            </p>
            <p>
              <Link
                className="btn btn-primary btn-lg"
                to="/inbox"
                role="button"
              >
                Get started »
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="container">
        <p>© doshan 2023-2024</p>
      </footer>
    </div>
  );
}

export default Homepage;
