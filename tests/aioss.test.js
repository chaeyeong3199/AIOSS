const test = require("node:test");
const assert = require("node:assert");
const { hello } = require("../src/index");

test("hello returns greeting message", () => {
  assert.strictEqual(hello("Week9"), "Hello, Week9!");
});