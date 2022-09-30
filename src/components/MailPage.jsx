import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import Select, { components } from "react-select";

export default function MailPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const url = "https://chat-app-itransition.herokuapp.com/api/login";
    const getAllRecipientsList = async () => {
      const req = await fetch(url, {
        headers: {
          "x-access-token": localStorage.getItem("userName"),
        },
      });
      const data = await req.json();
      if (data.status === "ok") {
        setOptions(
          data.recipients.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      }
    };
    getAllRecipientsList();
    const comInterval = setInterval(getAllRecipientsList, 5000);
    return () => {
      clearInterval(comInterval);
      // localStorage.removeItem("userName");
    };
  }, []);

  const sendMail = async (event) => {
    event.preventDefault();
    let from = localStorage.getItem("userName");
    let recipients = selectedOption.map((item) => item.value);
    if (recipients && title && message) {
      const response = await fetch(
        "https://chat-app-itransition.herokuapp.com/api/mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            recipients,
            title,
            message,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "ok") {
        setSelectedOption(null);
        setTitle("");
        setMessage("");
      } else console.log(data.error);
    } else console.log("One of field is empty");
  };

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">No such recipient</span>
      </components.NoOptionsMessage>
    );
  };

  return (
    <div className="flex justify-between">
      <div className="max-w-[400px] h-full w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-8">
        <form onSubmit={sendMail}>
          <div className="mb-6">
            <Select
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              value={selectedOption}
              options={options}
              placeholder={"Recipients"}
              isMulti={true}
              components={{ NoOptionsMessage }}
            />
          </div>
          <div className="">
            <div className="relative mb-6">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
          >
            Send a message
          </button>
        </form>
      </div>
      <MessageList />
    </div>
  );
}
