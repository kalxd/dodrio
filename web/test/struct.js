import test from "ava";
import * as R from "rambda";
import struct from "../src/lib/struct";

const T = struct(
	"id",
	["name", "username"]
);

const K = struct(
	"key"
);

const P = struct(
	["id", "key"],
	["t", T],
	["key", "k", K]
);

test("struct creating", t => {
	const x = T.gen(1, "the name");
	t.deepEqual(1, x.id);
	t.deepEqual("the name", x.name);

	t.deepEqual(
		{ id: 1, name: "THE NAME" },
		R.over(T.nameLens, R.toUpper, x)
	);
});

test("struct -> JSON", t => {
	const tt = T.gen(1, "the name");
	const k = K.gen(2);
	const p = P.gen(3, tt, k);

	const json = {
		key: 3,
		t: {
			id: 1,
			username: "the name"
		},
		k
	};

	t.deepEqual(json, P.toJSON(p));
});

test("json -> struct", t => {
	const json = {
		key: 20,
		id: 3,
		k: {
			key: 1,
			id: 2
		},
		username: "the name",
		t: {
			id: 5,
			username: "my name"
		},
		unkown: "key"
	};

	const output = {
		id: 20,
		t: {
			id: 5,
			name: "my name"
		},
		key: {
			key: 1
		}
	};

	t.deepEqual(output, P.fromJSON(json));
});
