// src/components/UserInfo.js
import React from "react";
import { getUserInfo } from "./auth";

const UserInfo = () => {
  const user = getUserInfo();

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <div className="user-info">
      <span>ID: {user.id}</span>
      <span>Name: {user.username}</span>
      <span>Master: {user.master ? "Administrador" : "Usuário"}</span>
    </div>
  );
};

export default UserInfo;
