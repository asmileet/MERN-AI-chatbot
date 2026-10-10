import Thread from "../models/thread.js"; // Capital T

import express from "express";
import getOpenAPTResponse from "../utils/openai.js";

const router = express.Router();
router.post("/test", async (req, res) => {

  try{ const Thread =   new Thread({
    
     
       threadID:"xyzrff",
    title : "TESTING",

   });
      const ress = await Thread.save();
     res.send(ress);
  }catch(err) {
      console.log(err);
        res.status(500).json({error: "Failed to save in DB"});
  }


} );

// GET all threads
router.get("/allthread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.send(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// GET specific thread messages
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// DELETE a thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOneAndDelete({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete the thread" });
  }
});


router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  console.log("🔥 Incoming request:", { threadId, message });

  if (!threadId || typeof threadId !== "string" || threadId.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing threadId" });
  }

  try {
    let thread1 = await Thread.findOne({ threadId });
    console.log("🔍 Found thread?", !!thread1);

    if (!thread1) {
      console.log("🆕 Creating new thread...");
      thread1 = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread1.messages.push({ role: "user", content: message });
    }

    // Get AI reply
    let assistantReply;
    try {
      assistantReply = await getOpenAPTResponse(message);
      console.log("✅ Assistant reply:", assistantReply);
    } catch (apiError) {
      console.error("❌ OpenAI error:", apiError);
      return res.status(500).json({ error: "OpenAI API failed" });
    }

    // Add assistant reply to thread
    thread1.messages.push({ role: "assistant", content: assistantReply });
    thread1.updatedAt = new Date();

    await thread1.save();
    console.log("💾 Thread saved successfully");

    res.json({ reply: assistantReply });
  } catch (err) {
    console.error("🔥 Final error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});







export default router;