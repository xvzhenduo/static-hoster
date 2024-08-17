import express from "express";
import { isDir } from "./utils.js";
import { join } from "path";
import { readdir } from "fs/promises";

const app = express();

app.use(express.static("pages"));

app.all("*", async (req, res, next) => {
	try {
		await isDir(join("pages", req.url));
	} catch (e) {
		next();
		return;
	}
	var dir = await readdir(join("pages", req.url));
	var result = "<!DOCTYPE html>";
	result += `<h4>Location: ${req.url}</h4><hr/>`;
	if (req.url != "/") {
		result += `<a href="../">../</a><br/>`;
	}
	if (dir.length == 0) {
		result += "<p>This dir is empty.</p>";
	}
	for (var name of dir) {
		result += `<a href="./${name}">${name}</a><br/>`;
	}
	res.end(result);
});

app.listen(3000, () => {
	console.log("Server started successfully.");
});
