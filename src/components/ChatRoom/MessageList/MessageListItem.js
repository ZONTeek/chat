// форматирование даты и времени
//import TimeAgo from "react-timeago";
// стили
//import { ListGroup, Card, Button } from "react-bootstrap";
// иконки
//import { AiOutlineDelete } from "react-icons/ai";

// функция принимает объект сообщения и функцию для удаления сообщений
export const MessageListItem = ({ msg, removeMessage }) => {
  // обрабатываем удаление сообщений
  const handleRemoveMessage = (id) => {
    removeMessage(id);
  };

  const { messageId, messageText, senderName, createdAt, currentUser } = msg;
  return (
    <div className={`d-flex ${currentUser ? "justify-content-end" : ""}`}>
      <div
        className="card"
        bg={`${currentUser ? "primary" : "secondary"}`}
        text="light"
        style={{ width: "55%" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          {/* передаем TimeAgo дату создания сообщения */}
          <div>{senderName}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>{messageText}</div>
          {/* удалять сообщения может только отправивший их пользователь */}
          {currentUser && (
            <button
              variant="none"
              className="text-warning"
              onClick={() => handleRemoveMessage(messageId)}
            ></button>
          )}
        </div>
      </div>
    </div>
  );
};
