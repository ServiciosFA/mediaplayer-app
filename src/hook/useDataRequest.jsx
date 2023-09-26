import { useEffect, useState } from "react";
import apiClient from "../spotify";

const useDataRequest = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const dataRequest = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    dataRequest();
  }, [url]);
  return { data, loading, error };
};

export default useDataRequest;
