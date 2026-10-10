   
import "dotenv/config";

   const getOpenAPTResponse = async(message) => {

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",  // ✅ fixed model name
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", option);
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.err("Fetch error:", err);
        
    }

   }

export default getOpenAPTResponse;