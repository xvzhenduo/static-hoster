import express from "express";
import { isDir } from "./utils.js";
import { join } from "path";
import { readdir } from "fs/promises";

const app = express();

app.use(express.static("pages"));

app.all("*", async (req, res, next) => {
	let reqUrl = decodeURI(req.url);
	try {
		await isDir(join("pages", reqUrl));
	} catch (e) {
		console.log(e);
		next();
		return;
	}
	var dir = await readdir(join("pages", reqUrl));
	var result = `
	<!DOCTYPE html>
	<html>
		<head>
    		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="viewport" content="width=device-width" initial-scale="1"/>
     		<title>Location: ${reqUrl}</title>
		</head>
		<body>
			<h4>Location: ${reqUrl}</h4><hr/>
			${reqUrl != "/" ? `<a href="../">../</a><br/>` : ""}
			${dir.length == 0 ? "<p>This dir is empty.</p>" : ""}
			${await (async () => {
				let list = "";
				for (var name of dir) {
					list += `<a href="./${name}" ${
						(await isDir(join("pages", reqUrl, name)))
							? ""
							: `target="_blank"`
					}>${name}</a><br/>`;
				}
				return list;
			})()}
		</body>
	</html>
	`;
	res.end(result);
});

app.listen(3000, () => {
	console.log("Server started successfully.");
});
