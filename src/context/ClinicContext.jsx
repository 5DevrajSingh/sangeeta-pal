import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onValue, ref } from "firebase/database";

import { database } from "../config/firebase";
import { clinic as defaultClinic } from "../config/clinic";

const ClinicContext = createContext(null);

export function ClinicProvider({ children }) {
  const [clinic, setClinic] = useState(defaultClinic);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onValue(
      ref(database, "clinic"),
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setClinic(defaultClinic);
          setError("Clinic details are not available in Firebase.");
          setLoading(false);
          return;
        }

        const timings = Object.values(data.timings ?? {}).filter(
          (timing) =>
            timing &&
            typeof timing.label === "string" &&
            typeof timing.display === "string",
        );

        setClinic({
          ...defaultClinic,
          ...data,
          doctor: {
            ...defaultClinic.doctor,
            ...data.doctor,
          },
          address: {
            ...defaultClinic.address,
            ...data.address,
          },
          timings: timings.length ? timings : defaultClinic.timings,
        });

        setError("");
        setLoading(false);
      },
      (error) => {
        console.error("Clinic details could not be loaded:", error);
        setError("Unable to load updated clinic details.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <ClinicContext.Provider value={{ clinic, loading, error }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);

  if (!context) {
    throw new Error("useClinic must be used inside ClinicProvider.");
  }

  return context;
}