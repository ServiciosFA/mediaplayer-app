import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../store/tokenSlice";

const useRefreshToken = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  // Schedule periodic token expiration checks
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token && token.expiresTime && Date.now() >= token.expiresTime) {
        dispatch(
          tokenActions.SET_TOKEN({
            accessToken: null,
            tokenType: null,
            expiresIn: null,
            expiresTime: null,
          })
        );
      }
    };
    const checkInterval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(checkInterval); // Cleanup on unmount
  }, [dispatch, token]);

  return <></>;
};

export default useRefreshToken;
