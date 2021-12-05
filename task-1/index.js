#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const getCurrentDate = function (options) {
  const date = new Date();
  switch (true) {
    case options.year:
      return date.toLocaleDateString("default", { year: "numeric" });
    case options.month:
      return date.toLocaleDateString("default", { month: "numeric" });
    case options.date:
      return date.toLocaleDateString("default", { day: "numeric" });
    default:
      return date.toISOString();
  }
};

const getModifiedDate = function (options, direction) {
  const date = new Date();
  if (options.year) {
    date.setFullYear(date.getFullYear() + options.year * direction);
  }
  if (options.month) {
    date.setMonth(date.getMonth() + options.month * direction);
  }
  if (options.date) {
    date.setDate(date.getDate() + options.date * direction);
  }
  return date.toISOString();
};

const cmd = yargs(hideBin(process.argv))
  .usage(
    "$0 current [-y|--year] boolean [-m|--month] boolean [-d|--date] boolean"
  )
  .usage("$0 add [-y|--year] number [-m|--month] number [-d|--date] number")
  .usage("$0 sub [-y|--year] number [-m|--month] number [-d|--date] number")
  .command(
    "current",
    "print current date",
    {
      year: {
        alias: "y",
      },
      month: {
        alias: "m",
      },
      date: {
        alias: "d",
      },
    },
    function (argv) {
      console.log(getCurrentDate(argv));
    }
  )
  .command(
    "add",
    "print future date by adding to the current",
    {
      year: {
        alias: "y",
        type: "number",
      },
      month: {
        alias: "m",
        type: "number",
      },
      date: {
        alias: "d",
        type: "number",
      },
    },
    function (argv) {
      console.log(getModifiedDate(argv, 1));
    }
  )
  .command(
    "sub",
    "print past date by substruction from the current",
    {
      year: {
        alias: "y",
        type: "number",
      },
      month: {
        alias: "m",
        type: "number",
      },
      date: {
        alias: "d",
        type: "number",
      },
    },
    function (argv) {
      console.log(getModifiedDate(argv, -1));
    }
  )
  .parse();
