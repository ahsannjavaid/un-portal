import React from "react";

export default function PaginationNavigation({
  pageDecrement,
  pageIncrement,
  pgNum,
}) {
  return (
    <div className="text-center">
      <button
        onClick={pageDecrement}
        className="btn btn-sm btn-outline fw-bolder"
        style={{ color: "#4D3189", borderColor: "#4D3189" }}
      >
        «
      </button>
      <span className="ms-2 me-2">{pgNum}</span>
      <button
        onClick={pageIncrement}
        className="btn btn-sm btn-outline fw-bolder"
        style={{ color: "#4D3189", borderColor: "#4D3189" }}
      >
        »
      </button>
    </div>
  );
}
