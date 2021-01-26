"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("../package.json"));
const ts_watcher_1 = require("./ts_watcher");
commander_1.program.version(package_json_1.default.version);
commander_1.program.addHelpText('beforeAll', "Runs tsc --watch, and will delete corresponding build files for all *.ts files in the 'includes' array.  All arguments after '--' are passed to tsc");
commander_1.program.addHelpText('afterAll', 'Example: `ts-watcher -p tsconfig.debug.json -- --diagnostics some_file.ts`\nThis will execute: `tsc -p tsconfig.debug.json -w --diagnostics some_file.ts`');
commander_1.program.usage('ts-watcher [options] -- [options and arguments forwarded to tsc]');
commander_1.program.option('-p, --project [path]', 'Path to tsconfig', 'tsconfig.json');
commander_1.program.parse(process.argv);
ts_watcher_1.run(commander_1.program.opts(), commander_1.program.args).catch((e) => {
    console.error(e.message);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLG1FQUEwQztBQUMxQyw2Q0FBbUQ7QUFFbkQsbUJBQU8sQ0FBQyxPQUFPLENBQUMsc0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVyQyxtQkFBTyxDQUFDLFdBQVcsQ0FDbEIsV0FBVyxFQUNYLHFKQUFxSixDQUNySixDQUFDO0FBRUYsbUJBQU8sQ0FBQyxXQUFXLENBQ2xCLFVBQVUsRUFDViwySkFBMkosQ0FDM0osQ0FBQztBQUVGLG1CQUFPLENBQUMsS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7QUFFbEYsbUJBQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFNUUsbUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTVCLGdCQUFHLENBQUMsbUJBQU8sQ0FBQyxJQUFJLEVBQW9CLEVBQUUsbUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMvRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDIn0=