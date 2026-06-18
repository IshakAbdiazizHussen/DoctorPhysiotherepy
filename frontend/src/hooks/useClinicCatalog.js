"use client";

import { useEffect, useState } from "react";
import { fetchDoctors, fetchServices } from "@/lib/api";

export default function useClinicCatalog() {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const [doctorData, serviceData] = await Promise.all([
          fetchDoctors(),
          fetchServices(),
        ]);

        if (!isMounted) {
          return;
        }

        setDoctors(doctorData);
        setServices(serviceData);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setDoctors([]);
        setServices([]);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load clinic information right now."
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    doctors,
    services,
    isLoading,
    errorMessage,
  };
}
