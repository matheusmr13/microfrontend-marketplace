import path from "path";
import fs from "fs";

const appDirectory = fs.realpathSync(process.cwd());
export const resolve = (paths: any) =>
  path.resolve(...[appDirectory].concat(paths));
export const resolveApp = (relativePath: any) => resolve([relativePath]);
export const resolvePackageSrc = (
  relativePath: any,
  packageName: any,
  file: any
) => resolve([relativePath, "packages", packageName, "src", file]);
export const appPackageJson = resolveApp("package.json");
