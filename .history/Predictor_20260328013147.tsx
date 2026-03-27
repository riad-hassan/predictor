import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

export default function Predictor() {
  const [current, setCurrent] = useState("...");
  const [next, setNext] = useState("...");

  const SERVER = "https://darling-griffin-a5073d.netlify.app/.netlify/functions";

  // 🔥 Wave animation
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const waveMove = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  // ---------------- API CALLS ----------------
  const fetchCurrent = async () => {
    try {
      const res = await fetch(`${SERVER}/current`);
      const data = await res.json();
      setCurrent(data.crashPoint);
    } catch (e) {
      setCurrent("Error");
    }
  };

  const fetchNext = async () => {
    try {
      const res = await fetch(`${SERVER}/next`);
      const data = await res.json();
      setNext(data.crashPoint);
    } catch (e) {
      setNext("Error");
    }
  };

  const consume = async () => {
    try {
      const res = await fetch(`${SERVER}/consume`);
      const data = await res.json();
      setCurrent(data.current);
      setNext(data.next);
    } catch (e) {
      setCurrent("Error");
      setNext("Error");
    }
  };

  // ---------------- AUTO REFRESH ----------------
  useEffect(() => {
    fetchCurrent();
    fetchNext();

    const interval = setInterval(() => {
      fetchCurrent();
      fetchNext();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (

    <View> 
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>Game Monitor</Text>

        <Text style={styles.value}>
          Current: <Text style={styles.green}>{current}x</Text>
        </Text>

        <Text style={styles.value}>
          Next: <Text style={styles.red}>{next}x</Text>
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn} onPress={fetchCurrent}>
            <Text style={styles.btnText}>Current</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={fetchNext}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.consumeBtn]} onPress={consume}>
            <Text style={styles.btnText}>Consume</Text>
          </TouchableOpacity>
        </View>

        <Text style={{color:"#ffffffff", fontSize: 19, marginTop: 20, fontWeight: "900"}} > System Control </Text>

        <Text style={{color:"#fff"}} > If the game get's stuck click Refresh. </Text>

        <TouchableOpacity
  style={styles.refreshBtn}
  onPress={() => {
    fetchCurrent();
    fetchNext();
  }}
>
  <Text style={styles.refreshText}>🔄 Refresh</Text>
</TouchableOpacity>

      </View>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "127%",
    backgroundColor: "#0b1220",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:15,


  },

  refreshBtn: {
  marginTop: 15,
  backgroundColor: "#334155",
  paddingVertical: 12,
  width: "100%",
  borderRadius: 12,
  alignItems: "center",
},

refreshText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},

  wave: {
    position: "absolute",
    width: "200%",
    height: 300,
    backgroundColor: "#ff3b30",
    opacity: 0.15,
    borderRadius: 200,
    top: 150,
  },

  card: {
    width: "100%",
    backgroundColor: "#121a2b",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },

  value: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "600",
  },

  green: {
    color: "#22c55e",
    fontWeight: "bold",
  },

  red: {
    color: "#ff3b30",
    fontWeight: "bold",
  },

  btnRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  btn: {
    flex: 1,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  consumeBtn: {
    backgroundColor: "#ef4444",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});