#!/usr/bin/env node

const { hello } = require("../src/index");

const name = process.argv[2] || "AIOSS";
console.log(hello(name));