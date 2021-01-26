"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = exports.execCommand = exports.readJson = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const strip_json_comments_1 = __importDefault(require("strip-json-comments"));
const child_process_1 = require("child_process");
function readJson(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return JSON.parse(strip_json_comments_1.default(`${yield promises_1.readFile(path_1.resolve(process.cwd(), path))}`));
        }
        catch (e) {
            e.message = `Failed to read/parse JSON file '${path}'\n${e.message}`;
            throw e;
        }
    });
}
exports.readJson = readJson;
function execCommand(cwd, command) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var _a, _b;
            const child = child_process_1.exec(command, { cwd }, (error, stdout) => {
                child.removeAllListeners();
                if (error instanceof Error) {
                    reject(error);
                }
                else if (error) {
                    reject(new Error(`Command failed - error=${error}`));
                }
                resolve(stdout);
            });
            (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout);
            (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.pipe(process.stderr);
        });
    });
}
exports.execCommand = execCommand;
function fileExists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.access(path);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
exports.fileExists = fileExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLDBDQUErQztBQUMvQyw4RUFBd0M7QUFDeEMsaURBQXFDO0FBRXJDLFNBQXNCLFFBQVEsQ0FBQyxJQUFZOztRQUMxQyxJQUFJO1lBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLDZCQUFLLENBQUMsR0FBRyxNQUFNLG1CQUFRLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDWCxDQUFDLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxDQUFDO1NBQ1I7SUFDRixDQUFDO0NBQUE7QUFQRCw0QkFPQztBQUVELFNBQXNCLFdBQVcsQ0FBQyxHQUFXLEVBQUUsT0FBZTs7UUFDN0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDdEMsTUFBTSxLQUFLLEdBQUcsb0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDdEQsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzNCLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtvQkFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNkO3FCQUFNLElBQUksS0FBSyxFQUFFO29CQUNqQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMEJBQTBCLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckQ7Z0JBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBQSxLQUFLLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxNQUFBLEtBQUssQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUFBO0FBaEJELGtDQWdCQztBQUVELFNBQXNCLFVBQVUsQ0FBQyxJQUFZOztRQUM1QyxJQUFJO1lBQ0gsTUFBTSxpQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFBQyxXQUFNO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDYjtJQUNGLENBQUM7Q0FBQTtBQVBELGdDQU9DIn0=