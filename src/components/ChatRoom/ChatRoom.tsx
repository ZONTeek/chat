import { useFormik } from "formik";
import { useChat } from "hooks/useChat";
import { useLocation } from "react-router-dom";
import styles from "./chatRoom.module.scss";
import moment from "moment";

export const ChatRoom = (): JSX.Element => {
  const location = useLocation();
  const roomId = location.pathname.split("/")[1];
  const { messages, sendMessage } = useChat(roomId);
  const formik = useFormik({
    initialValues: {
      newMessage: "",
    },
    onSubmit: (values) => {
      if (values.newMessage.trim().length > 0) {
        sendMessage(values.newMessage);
        formik.values.newMessage = "";
      }
      console.log(messages);
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>Чат "Название чата"</div>
      <div className={styles.room}>
        <div className={styles.room__chat}>
          {messages &&
            messages.length > 0 &&
            messages.map((message, index) => {
              //const currentUser = false;
              return (
                <div
                  className={styles.room__chat__message}
                  key={message.messageId}
                >
                  {index === 0 ||
                  (index > 0 &&
                    message.senderId !== messages[index - 1].senderId) ? (
                    <div className={styles.room__chat__message__sender}>
                      {/* <img
                      className={styles.room__chat__message__sender__ava}
                      src={user}
                      alt=""
                    /> */}
                      <div>{message.senderName}</div>
                      <div className={styles.room__chat__message__sender__time}>
                        {moment(message.createdAt).format("L")}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles.room__chat__message__text}>
                    {message.messageText}
                    <span className={styles.room__chat__message__sender__time}>
                      {moment(message.createdAt).format("LTS")}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.room__form__wrapper}>
          <form className={styles.room__form} onSubmit={formik.handleSubmit}>
            <input
              className={styles.room__form__input}
              name="newMessage"
              onChange={formik.handleChange}
              value={formik.values.newMessage}
              placeholder="Message"
              type="text"
            />
            <button className={styles.room__form__submit} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
