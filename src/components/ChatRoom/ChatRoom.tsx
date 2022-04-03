import styles from "./chatRoom.module.scss";
export const ChatRoom = (): JSX.Element => {
  const currentUserId = 1;
  const messages = [
    { id: 1, text: "Привет", time: "06:00", senderId: 1 },
    { id: 2, text: "Доброе утро", time: "06:01", senderId: 2 },
    { id: 3, text: "Всем привет", time: "06:02", senderId: 3 },
    { id: 4, text: "что по планам?", time: "06:02", senderId: 3 },
    {
      id: 5,
      text: "Вы ебанулись, какие планы в 6 утра? Спать идите",
      time: "06:03",
      senderId: 4,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.room__header}></div>
      <div className={styles.room}>
        <div className={styles.room__chat}>
          {messages.map((message) => {
            <div className={styles.room__chat__message} key={message.id}>
              <div className={styles.room__chat__message__sender}>
                <img
                  className={styles.room__chat__message__sender__ava}
                  src=""
                  alt=""
                />
                <div className={styles.room__chat__message__sender__name}>
                  {message.senderId}
                </div>
              </div>
            </div>;
          })}
        </div>
        <div className={styles.room__form}></div>
      </div>
    </div>
  );
};
