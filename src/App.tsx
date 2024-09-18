import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";

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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
