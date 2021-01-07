import test from "ava";
import { unzip, unzip3 } from "../src/lib/util";

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

test("unzip3", t => {
	const xs = [
		[1, "a", 10],
		[2, "b", 20]
	];

	const [axs, bxs, cxs] = unzip3(xs);
	t.deepEqual([1, 2], axs);
	t.deepEqual(["a", "b"], bxs);
	t.deepEqual([10, 20], cxs);
});
