"use client"

import Profile from "./components/profile";
import Button from "./components/button";
import AnimeCard from "./components/animeCards";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async () => {
    console.log("Search button clicked!");
    console.log("Username:", username);
    const response = await fetch('/api/animeRec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username })
    });
    
    const data = await response.json();
    console.log("Recommendations:", recommendations);
    setRecommendations(data.recommendations);
  }

  console.log("Recommendations state:", recommendations);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-stone-200 text-4xl">
        anirecs.
      </h1>
      <Profile username={username} setUsername={setUsername} />
      <Button onClick={handleSearch}>Search</Button>
      <div className="flex flex-row gap-2 justify-center">
      {recommendations.map((anime) => (
      <AnimeCard key={anime} title={anime} />
      ))}
      </div>
    </div>
  );
}
