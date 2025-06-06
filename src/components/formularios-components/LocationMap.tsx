import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface LocationMapProps {
  coordinates: { latitude: number; longitude: number } | null;
}

export const LocationMap: React.FC<LocationMapProps> = ({ coordinates }) => {
  if (!coordinates) return null;

  return (
    <MapView
      style={styles.map}
      initialRegion={{ ...coordinates, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
    >
      <Marker coordinate={coordinates} title="Local da Evidência" />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { width: '100%', height: 200, marginTop: 10, borderRadius: 5 },
});
