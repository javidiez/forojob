import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { LogIn } from "./pages/LogIn/LogIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { AppProvider } from "./store/AppContext";

const App = () => {

  const NotFoundRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
      // Redirige a la página de perfil si la ruta no existe
      navigate('/');
    }, [navigate]);

    return null;
  };

  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFoundRedirect />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default App;
