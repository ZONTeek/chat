import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useChat } from "hooks/useChat";

import { User } from "types/types";
import styles from "./chatRoom.module.scss";

export const ChatRoom = ({ user }: ChatRoomProps): JSX.Element => {
  const location = useLocation();
  const userId = user?.id;
  const roomId = location.pathname.split("/")[1];
  const { messages, sendMessage } = useChat(roomId);
  console.log(styles["wrapper"]);

  const formik = useFormik({
    initialValues: {
      newMessage: "",
    },
    onSubmit: (values) => {
      if (values.newMessage.trim().length > 0) {
        sendMessage(values.newMessage);
        formik.values.newMessage = "";
      }
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
              const current = message.senderId === userId;
              return (
                <div
                  className={
                    current
                      ? styles.room__chat__message__current
                      : styles.room__chat__message
                  }
                  key={message.messageId}
                >
                  {index === 0 ||
                  (index > 0 &&
                    message.senderId !== messages[index - 1].senderId) ? (
                    <div
                      className={
                        current
                          ? styles.room__chat__message__sender__current
                          : styles.room__chat__message__sender
                      }
                    >
                      <div
                        className={
                          styles[
                            current
                              ? "room__chat__message__sender__name__current"
                              : "room__chat__message__sender__name"
                          ]
                        }
                      >
                        {message.senderName}
                      </div>
                      <div className={styles.room__chat__message__sender__time}>
                        {moment(message.createdAt).format("L")}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles.room__chat__message__text}>
                    {message.messageText}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.room__form__wrapper}>
          <form
            className={styles.room__form}
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <input
              className={styles.room__form__input}
              name="newMessage"
              onChange={formik.handleChange}
              value={formik.values.newMessage}
              placeholder="Message"
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
type ChatRoomProps = {
  user: User | undefined;
};
