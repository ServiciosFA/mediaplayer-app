import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Signin from "./pages/SigningPage";
import Login from "./pages/LoginPage";
import Trending from "./pages/TrendingPage";
import Library from "./pages/LibraryPage";
import Favorites from "./pages/FavoritesPage";
import Player from "./pages/PlayerPage";
import NavBar from "./ui/NavBar";
import Settings from "./pages/SettingsPage";
import "./App.scss";
import LocationInfo from "./hook/useToken";
import { useSelector } from "react-redux";
import RefreshToken from "./hook/useRefreshToken";

function App() {
  const token = useSelector((state) => state.token);

  //Controlar que el usuario este logueado
  const ProtectedRoute = ({ children }) => {
    if (!token?.accessToken) return <Navigate to="/login" />;
    else return children;
  };

  return (
    <Router>
      <div className="layout">
        {/*Hook useToken*/}
        <LocationInfo></LocationInfo>
        <RefreshToken></RefreshToken>
        <NavBar></NavBar>
        <div className="pagesContainer">
          <Routes>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <Trending></Trending>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Library></Library>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites></Favorites>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/player"
              element={
                <ProtectedRoute>
                  <Player></Player>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings></Settings>
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
