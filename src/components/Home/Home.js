import { useState, useRef } from "react";
// для маршрутизации используется react-router-dom
import { Link } from "react-router-dom";
// наш хук

import { useLocalStorage } from "hooks/useLocalStorage";
// для стилизации используется react-bootstrap

export function Home() {
  // создаем и записываем в локальное хранилище имя пользователя
  // или извлекаем его из хранилища
  const [username, setUsername] = useLocalStorage("username", "John");
  // локальное состояние для комнаты
  const [roomId, setRoomId] = useState("free");
  const linkRef = useRef(null);

  // обрабатываем изменение имени пользователя
  const handleChangeName = (e) => {
    setUsername(e.target.value);
  };

  // обрабатываем изменение комнаты
  const handleChangeRoom = (e) => {
    setRoomId(e.target.value);
  };

  // имитируем отправку формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // выполняем нажатие кнопки
    linkRef.current.click();
  };

  const trimmed = username.trim();

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="Group">
        <div>Name:</div>
        <input value={username} onChange={handleChangeName} />
      </div>
      <div className="Group">
        <div>Room:</div>
        <select as="select" value={roomId} onChange={handleChangeRoom}>
          <option value="free">Free</option>
          <option value="job" disabled>
            Job
          </option>
        </select>
      </div>
      {trimmed && (
        <button variant="success" as={Link} to={`/${roomId}`} ref={linkRef}>
          Chat
        </button>
      )}
    </form>
  );
}
