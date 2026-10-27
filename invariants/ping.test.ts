import assert from "node:assert/strict";
import test from "node:test";
import { PING_CAP, assertName, nextPings } from "./ping.ts";

test("a new row starts at 1", () => {
  assert.equal(nextPings(null), 1);
});

test("4 becomes 5", () => {
  assert.equal(nextPings(4), 5);
});

test("uint32 max is refused", () => {
  assert.throws(() => nextPings(PING_CAP), /ping cap/);
});

test("zero and fractions are refused", () => {
  assert.throws(() => nextPings(0), /bad count/);
  assert.throws(() => nextPings(1.5), /bad count/);
});

test("names are 1 to 12 antelope characters", () => {
  assert.equal(assertName("pxexample"), "pxexample");
  assert.equal(assertName("eosio.token"), "eosio.token");
  assert.throws(() => assertName(".eosio"), /bad name/);
  assert.throws(() => assertName("eosio."), /bad name/);
  assert.throws(() => assertName("UPPER"), /bad name/);
  assert.throws(() => assertName("toolongnamehere"), /bad name/);
});
