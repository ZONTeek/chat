// стили
//import { Accordion, Card, Button, Badge } from "react-bootstrap";
// иконка - индикатор статуса пользователя

// компонент принимает объект с пользователями - нормализованную структуру
export const UserList = ({ users }) => {
  // преобразуем структуру в массив
  const usersArr = Object.entries(users);
  // получаем массив вида (массив подмассивов)
  // [ ['1', { username: 'Alice', online: false }], ['2', {username: 'Bob', online: false}] ]

  // количество активных пользователей
  const activeUsers = Object.values(users)
    // получаем массив вида
    // [ {username: 'Alice', online: false}, {username: 'Bob', online: false} ]
    .filter((u) => u.online).length;

  return (
    <div className="accordion">
      <div className="Card">
        <div className="Header" bg="none">
          <div
            className="Toggle"
            variant="info"
            eventKey="0"
            style={{ textDecoration: "none" }}
          >
            Active users{" "}
            <div className="Badge" variant="light">
              {activeUsers}
            </div>
          </div>
        </div>
        {usersArr.map(([userId, obj]) => (
          <div className="accordion Collapse" eventKey="0" key={userId}>
            <div className="card Body">
              {/*<RiRadioButtonLine
                className={`mb-1 ${
                  obj.online ? "text-success" : "text-secondary"
                }`}
                size="0.8em"
            />*/}{" "}
              {obj.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
