import { lstat, readdir } from "fs/promises";

export async function isDir(path) {
	const stat = await lstat(path);
	return !stat.isFile();
}
