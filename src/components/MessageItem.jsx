import React, { useState } from "react";

export default function MessageItem({ title, from, message, id, isRead }) {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const openMailHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://chat-app-itransition.herokuapp.com/api/mail",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );
    const data = await response.json();

    if (data.status === "ok") {
      console.log("ok");
    } else {
      console.log("error");
    }
  };
  return (
    <div
      className="h-full w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 mb-6 p-3 cursor-pointer"
      onClick={(e) => {
        openMailHandler(e);
        toggle();
      }}
    >
      <div className="flex justify-between">
        <tr>
          <td className="mb-6">
            <small className="text-[17px] text-emerald-600">From: </small>
            <small className="text-blue-300 text-fuchsia-600 text-[17px]">
              {localStorage.getItem("userName") === from ? "ME" : from}
            </small>
          </td>
        </tr>
        <svg
          data-accordion-icon
          className={`w-6 h-6 rotate-${modal ? 180 : 0} shrink-0`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>

      <td className="inline-block">{title}</td>
      {modal && <div className="mt-1 text-blue-300">{message}</div>}
    </div>
  );
}
