import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Books/>} />
          <Route path="/add/" element={<Add/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
