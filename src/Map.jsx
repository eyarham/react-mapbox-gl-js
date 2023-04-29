import React, { useEffect, useRef, useState } from 'react';

const Map = ({ children, containerStyle = { height: 250 }, className }) => {
  const [isReady, setIsReady] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('styledata', function () {
      setIsReady(true)
    });
  })
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: mapBoxAccessToken,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
    <div
      ref={mapContainer}
      className={className}
      style={{ ...containerStyle }} >
      {isReady && children}
    </div>
  )
}

export default Map