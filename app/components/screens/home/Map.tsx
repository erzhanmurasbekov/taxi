import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useActions } from "@/app/hooks/useActions";
import { useTypedSelector } from "@/app/hooks/useTypedSelecor";
import { optionsList } from "./data";

interface IMAP {
  map: google.maps.Map;
  maps: any;
}

const Map = () => {
  const [MAP, setMap] = useState<IMAP | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  const { setTravelTime, setSelectedOption } = useActions();
  const { from, to } = useTypedSelector((state) => state.taxi);

  const renderRoute = () => {
    if (!isMapLoaded || !MAP || !from.location || !to.location) {
      return;
    }

    const { map, maps } = MAP;

    const directionsService = new maps.DirectionsService();

    directionsService
      .route({
        origin: from.location,
        destination: to.location,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res: any) => {
        // Clear previous route
        if (directionsRenderer) {
          directionsRenderer.setMap(null);
        }

        // Create new directionsRenderer
        const newDirectionsRenderer = new maps.DirectionsRenderer({ map });
        newDirectionsRenderer.setDirections(res);

        const durationSec = res.routes[0].legs[0].duration?.value;
        if (durationSec) {
          setTravelTime(Math.ceil(durationSec / 60));
          setSelectedOption(optionsList[0]._id);
        }

        setDirectionsRenderer(newDirectionsRenderer);
      })
      .catch((err: any) => alert("not possible"));
  };

  useEffect(() => {
    if (isMapLoaded && MAP && from.location && to.location) {
      renderRoute();
    }
  }, [isMapLoaded, MAP, from, to]);

  const handleMapLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setMap({ map, maps });
    setIsMapLoaded(true);
  };

  return (
    <div className="h-screen w-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: String(process.env.MAP_KEY) }}
        defaultCenter={{ lat: 47.610378, lng: -122.200676 }}
        defaultZoom={13}
        options={{
          zoomControl: false,
          fullscreenControl: false,
          keyboardShortcuts: false,
          clickableIcons: false,
        }}
        center={
          from.location?.lat
            ? {
                lat: from.location.lat,
                lng: from.location.lng,
              }
            : undefined
        }
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleMapLoaded}
      />
    </div>
  );
};

export default Map;
