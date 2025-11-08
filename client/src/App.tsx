import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/todos"
                element={
                    <ProtectedRoute>
                        <Todos />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="*" element={<Navigate to="/todos" replace />} />
        </Routes>
    );
}

export default App;
