import { OpenAI } from "openai";
import dotenv from "dotenv";
import express from "express";
const router = express.Router();
dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
	console.log(req.body);
	const messagesArray = req.body;
	messagesArray.unshift({
		role: "system",
		content: "Your task is to generate a software engineering project brief. The project should have 3 requirements that helps the user understand what to integrate in the project. Your response should be structured as a JSON object with keys: title, description, and requirements.",
	});
	console.log(messagesArray);

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: messagesArray,
		temperature: 0.8,
		max_tokens: 200,
		presence_penalty: 1.4,
		frequency_penalty: 1.8,
	});
	res.status(200).send(response.choices[0].message);
});

router.post("/custom", async (req, res) => {
	console.log("You've made it to openai/custom");
	const messagesArray = req.body;
	messagesArray.unshift({
		role: "system",
		content: "Your task is to generate a software engineering project brief for a developer of a beginner skill level. The project should have 3 requirements that helps the user understand what to integrate in the project. Your response should be structured as a JSON object with keys: title, description, and requirements.",
	});

	console.log("This is after unshift:", messagesArray);

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: messagesArray,
		temperature: 0.8,
		max_tokens: 256,
	});
	res.status(200).send(response.choices[0].message);
});

export default router;
