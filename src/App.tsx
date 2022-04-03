import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "components/Navigation/Navigation";

export const App = (): JSX.Element => (
  <Router>
    <Navigation />
  </Router>
);
export default App;
