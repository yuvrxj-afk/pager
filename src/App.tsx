import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetailsWithRouter from "./components/PostDetails";
import HomePageWithRouter from "./components/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePageWithRouter} />
        <Route path="/post" Component={PostDetailsWithRouter} />
      </Routes>
    </Router>
  );
}

export default App;
