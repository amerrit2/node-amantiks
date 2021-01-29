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
exports.pathExists = exports.readJson = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const strip_json_comments_1 = __importDefault(require("strip-json-comments"));
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
function pathExists(path) {
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
exports.pathExists = pathExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsMENBQStDO0FBQy9DLDhFQUF3QztBQUV4QyxTQUFzQixRQUFRLENBQUMsSUFBWTs7UUFDMUMsSUFBSTtZQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyw2QkFBSyxDQUFDLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1RTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1gsQ0FBQyxDQUFDLE9BQU8sR0FBRyxtQ0FBbUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyRSxNQUFNLENBQUMsQ0FBQztTQUNSO0lBQ0YsQ0FBQztDQUFBO0FBUEQsNEJBT0M7QUFFRCxTQUFzQixVQUFVLENBQUMsSUFBWTs7UUFDNUMsSUFBSTtZQUNILE1BQU0saUJBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixPQUFPLElBQUksQ0FBQztTQUNaO1FBQUMsV0FBTTtZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2I7SUFDRixDQUFDO0NBQUE7QUFQRCxnQ0FPQyJ9