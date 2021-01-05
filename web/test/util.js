import test from "ava";
import { unzip } from "../src/lib/util.js";

test("unzip", t => {
	const xs = [
		[1, "a"],
		[2, "b"]
	];

	const ys = [];

	const [axs, bxs] = unzip(xs);
	t.deepEqual([1, 2], axs);
	t.deepEqual(["a", "b"], bxs);

	const [ays, bys] = unzip(ys);
	t.deepEqual([], ays);
	t.deepEqual([], bys);
});
