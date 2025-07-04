// ClusterMarker.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ClusterMarker = ({ count }) => {
  if (typeof count !== "number" || isNaN(count)) {
    console.warn("Invalid ClusterMarker count:", count);
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  bubble: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#ffbbbb",
    padding: 4,
    borderRadius: 4,
    borderColor: "#ffbbbb",
    borderWidth: 1
  },
  count: {
    color: "#fff",
    fontSize: 13
  }
});

export default ClusterMarker;
