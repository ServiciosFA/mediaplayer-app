import { useEffect, useState } from "react";
import apiClient from "../spotify";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notificationSlice";
import { tokenActions } from "../store/tokenSlice";

const useDataRequest = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const dataRequest = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(url);
        if (response.status === 403) throw new Error();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        dispatch(
          tokenActions.SET_TOKEN({
            accessToken: null,
            tokenType: null,
            expiresIn: null,
            expiresTime: null,
          })
        );
        dispatch(
          notificationActions.ACTIVE_NOTIFICATION({
            message: error.response.data || "An error occurred.",
            type: "error",
          })
        );
      }
    };
    dataRequest();
  }, [dispatch, url]);
  return { data, loading, error };
};

export default useDataRequest;
