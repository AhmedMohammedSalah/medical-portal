import { useEffect, useState } from "react";

const CLIENT_ID =
  "830041637628-d3troc4aqg9q48q7rmncg1d62sc3q26b.apps.googleusercontent.com";

const useGoogleAuth = () => {
  const [gapiLoaded, setGapiLoaded] = useState(false);

  useEffect(() => {
    // Prevent loading the script multiple times
    if (window.gapi && window.gapi.auth2) {
      setGapiLoaded(true);
      return;
    }

    const scriptId = "google-platform-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://apis.google.com/js/platform.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.gapi.load("auth2", () => {
          window.gapi.auth2
            .init({
              client_id: CLIENT_ID,
              scope: "profile email",
            })
            .then(() => setGapiLoaded(true))
            .catch(() => setGapiLoaded(false));
        });
      };
      document.body.appendChild(script);
    } else {
      // If script is already present, just initialize
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id: CLIENT_ID,
            scope: "profile email",
          })
          .then(() => setGapiLoaded(true))
          .catch(() => setGapiLoaded(false));
      });
    }
  }, []);

  return { gapiLoaded };
};

export default useGoogleAuth;
