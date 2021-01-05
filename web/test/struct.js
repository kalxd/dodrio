import test from "ava";
import struct from "../src/lib/struct";

test("struct creating", t => {
	const MyType = struct("id", ["name", "other"]);
	const myself = MyType.create(1, "the name");
	t.deepEqual(1, myself.id);
	t.deepEqual("the name", myself.name);
});

test("struct with JSON", t => {
	const MyType = struct("id", ["name", "account"]);
	const json = {
		id: 1,
		account: "the account"
	};

	const myself = MyType.fromJSON(json);
	t.deepEqual(json.id, myself.id);
	t.deepEqual(json.account, myself.name);
	t.deepEqual(json, MyType.toJSON(myself));
});
