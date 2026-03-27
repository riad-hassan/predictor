import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Predictor() {
  const [next, setNext] = useState("...");

  const fetchNext = async () => {
    try {
      const res = await fetch("http://192.168.0.15:3000/next"); // 🔥 তোমার কম্পিউটারের IP
      if (!res.ok) throw new Error("Server Error");
      const data = await res.json();
      setNext(data.crashPoint);
    } catch (err) {
      console.log("Fetch Error:", err);
      setNext("Error");
    }
  };

  useEffect(() => {
    fetchNext();
    const interval = setInterval(fetchNext, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        Next: {next}x
      </Text>
    </View>
  );
}