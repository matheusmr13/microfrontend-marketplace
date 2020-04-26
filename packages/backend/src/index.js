"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = __importDefault(require("./task"));
var express = require("express");
var Datastore = require("@google-cloud/datastore").Datastore;
var app = express();
var spawn = require("child_process").spawn;
var exec = function (command, _a) {
  var _b = _a === void 0 ? {} : _a,
    cwd = _b.cwd,
    onStdout = _b.onStdout,
    onStderr = _b.onStderr,
    _c = _b.debug,
    debug = _c === void 0 ? true : _c;
  return new Promise(function (resolve, reject) {
    var spawnProcess = spawn(command, [], { shell: true, cwd: cwd });
    if (onStdout || debug)
      spawnProcess.stdout.on(
        "data",
        onStdout ||
          function (data) {
            return process.stdout.write(data);
          }
      );
    if (onStderr || debug)
      spawnProcess.stderr.on(
        "data",
        onStderr ||
          function (data) {
            return process.stderr.write(data);
          }
      );
    spawnProcess.on("exit", function (code) {
      if (code > 0) {
        reject(code);
        return;
      }
      resolve();
    });
  });
};
app.get("/", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      task_1.default();
      res.send("Hello World!");
      return [2 /*return*/];
    });
  });
});
app.post("/task_test", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.info("task_test");
          return [4 /*yield*/, exec("mkdir testing", { cwd: "/tmp" })];
        case 1:
          _a.sent();
          console.info("task_test2");
          return [4 /*yield*/, exec("npm init --yes", { cwd: "/tmp/testing" })];
        case 2:
          _a.sent();
          console.info("task_test3");
          return [
            4 /*yield*/,
            exec("npm i npm-publish-build-test", { cwd: "/tmp/testing" }),
          ];
        case 3:
          _a.sent();
          console.info("task_test4");
          return [4 /*yield*/, exec("npx tree-cli -l 2 --base /tmp/testing")];
        case 4:
          _a.sent();
          res.send("task response");
          return [2 /*return*/];
      }
    });
  });
});
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://" + host + ":" + port);
});
