"use client"

import { useState, useEffect } from "react"
import { fetchAnimeDetails } from "../../../util/animedetails"

export default function animeCards({ title }: { title: string }) {
    const [animeData, setAnimeData] = useState<any>(null);
    
    useEffect(() => {
        const getDetails = async () => {
            const data = await fetchAnimeDetails(title);
            setAnimeData(data);
        };
        
        getDetails();
    }, [title]);
    
    if (!animeData) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="w-48 h-72 flex flex-col">
            <img src={animeData.coverImage.large} alt={animeData.title.english} />
            <h3>{animeData.title.english || animeData.title.romaji}</h3>
        </div>
    );
    
}