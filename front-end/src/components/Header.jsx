import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="row">
        <div className="col">
          <div className="text-center">
            <Link to={"/"}>
              <img
                className="img mt-4 mb-2"
                src="./images/logo_0.0.png"
                alt="logo"
                height="30px"
                width="120px"
              />
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
