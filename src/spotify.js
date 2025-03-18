import axios from "axios";
const authEndpoint = "https://accounts.spotify.com/authorize?";
//Crear un usuario en la API SPOTIFY y cambiar valor de ID
const clientId = "7ec77ac5caf14da095c5e9b72f379393";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-email",
  "user-read-playback-state",
  "user-library-read",
  "playlist-read-private",
  "user-modify-playback-state",
  "user-follow-read",
  "user-library-modify",
  "user-top-read",
  "playlist-modify-public",
  "playlist-modify-private",
  "ugc-image-upload",
  "playlist-read-collaborative",
].join("%20");
export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;

const apiClient = axios.create({ baseURL: "https://api.spotify.com/v1/" });

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
