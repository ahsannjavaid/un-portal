import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="vh-100"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(5px)"
        }}
      ></div>
      <div
        style={{
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ color: "var(--base-color)" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
