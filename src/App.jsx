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
import Settings from "./pages/SettingsPage";
import "./App.scss";
import { useSelector } from "react-redux";
import Home from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import PlaylistPage from "./pages/PlaylistPage";

function App() {
  const token = useSelector((state) => state.token);

  //Controlar que el usuario este logueado
  const ProtectedRoute = ({ children }) => {
    if (!token?.accessToken) return <Navigate to="/login" />;
    else return children;
  };

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout></AppLayout>}>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home></Home>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending></Trending>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library></Library>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/library/:playlistId"
            element={
              <ProtectedRoute>
                <PlaylistPage></PlaylistPage>
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
