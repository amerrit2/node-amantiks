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
exports.run = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("@amantiks/utils");
function run(options, tsArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const tsConfig = yield utils_1.readJson(options.project);
        console.log('Watching files: ', tsConfig.include);
        const watcher = chokidar_1.default.watch(tsConfig.include);
        watcher.on('unlink', (filePath) => __awaiter(this, void 0, void 0, function* () {
            if (filePath.endsWith('.d.ts') || filePath.endsWith('.js'))
                return;
            console.log(`Watcher: unlinked ${filePath}`);
            const parsedPath = path_1.default.parse(filePath);
            ['d.ts', 'js', 'd.ts.map', 'js.map'].forEach((ext) => __awaiter(this, void 0, void 0, function* () {
                const buildFile = path_1.default.join(parsedPath.dir, `${parsedPath.name}.${ext}`);
                if (yield utils_1.pathExists(buildFile)) {
                    try {
                        console.log(`Unlinking: ${buildFile}`);
                        yield fs_1.default.promises.unlink(buildFile);
                    }
                    catch (e) {
                        console.log(`Failed: ${e.message}`);
                    }
                }
            }));
        }));
        yield utils_1.execCommand(process.cwd(), `npx tsc -w -p ${options.project} ${tsArgs.join(' ')}`);
    });
}
exports.run = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNfd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRzX3dhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQWdDO0FBQ2hDLDRDQUFvQjtBQUNwQixnREFBd0I7QUFDeEIsMkNBQW9FO0FBV3BFLFNBQXNCLEdBQUcsQ0FBQyxPQUF1QixFQUFFLE1BQWdCOztRQUNsRSxNQUFNLFFBQVEsR0FBYSxNQUFNLGdCQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxELE1BQU0sT0FBTyxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFPLFFBQVEsRUFBRSxFQUFFO1lBQ3ZDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFBRSxPQUFPO1lBRW5FLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDN0MsTUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4QyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFPLEdBQUcsRUFBRSxFQUFFO2dCQUMxRCxNQUFNLFNBQVMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3pFLElBQUksTUFBTSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNoQyxJQUFJO3dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxTQUFTLEVBQUUsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLFlBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUNwQztvQkFBQyxPQUFPLENBQUMsRUFBRTt3QkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7cUJBQ3BDO2lCQUNEO1lBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxNQUFNLG1CQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGlCQUFpQixPQUFPLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Q0FBQTtBQTFCRCxrQkEwQkMifQ==