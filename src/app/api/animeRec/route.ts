import { userList } from "../../../../util/anilistFilter";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
    const body = await request.json()
    const username = body.username
    
    const userAnimeList = await userList(username);
    
    const client = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an anime recommendation expert. Here is the user's complete anime list with ratings: ${JSON.stringify(userAnimeList)}. 
Recommend 5 anime they HAVEN'T watched yet, based on the patterns in shows they rated 7 or higher. Do not recommend any anime already in their list. Return only the anime titles as a JSON array with no markdown formatting.`
    });
    console.log(response.text);

    let text = response.text || "[]";
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const recommendations = JSON.parse(text);

    return Response.json({ recommendations });
}