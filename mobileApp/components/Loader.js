import { StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loader}>
        <View style={styles.loaderInner} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 80,
    height: 80,
    padding: 0,
  },
  loaderInner: {
    width: 64,
    height: 64,
    margin: 8,
    borderRadius: 32,
    borderWidth: 5,
    borderColor: "#053B50",
    borderTopColor: "transparent",
    borderBottomColor: "transparent", // Add this line to create space between the arcs
    animationName: "lds-dual-ring",
    animationDuration: "1.2s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});

export default Loader;
