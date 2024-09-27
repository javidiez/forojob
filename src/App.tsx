import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { LogIn } from "./pages/LogIn/LogIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { AppProvider } from "./store/AppContext";
import { CreateTheme } from "./components/CreateTheme/CreateTheme";
import { Theme } from "./pages/Theme/Theme";
import { Admin } from "./pages/Admin/Admin";
import { MyThemes } from "./pages/MyThemes/MyThemes";
import { FavoriteTheme } from "./pages/FavoritesThemes/FavoritesThemes";
import { Profile } from "./pages/Profile/Profile";
import { SearchThemes } from "./pages/SearchThemes/SearchThemes";
import { CategoryThemes } from "./pages/CategoryThemes/CategoryThemes";
import { Footer } from "./components/Footer/Footer";

const App = () => {

  const NotFoundRedirect = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //   // Redirige a la página de perfil si la ruta no existe
    //   navigate('/');
    // }, [navigate]);

    return null;
  };

  return (
    <div className="app-container">
      <Router>
      <AppProvider>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-theme" element={<CreateTheme />} />
            <Route path="/theme/:id" element={<Theme />} />
            <Route path="/my-themes" element={<MyThemes />} />
            <Route path="/favorite-themes" element={<FavoriteTheme />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search-themes" element={<SearchThemes />} />
            <Route path="/category-themes/:id" element={<CategoryThemes />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFoundRedirect />} />
          </Routes>
          </div>
          <Footer/>
        </AppProvider>
      </Router>

    </div>
  );
};

export default App;
