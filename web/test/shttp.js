import test from "ava";
import { seqInit, SetMethod, AddHeader } from "../src/lib/shttp";

test("shttp init", t => {
	const expire = {
		headers: {
			"Content-Type": "application/json",
			"Content-Length": "20"
		},
		method: "GET"
	};

	const output = seqInit(
		AddHeader("Content-Length", "20"),
		SetMethod("GET")
	);

	t.deepEqual(expire, output);
});
