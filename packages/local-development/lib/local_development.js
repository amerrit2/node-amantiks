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
const ajv_1 = __importDefault(require("ajv"));
const utils_1 = require("@amantiks/utils");
const path_1 = require("path");
const JsonSchema = (s) => s;
const ajv = new ajv_1.default({
    useDefaults: true,
});
const schema = JsonSchema({
    type: 'object',
    properties: {
        packageLinks: {
            type: 'object',
            patternProperties: {
                '.*': {
                    type: 'string',
                },
            },
        },
    },
    additionalProperties: false,
});
const validate = ajv.compile(schema);
function run(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield utils_1.readJson(path_1.resolve(process.cwd(), options.config));
        if (!validate(config)) {
            throw new Error(`Invalid config file ${options.config}\nErrors=\n${JSON.stringify(validate.errors, null, 2)}`);
        }
        for (const [name, path] of Object.entries(config.packageLinks)) {
            if (name.startsWith('@')) {
                const [scope, packageName] = name.split('/');
                if (!(yield utils_1.pathExists(path_1.resolve(process.cwd(), 'node_modules', scope)))) {
                }
            }
            let path;
            try {
                path = require.resolve(name);
            }
            catch (e) {
                e.message = `Failed to find require-path for `;
            }
        }
    });
}
exports.run = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxfZGV2ZWxvcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbF9kZXZlbG9wbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIsMkNBQXVEO0FBQ3ZELCtCQUErQjtBQUUvQixNQUFNLFVBQVUsR0FBRyxDQUF3QixDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUV0RCxNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQztJQUNuQixXQUFXLEVBQUUsSUFBSTtDQUNqQixDQUFDLENBQUM7QUFFSCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFDekIsSUFBSSxFQUFFLFFBQVE7SUFDZCxVQUFVLEVBQUU7UUFDWCxZQUFZLEVBQUU7WUFDYixJQUFJLEVBQUUsUUFBUTtZQUNkLGlCQUFpQixFQUFFO2dCQUNsQixJQUFJLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7aUJBQ2Q7YUFDRDtTQUNEO0tBQ0Q7SUFDRCxvQkFBb0IsRUFBRSxLQUFLO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFVckMsU0FBc0IsR0FBRyxDQUFDLE9BQXdCOztRQUNqRCxNQUFNLE1BQU0sR0FBYyxNQUFNLGdCQUFRLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLE9BQU8sQ0FBQyxNQUFNLGNBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDL0c7UUFFRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDL0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixNQUFNLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxDQUFBLE1BQU0sa0JBQVUsQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBLEVBQUM7aUJBRTNEO2FBQ1Y7WUFDRCxJQUFJLElBQVksQ0FBQztZQUNqQixJQUFJO2dCQUNILElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQyxDQUFDLE9BQU8sR0FBRyxrQ0FBa0MsQ0FBQzthQUMvQztTQUNEO0lBQ0YsQ0FBQztDQUFBO0FBckJELGtCQXFCQyJ9