import "./App.css";
import NavBar from "./components/navbar";
import { AuthProvider } from "./context/authContext";

function App() {
    return (
        <AuthProvider>
            <NavBar />
        </AuthProvider>
    );
}

export default App;
