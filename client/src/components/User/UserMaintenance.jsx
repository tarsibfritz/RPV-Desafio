import React, { useState, useEffect } from "react";
import PhotoUploader from "./PhotoUploader";
import { getUsers, updateUser } from "../../services/userService";
import './userInfo.css';

const UserMaintenance = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setCurrentUser(usersData[0]);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleNextUser = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length);
    setCurrentUser(users[(currentUserIndex + 1) % users.length]);
  };

  const handlePrevUser = () => {
    setCurrentUserIndex(
      (prevIndex) => (prevIndex - 1 + users.length) % users.length
    );
    setCurrentUser(users[(currentUserIndex - 1 + users.length) % users.length]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoUpload = async (photo) => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("username", currentUser.username);
    formData.append("password", currentUser.password);
    formData.append("email", currentUser.email);
    formData.append("master", currentUser.master);
    formData.append("status", currentUser.status);

    try {
      await updateUser(currentUser.id, formData);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      setCurrentUser(updatedUsers[currentUserIndex]);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(currentUser.id, currentUser);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      setCurrentUser(updatedUsers[currentUserIndex]);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="user-maintenance-container">
      <div className="user-maintenance-top">
        <a href="/"><i class="bi bi-x-lg"></i></a>
        <h1>Manutenção do Usuário</h1>
      </div>

      <div className="user-photo-container">
        <img src={`../../assets/img/User.jpg`} alt="User" className="user-photo" />
      </div>
      <div className="photo-uploader">
          <PhotoUploader onPhotoUpload={handlePhotoUpload} />
      </div>
      <form onSubmit={handleFormSubmit}>
        <label>
            Username:
            <input
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                required
            />
        </label>
        <label>
            Email:
            <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                required
            />
        </label>
        <label>
            Password:
            <input
                type="password"
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
                required
            />
        </label>
        <div className="checkbox-container">
            <label>
                Master:
                <input
                    type="checkbox"
                    name="master"
                    checked={currentUser.master}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Status:
                <input
                    type="checkbox"
                    name="status"
                    checked={currentUser.status}
                    onChange={handleInputChange}
                />
            </label>
        </div>
        <div className="user-navigator-container">
          <button className="user-navigator-arrows" onClick={handlePrevUser}>
            <i class="bi bi-arrow-left-circle-fill"></i>
          </button>
          <button type="submit">Salvar</button>
          <button className="user-navigator-arrows" onClick={handleNextUser}>
            <i class="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>

    </form>
  
    </div>
  );
};

export default UserMaintenance;