"use client"

import { useState } from "react";
import { anilistUser } from "../../../util/anilistFilter";

export default function Profile({ username, setUsername }: { username: string, setUsername: (value: string) => void }) {
    const [validLink, setValidLink] = useState("Nothing has been detected yet!");
    
    async function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        const value = event.target.value;

        if(value === "") {
            setValidLink("Nothing has been detected yet!")
        } else if(value.includes("anilist.co/user/")) {
            const username = value.split("anilist.co/user/")[1].split("/")[0]
            const userExists = await anilistUser(username);
            
            if(userExists) {
                setUsername(username);
                setValidLink("Valid anilist user profile!");
            } else {
                setValidLink("User not found, typo?");
            }
        } else {
            setValidLink("Not a valid anilist URL.")
        }
            
    }

    return (
        <div>
            <input 
            type="text" 
            placeholder="Enter your Anilist profile link here." 
            className="border-2 border-b-gray-200 rounded-md " 
            value={username}
            onBlur={handleBlur}
            onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-1xl text-amber-50">{validLink}</p>
        </div>
    );
}