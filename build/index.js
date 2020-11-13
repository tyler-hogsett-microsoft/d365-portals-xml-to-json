'use strict';

var commander = require('commander');
var xml2json = require('xml2json');
var fs = require('fs');
var jsonata = require('jsonata');
var YAML = require('yamljs');
var path = require('path');
var xmlEscape = require('xml-escape');
var formatXml = require('xml-formatter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var jsonata__default = /*#__PURE__*/_interopDefaultLegacy(jsonata);
var YAML__default = /*#__PURE__*/_interopDefaultLegacy(YAML);
var xmlEscape__default = /*#__PURE__*/_interopDefaultLegacy(xmlEscape);
var formatXml__default = /*#__PURE__*/_interopDefaultLegacy(formatXml);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var readFile = fs.promises.readFile;
function convertSchemaXmlToYaml(schemaXml) {
    return __awaiter(this, void 0, void 0, function () {
        var rawJson, formattedJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rawJson = getRawJson(schemaXml);
                    return [4 /*yield*/, getFormattedJson(rawJson)];
                case 1:
                    formattedJson = _a.sent();
                    return [2 /*return*/, YAML__default['default'].stringify(formattedJson, 100, 2)];
            }
        });
    });
}
function getRawJson(schemaXml) {
    var rawJson = xml2json.toJson(schemaXml, {
        arrayNotation: true,
        coerce: true,
        object: true,
        reversible: true
    });
    rawJson.entities[0].entity.forEach(function (entity) {
        if (!!entity.filter) {
            entity.filter = xml2json.toJson(entity.filter[0]["$t"], {
                arrayNotation: true,
                coerce: true,
                object: true,
                reversible: true
            });
        }
    });
    return rawJson;
}
function getFormattedJson(rawJson) {
    return __awaiter(this, void 0, void 0, function () {
        var query, expression, formattedJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile("./src/jsonata/schema.jsonata", "utf-8")];
                case 1:
                    query = _a.sent();
                    expression = jsonata__default['default'](query);
                    formattedJson = expression.evaluate(rawJson);
                    return [2 /*return*/, formattedJson];
            }
        });
    });
}

var mkdir = fs.promises.mkdir, writeFile = fs.promises.writeFile;
function createOutputFile(path$1, contents) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mkdir(path.dirname(path$1), { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, writeFile(path$1, contents, "utf-8")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}

var readFile$1 = fs.promises.readFile;
function getSchemaXml(schemaPath) {
    return __awaiter(this, void 0, void 0, function () {
        var file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile$1(schemaPath)];
                case 1:
                    file = _a.sent();
                    return [2 /*return*/, file.toString()];
            }
        });
    });
}

function extractSchema(inputXmlPath, outputYmlPath) {
    if (outputYmlPath === void 0) { outputYmlPath = "./bin/schema.yml"; }
    return __awaiter(this, void 0, void 0, function () {
        var xml, yaml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSchemaXml(inputXmlPath)];
                case 1:
                    xml = _a.sent();
                    console.log("Schema XML Length: " + xml.length);
                    return [4 /*yield*/, convertSchemaXmlToYaml(xml)];
                case 2:
                    yaml = _a.sent();
                    return [4 /*yield*/, createOutputFile(outputYmlPath, yaml)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}

var readFile$2 = fs.promises.readFile;
function convertSchemaYamlToXml(yaml) {
    return __awaiter(this, void 0, void 0, function () {
        var formattedJson, rawJson, rawXml, formattedXml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formattedJson = YAML__default['default'].parse(yaml);
                    return [4 /*yield*/, getRawJson$1(formattedJson)];
                case 1:
                    rawJson = _a.sent();
                    collapseFetchQueries(rawJson);
                    rawXml = xml2json.toXml(rawJson);
                    formattedXml = formatXml__default['default'](rawXml, {
                        indentation: "  "
                    });
                    return [2 /*return*/, formattedXml];
            }
        });
    });
}
function getRawJson$1(formattedJson) {
    return __awaiter(this, void 0, void 0, function () {
        var query, expression, rawJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile$2("./src/jsonata/reverse-schema.jsonata", "utf-8")];
                case 1:
                    query = _a.sent();
                    expression = jsonata__default['default'](query);
                    rawJson = expression.evaluate(formattedJson);
                    return [2 /*return*/, rawJson];
            }
        });
    });
}
function collapseFetchQueries(rawJson) {
    rawJson.entities[0].entity.forEach(function (entity) {
        if (!!entity.filter) {
            entity.filter = [{ "$t": xmlEscape__default['default'](xml2json.toXml(entity.filter))
                }];
        }
    });
}

var readFile$3 = fs.promises.readFile;
function packSchema(inputYmlPath, outputXmlPath) {
    if (outputXmlPath === void 0) { outputXmlPath = "./bin/data_schema.xml"; }
    return __awaiter(this, void 0, void 0, function () {
        var yaml, xml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile$3(inputYmlPath, "utf-8")];
                case 1:
                    yaml = _a.sent();
                    console.log("Schema YAML Length: " + yaml.length);
                    return [4 /*yield*/, convertSchemaYamlToXml(yaml)];
                case 2:
                    xml = _a.sent();
                    return [4 /*yield*/, createOutputFile(outputXmlPath, xml)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}

commander.program
    .version("0.0.1")
    .command("extract <resourceType> <inputPath> [outputPath]")
    .action(extractResource);
commander.program
    .command("pack <inputYmlPath> [outputXmlPath]")
    .action(packSchema);
commander.program.parse(process.argv);
function extractResource(resourceType, inputPath, outputPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (resourceType === "schema") {
                extractSchema(inputPath, outputPath);
            }
            return [2 /*return*/];
        });
    });
}
