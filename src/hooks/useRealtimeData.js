import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../config/firebase";

export default function useRealtimeData(path) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    setState({ data: null, loading: true, error: "" });

    const unsubscribe = onValue(
      ref(database, path),
      (snapshot) => {
        setState({
          data: snapshot.val(),
          loading: false,
          error: "",
        });
      },
      (error) => {
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
      },
    );

    return unsubscribe;
  }, [path]);

  return state;
}