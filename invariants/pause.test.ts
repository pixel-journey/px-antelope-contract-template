import { test } from "node:test";
import assert from "node:assert/strict";
import { canUnpause, applyPause } from "./pause.ts";

const state = { paused: false, admin: "guardian", msig: "eosio.msig" };

test("admin may pause", () => {
  const next = applyPause(state, "guardian");
  assert.equal(next.paused, true);
});

test("non-admin cannot pause", () => {
  assert.throws(() => applyPause(state, "alice"), /admin/);
});

test("admin or msig may unpause when paused", () => {
  const paused = { ...state, paused: true };
  assert.equal(canUnpause(paused, "guardian"), true);
  assert.equal(canUnpause(paused, "eosio.msig"), true);
  assert.equal(canUnpause(paused, "alice"), false);
});

test("cannot unpause when already unpaused", () => {
  assert.equal(canUnpause(state, "guardian"), false);
});

test("second pause by admin still leaves paused true", () => {
  const once = applyPause(state, "guardian");
  const twice = applyPause(once, "guardian");
  assert.equal(twice.paused, true);
});
