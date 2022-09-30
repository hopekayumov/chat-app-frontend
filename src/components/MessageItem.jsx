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
    <div className="h-full w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 mb-6 p-3 cursor-pointer">
      <tr
        onClick={(e) => {
          openMailHandler(e);
          toggle();
        }}
      >
        <td className="mb-6">
          <small className="text-[17px] text-emerald-600">From: </small>
          <small className="text-blue-300 text-fuchsia-600 text-[17px]">
            {localStorage.getItem("userName") === from ? "ME" : from}
          </small>
        </td>
      </tr>
      <td className="inline-block">{title}</td>
      {modal && <div className="mt-1 text-blue-300">{message}</div>}
    </div>
  );
}
