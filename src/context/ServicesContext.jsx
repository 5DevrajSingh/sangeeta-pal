import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onValue, ref } from "firebase/database";

import { database } from "../config/firebase";

const ServicesContext = createContext(null);

export function ServicesProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onValue(
      ref(database, "services"),
      (snapshot) => {
        const data = snapshot.val();

        const items = Object.entries(data ?? {})
          .filter(([, service]) => service && typeof service === "object")
          .map(([id, service]) => ({
            ...service,
            id,
            points: Object.values(service.points ?? {}).filter(
              (point) => typeof point === "string",
            ),
          }))
          .sort(
            (a, b) =>
              (Number(a.sortOrder) || 0) -
                (Number(b.sortOrder) || 0) ||
              a.id.localeCompare(b.id),
          );

        setServices(items);
        setError("");
        setLoading(false);
      },
      (error) => {
        console.error("Unable to load services:", error);
        setError("Unable to load services. Please try again later.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <ServicesContext.Provider value={{ services, loading, error }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error("useServices must be used inside ServicesProvider.");
  }

  return context;
}