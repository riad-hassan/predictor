import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Predictor() {
  const [next, setNext] = useState("...");

  const SERVER = "https://joyful-moxie-439759.netlify.app/.netlify/functions";

  const fetchNext = async () => {
    try {
      const res = await fetch(`${SERVER}/next`);
      const data = await res.json();
      setNext(data.crashPoint);
    } catch (e) {
      setNext("Error");
    }
  };

  useEffect(() => {
    fetchNext();
    const interval = setInterval(fetchNext, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#000"}}>
      <Text style={{color:"#fff",fontSize:30,fontWeight:"bold"}}>
        Next: {next}x
      </Text>
    </View>
  );
}