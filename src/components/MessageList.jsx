import React, { useState, useEffect } from "react";
import MessageItem from "./MessageItem";

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const url = "https://chat-app-itransition.herokuapp.com/api/mail";
    const fetchData = async () => {
      const req = await fetch(url, {
        headers: {
          "x-access-token": localStorage.getItem("userName"),
        },
      });
      const data = await req.json();
      console.log(data)
      if (data.status === "ok") {
        setMessages(data.messages);
      }
    };
    fetchData();
    const comInterval = setInterval(fetchData, 5000);
    return () => clearInterval(comInterval);
  }, []);
  return (
    <div className="">
      {messages.length ? (
        <table className="mailServiceContent">
          <tbody>
            {[...messages].reverse().map((item) => (
              <MessageItem
                key={item._id}
                from={item.from}
                title={item.title}
                message={item.message}
                isRead={item.isRead}
                id={item._id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className=""> No incoming emails for you...</h5>
      )}
    </div>
  );
}
