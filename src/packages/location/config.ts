interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export const getGeolocation = async (): Promise<LocationData> => {
  const emptyData: LocationData = {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  };

  if (!("geolocation" in navigator)) {
    console.warn("Geolocation not supported by this browser");
    return emptyData;
  }

  try {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          resolve(emptyData); // always return a valid object
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000,
        }
      );
    });
  } catch (err) {
    console.error("Error accessing geolocation:", err);
    return emptyData;
  }
};
