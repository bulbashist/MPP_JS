import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type AuthFormData = {
  login: string;
  password: string;
};

const AuthPage = () => {
  const { register, handleSubmit } = useForm<AuthFormData>();

  const submitHandler: SubmitHandler<AuthFormData> = async (data) => {
    axios.post(
      "http://localhost:1337/auth",
      {
        login: data.login,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input type="text" className="input" {...register("login")} />
      <input type="password" className="input" {...register("password")} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthPage;
