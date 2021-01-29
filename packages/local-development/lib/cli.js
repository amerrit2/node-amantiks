"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("../package.json"));
const local_development_1 = require("./local_development");
commander_1.program.version(package_json_1.default.version);
commander_1.program.option('-c, --config <config>', 'Path to .links.json file', '.links.json');
commander_1.program.parse(process.argv);
local_development_1.run(commander_1.program.opts()).catch((e) => {
    console.error(e.message);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLG1FQUEwQztBQUMxQywyREFBMkQ7QUFFM0QsbUJBQU8sQ0FBQyxPQUFPLENBQUMsc0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVyQyxtQkFBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSwwQkFBMEIsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUVuRixtQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFNUIsdUJBQUcsQ0FBQyxtQkFBTyxDQUFDLElBQUksRUFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUMifQ==