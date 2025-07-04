import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import ClusterMarker from "@/components/ClusterMarker";
import { getCluster } from "@/utils/MapUtils";


export default function HomeScreen() {

  function renderMarker(marker, index) {
    const key = `${index}_${marker.geometry?.coordinates?.[0]}`;

    const lat = marker.geometry?.coordinates?.[1];
    const lon = marker.geometry?.coordinates?.[0];

    if (typeof lat !== 'number' || typeof lon !== 'number') {
      console.warn("Invalid coordinates", marker);
      return null;
    }

    const pointCount = marker?.properties?.point_count;

    const isCluster = typeof pointCount === 'number' && pointCount > 0;

    if (isCluster) {
      return (
        <Marker key={key} coordinate={{ latitude: lat, longitude: lon }}>
          <ClusterMarker count={pointCount} />
        </Marker>
      );
    }

    return (
      <Marker key={key} coordinate={{ latitude: lat, longitude: lon }}>
        <Image
          source={require('@/assets/images/bla.png')}
          style={{ width: 30, height: 30 }}
        />
      </Marker>
    );
  }



  const INITIAL_POSITION = {
    latitude: 41.924447,
    longitude: -87.687339,
    latitudeDelta: 1,
    longitudeDelta: 1
  }

  const COORDS = [
    { lat: 42, lon: -87 },
    { lat: 42.1, lon: -87.3 },
    { lat: 42.2, lon: -87.4 },
    { lat: 42.3, lon: -87.2 },
    { lat: 42.5, lon: -87.5 }
  ];

  const [reg, setReg] = useState(INITIAL_POSITION);

  const allCoords = COORDS.map(c => ({
    geometry: {
      coordinates: [c.lon, c.lat]
    }
  }));

  const cluster = getCluster(allCoords, reg);
  console.log("Cluster result:", cluster);


  return (
    <View style={styles.container}>
      <MapView
        provider={"google"}
        style={styles.map}
        loadingIndicatorColor={"#ffbbbb"}
        loadingBackgroundColor={"#ffbbbb"}
        initialRegion={reg}
        // onRegionChange={(r) => onRegionChangeComplete(r)}
        onRegionChangeComplete={(r) => setReg(r)}
      >
        {cluster.markers.map((marker, index) => renderMarker(marker, index))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});