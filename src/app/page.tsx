"use client";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";

export default function Home() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Gọi API khi component được render trên client
  //   const fetchData = async () => {
  //     const response = await fetch("https://localhost:7071/api/login"); // URL API hoặc endpoint
  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []); // Gọi API một lần khi component mount

  return (
    <div>
      <h1>Data from API</h1>
      {process.env.NEXT_PUBLIC_URL_API ? (
        <pre>{process.env.NEXT_PUBLIC_URL_API}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
