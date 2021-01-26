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
const util_1 = require("./util");
function run(options, tsArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const tsConfig = yield util_1.readJson(options.project);
        console.log('Watching files: ', tsConfig.include);
        const watcher = chokidar_1.default.watch(tsConfig.include);
        watcher.on('unlink', (filePath) => __awaiter(this, void 0, void 0, function* () {
            if (filePath.endsWith('.d.ts') || filePath.endsWith('.js'))
                return;
            console.log(`Watcher: unlinked ${filePath}`);
            const parsedPath = path_1.default.parse(filePath);
            ['d.ts', 'js', 'd.ts.map', 'js.map'].forEach((ext) => __awaiter(this, void 0, void 0, function* () {
                const buildFile = path_1.default.join(parsedPath.dir, `${parsedPath.name}.${ext}`);
                if (yield util_1.fileExists(buildFile)) {
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
        yield util_1.execCommand(process.cwd(), `npx tsc -w -p ${options.project} ${tsArgs.join(' ')}`);
    });
}
exports.run = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNfd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRzX3dhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQWdDO0FBQ2hDLDRDQUFvQjtBQUNwQixnREFBd0I7QUFDeEIsaUNBQTJEO0FBWTNELFNBQXNCLEdBQUcsQ0FBQyxPQUF1QixFQUFFLE1BQWdCOztRQUNsRSxNQUFNLFFBQVEsR0FBYSxNQUFNLGVBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsTUFBTSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpELE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQU8sUUFBUSxFQUFFLEVBQUU7WUFDdkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUFFLE9BQU87WUFFbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM3QyxNQUFNLFVBQVUsR0FBRyxjQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXhDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQU8sR0FBRyxFQUFFLEVBQUU7Z0JBQzFELE1BQU0sU0FBUyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDekUsSUFBSSxNQUFNLGlCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2hDLElBQUk7d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBQ3ZDLE1BQU0sWUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3BDO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0Q7WUFDRixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILE1BQU0sa0JBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsaUJBQWlCLE9BQU8sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUFBO0FBMUJELGtCQTBCQyJ9