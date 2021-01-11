import test from "ava";
import {
	unzip,
	unzip3,
	pickClass
} from "../src/lib/util";

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

test("pickClass", t => {
	const k1 = {
		primary: true,
		danger: false
	};

	t.deepEqual("primary", pickClass("", k1))
	t.deepEqual("button primary", pickClass("button", k1));

	const k2 = {
		primary: false,
		danger: false,
		label: false
	};

	t.deepEqual("button", pickClass("button", k2));
	t.deepEqual("", pickClass("", k2));
});
