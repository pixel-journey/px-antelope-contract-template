import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldHandleNotify } from "./notify.ts";

test("handles only when first receiver is the contract and from is not self", () => {
  assert.equal(shouldHandleNotify("mycontract", "mycontract", "alice"), true);
});

test("ignores when first receiver is another contract", () => {
  assert.equal(shouldHandleNotify("other", "mycontract", "alice"), false);
});

test("ignores outgoing transfer from self", () => {
  assert.equal(shouldHandleNotify("mycontract", "mycontract", "mycontract"), false);
});
