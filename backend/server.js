

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cors from "cors";
const port = 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

// app.post("/test", async (req, res) => {
//     const option = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",  // ✅ fixed model name
//             messages: [{
//                 role: "user",
//                 content: "hello"
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", option);
//         const data = await response.json();
//         console.log(data);
//         res.send(data);
//     } catch (err) {
//         console.log("Fetch error:", err);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// });

app.listen(port, () => {
    console.log(`Server is connected successfully on port ${port}`);
    connected();
});



   const connected = async () => {
    const uri = process.env.MONGO_URL;
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DATABASE CONNECTED");
    } catch (err) {
        console.error("Database connection failed:", err);
    }
};
//  const connected = async () => {
//     const uri = process.env.MONGO_URL;
    
//         await mongoose.connect(uri
// );
//         console.log("DATABASE CONNECTED");
    
    
// };
      
      
    





// async function main() {
//   const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   const response = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       { role: "user", content: "list five animals" }
//     ],
//   });

//   console.log(response.choices[0].message.content);
// }

// main().catch(console.error);


// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, 
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
  
//   input: 'what is mango',
// });

// console.log(response.output_text);
