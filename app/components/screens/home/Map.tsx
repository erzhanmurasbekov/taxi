import { useActions } from "@/app/hooks/useActions";
import { useTypedSelector } from "@/app/hooks/useTypedSelecor";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { optionsList } from "./data";

interface IMAP {
  map: google.maps.Map;
  maps: any;
}

const Map = () => {
  const [MAP, setMap] = useState<IMAP>({} as IMAP);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  const { setTravelTime, setSelectedOption } = useActions();
  const { from, to } = useTypedSelector((state) => state.taxi);

  const renderRoute = () => {
    const { map, maps } = MAP;

    if (!directionsRenderer) {
      const newDirectionsRenderer = new maps.DirectionsRenderer();
      setDirectionsRenderer(newDirectionsRenderer);
      newDirectionsRenderer.setMap(map);
    }

    const directionsService: google.maps.DirectionsService =
      new maps.DirectionsService();

    directionsService
      .route({
        origin: from.location,
        destination: to.location,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        if (directionsRenderer) {
          directionsRenderer.setDirections(res);
          const durationSec = res.routes[0].legs[0].duration?.value;
          if (durationSec) {
            setTravelTime(Math.ceil(durationSec / 60));
            setSelectedOption(optionsList[0]._id);
          }
        }
      })
      .catch((err) => alert(err));

    directionsRenderer?.setOptions({
      markerOptions: {
        clickable: false,
      },
    });
  };

  useEffect(() => {
    if (from.location?.lat && to.location?.lat && MAP?.map && MAP?.maps) {
      renderRoute();
    }
  }, [from, to, MAP]);

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
        onGoogleApiLoaded={({ map, maps }) => setMap({ map, maps })}
      />
    </div>
  );
};

export default Map;
