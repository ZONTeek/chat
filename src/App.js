import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// стили
import { Container } from "react-bootstrap";
// компоненты
import { ChatRoom } from "components/ChatRoom/ChatRoom";
import { Home } from "components/Home/Home";

// маршруты
const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/:roomId", name: "ChatRoom", Component: ChatRoom },
];

export const App = () => (
  <Router>
    <Container style={{ maxWidth: "512px" }}>
      <h1 className="mt-2 text-center">React Chat App</h1>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact></Route>
        ))}
      </Routes>
    </Container>
  </Router>
);
export default App;
