import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Predictor() {
  const [next, setNext] = useState("...");

  // এখানে তোমার সার্ভারের পাবলিক URL/NGROK URL ব্যবহার করবে
  const serverURL = "https://abcd1234.ngrok-free.app/next";

  const fetchNext = async () => {
    try {
      const res = await fetch(serverURL);
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