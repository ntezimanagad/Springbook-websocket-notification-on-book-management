import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookPage from "./pages/BookPage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<BookPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
