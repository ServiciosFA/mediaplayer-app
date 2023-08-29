import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../store/tokenSlice";
import { setClientToken } from "../spotify";

const useToken = ({ refresh }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const _token = useSelector((state) => state.token);

  useEffect(() => {
    if (!_token.accessToken && location.hash.includes("access_token")) {
      const array = location.hash.split("&");
      const data = {
        accessToken: array[0]?.split("=")[1],
        tokenType: array[1]?.split("=")[1],
        expiresIn: parseInt(array[2]?.split("=")[1]),
        expiresTime: parseInt(array[2]?.split("=")[1] * 1000) + Date.now(),
      };

      dispatch(tokenActions.SET_TOKEN(data));
      setClientToken(data.accessToken);
    } else {
      setClientToken(_token.accessToken);
    }
  }, [location, dispatch, _token]);

  return null;
};

export default useToken;
