import test from "ava";
import * as R from "rambda";
import * as Page from "../src/lib/page";

test("page map", t => {
	const page1 = Page.pure(1);
	const page2 = Page.map(R.inc, page1);

	t.deepEqual(2, page2.context);
	t.is(Page.empty, Page.map(R.inc, Page.empty));
});

test("page bind", t => {
	const f = R.compose(
		Page.pure,
		R.inc
	);

	const page1 = Page.pure(1);
	const page2 = Page.bind(f, page1);

	t.deepEqual(2, page2.context);
	t.is(Page.empty, Page.bind(f, Page.empty));
});
