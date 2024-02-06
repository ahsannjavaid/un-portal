import React from "react";

export default function LoadingSpinner({ showingApologoies }) {
  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        zIndex: 1,
        textAlign: "center",
      }}
    >
      {showingApologoies ? (
        <div
          className="text-white rounded p-3 mb-3"
          style={{ maxWidth: "200px", backgroundColor: "var(--base-color)" }}
        >
          <p>
            Since, I am using free hosting services, so you might have to wait
            <b> 1 minute </b>
            or so. If it still continues to spin then{" "}
            <a className="text-white" href="/#/">
              refresh
            </a>
            .
          </p>
        </div>
      ) : null}
      <div
        className="spinner-border"
        style={{ color: "var(--base-color)" }}
        role="status"
      />
    </div>
  );
}
