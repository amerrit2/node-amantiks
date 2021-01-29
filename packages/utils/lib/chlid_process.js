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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = void 0;
const child_process_1 = require("child_process");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hsaWRfcHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNobGlkX3Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBRXJDLFNBQXNCLFdBQVcsQ0FBQyxHQUFXLEVBQUUsT0FBZTs7UUFDN0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDdEMsTUFBTSxLQUFLLEdBQUcsb0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDdEQsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzNCLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtvQkFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNkO3FCQUFNLElBQUksS0FBSyxFQUFFO29CQUNqQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMEJBQTBCLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckQ7Z0JBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBQSxLQUFLLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxNQUFBLEtBQUssQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUFBO0FBaEJELGtDQWdCQyJ9