#!/usr/bin/env node

import program from "commander";
import publish from "./publish-github";
import * as packageJson from "../package.json";

program.name(Object.keys(packageJson.bin)[0]).version(packageJson.version);

program
  .command("publish")
  .description("Publaish")
  .action((options) => {
    publish(options);
  });

program.parse(process.argv);
