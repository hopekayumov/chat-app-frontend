import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Logo } from "../components/Logo";
import {useNavigate} from "react-router-dom";

const Auth = () => {
  const [errorAuth, setErrorAuth] = useState(null);

  const navigate = useNavigate()

  const schema = yup.object().shape({
    name: yup.string().min(3).max(20).required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    try {
        axios.post(
        "https://chat-app-itransition.herokuapp.com/api/login/",
        {
          name: data.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setErrorAuth(null);
      localStorage.setItem("userName", data.name);
      navigate("/main")
    } catch (err) {
      const detail = err.response.data?.errors
        ? err.response.data.errors
        : "Something went wrong!";
      setErrorAuth(detail);
    }
  };
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white mb-12"
        >
          <Logo />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(submitForm)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  username
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={"type username..."}
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                ENTER
              </button>
            </form>
          </div>
        </div>
        <span className="text-center mt-4 text-red-600 font-bold">
          {errorAuth}
        </span>
      </div>
    </section>
  );
};

export default Auth;
