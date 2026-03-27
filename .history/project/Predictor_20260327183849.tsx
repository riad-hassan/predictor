import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Predictor(){
  const [next,setNext] = useState("...");

  const fetchNext = async () => {
    const res = await fetch("http://YOUR_IP:3000/next");
    const data = await res.json();
    setNext(data.crashPoint);
  };

  useEffect(()=>{
    fetchNext();
    const interval = setInterval(fetchNext, 2000);
    return ()=>clearInterval(interval);
  },[]);

  return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:30,fontWeight:"bold"}}>
        Next: {next}x
      </Text>
    </View>
  );
}