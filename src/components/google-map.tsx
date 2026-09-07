import { useEffect, useRef, useState } from "react";

type MapPoint = { lat: number; lng: number };

type MapOptions = {
  center: MapPoint;
  zoom: number;
  styles: Array<{
    elementType?: string;
    featureType?: string;
    stylers: Array<Record<string, number | string | undefined>>;
  }>;
  disableDefaultUI: boolean;
  zoomControl: boolean;
  streetViewControl: boolean;
  fullscreenControl: boolean;
  mapTypeControl: boolean;
};

type GoogleMap = { setCenter: (point: MapPoint) => void };

type GoogleMapsNamespace = {
  Map: new (element: HTMLElement, options: MapOptions) => GoogleMap;
  Marker: new (options: {
    map: GoogleMap;
    position: MapPoint;
    title: string;
    icon?: {
      path: unknown;
      scale: number;
      fillColor: string;
      fillOpacity: number;
      strokeColor: string;
      strokeWeight: number;
    };
  }) => unknown;
  SymbolPath: { CIRCLE: unknown };
};

type GoogleWindow = Window & {
  google?: { maps?: GoogleMapsNamespace };
};

const mapCenter: MapPoint = { lat: -27.0948605, lng: -52.615477 };
const callbackName = "__carraroBernardiMapsReady";
let mapsScriptPromise: Promise<GoogleMapsNamespace> | null = null;

const grayscaleMapStyles: MapOptions["styles"] = [
  { elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "landscape.natural.landcover", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "landscape.natural.terrain", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.business", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.attraction", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.medical", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.school", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.government", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.place_of_worship", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi.sports_complex", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "building", elementType: "geometry.fill", stylers: [{ color: "#f4f6f8" }] },
  { featureType: "building", elementType: "geometry.stroke", stylers: [{ color: "#f4f6f8" }] },
  { elementType: "labels.text.fill", stylers: [{ saturation: -100 }, { lightness: -45 }] },
  { elementType: "labels.text.stroke", stylers: [{ saturation: -100 }, { lightness: 85 }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ saturation: -100 }, { lightness: -18 }] },
  { featureType: "poi", elementType: "labels.icon", stylers: [{ saturation: -100 }, { lightness: -5 }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#43525b" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#43525b" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ saturation: -100 }, { lightness: 2 }] },
  { featureType: "water", elementType: "geometry", stylers: [{ saturation: -100 }, { lightness: 18 }] },
];

function loadGoogleMaps(): Promise<GoogleMapsNamespace> {
  if (mapsScriptPromise) return mapsScriptPromise;

  mapsScriptPromise = new Promise((resolve, reject) => {
    const browserKey = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const trackingId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    const existingMaps = (window as GoogleWindow).google?.maps;

    if (existingMaps) {
      resolve(existingMaps);
      return;
    }

    if (!browserKey) {
      reject(new Error("Google Maps browser key is not configured."));
      return;
    }

    const callbackWindow = window as unknown as Record<string, () => void>;
    callbackWindow[callbackName] = () => {
      const maps = (window as GoogleWindow).google?.maps;
      delete callbackWindow[callbackName];
      if (maps) resolve(maps);
      else reject(new Error("Google Maps loaded without its map library."));
    };

    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: browserKey,
      loading: "async",
      callback: callbackName,
    });
    if (trackingId) params.set("channel", trackingId);
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      delete callbackWindow[callbackName];
      reject(new Error("Google Maps could not be loaded."));
    };
    document.head.appendChild(script);
  });

  return mapsScriptPromise;
}

export function GoogleMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !mapElement.current) return;

        const map = new maps.Map(mapElement.current, {
          center: mapCenter,
          zoom: 17,
          styles: grayscaleMapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        });
        const rootStyles = getComputedStyle(document.documentElement);
        const markerColor = rootStyles.getPropertyValue("--brand-slate").trim();
        const markerOutline = rootStyles.getPropertyValue("--background").trim();

        new maps.Marker({
          map,
          position: mapCenter,
          title: "Carraro Bernardi Arquitetos Associados — Rua Sete de Setembro, 153d",
          icon: {
            path: maps.SymbolPath.CIRCLE,
            scale: 11,
            fillColor: markerColor,
            fillOpacity: 1,
            strokeColor: markerOutline,
            strokeWeight: 3,
          },
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-[22rem] w-full overflow-hidden border border-border/70 bg-brand-mist/15 sm:h-[30rem]">
      <div ref={mapElement} className="h-full w-full" aria-label="Mapa da Rua Sete de Setembro, 153d, Chapecó" />
      
      {status !== "ready" && (
        <div className="absolute inset-0 grid place-items-center bg-background/80 text-center">
          <p className="px-6 text-[10px] uppercase tracking-[0.2em] text-brand-graphite">
            {status === "error" ? "Mapa indisponível no momento" : "Carregando localização"}
          </p>
        </div>
      )}
    </div>
  );
}
