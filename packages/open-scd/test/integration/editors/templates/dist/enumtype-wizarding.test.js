"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
var testing_1 = require("@open-wc/testing");
require("../../../mock-open-scd.js");
var Templates_js_1 = require("../../../../src/editors/Templates.js");
var foundation_js_1 = require("../../../../src/foundation.js");
describe('EnumType wizards', function () {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', Templates_js_1["default"]);
    var doc;
    var parent;
    var templates;
    var eNumTypeList;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd><templates-editor></templates-editor></mock-open-scd>"], ["<mock-open-scd><templates-editor></templates-editor></mock-open-scd>"]))))];
                case 1:
                    parent = _b.sent();
                    templates = parent.getActivePlugin();
                    return [4 /*yield*/, fetch('/test/testfiles/templates/datypes.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _b.sent();
                    templates.doc = doc;
                    return [4 /*yield*/, templates.updateComplete];
                case 3:
                    _b.sent();
                    eNumTypeList = ((_a = templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list[id="enumtypelist"]'));
                    return [2 /*return*/];
            }
        });
    }); });
    describe('defines a createEnumTypeWizard', function () {
        var selector;
        var idField;
        var primayAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var button;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        button = ((_a = templates === null || templates === void 0 ? void 0 : templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-icon-button[icon="playlist_add"]')[3]);
                        button.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _e.sent(); // await animation
                        selector = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-select[label="values"]'));
                        idField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="id"]'));
                        primayAction = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //work around, because the escapes get removed in snapshot
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pattern;
            return __generator(this, function (_a) {
                pattern = '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
                    '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
                    '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(2);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(pattern);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(foundation_js_1.patterns.normalizedString);
                return [2 /*return*/];
            });
        }); });
        it('allows to add empty EnumType to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.not
                            .exist;
                        idField.maybeValue = 'myGeneralEnumType';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('respects the sequence defined in the standard', function () { return __awaiter(void 0, void 0, void 0, function () {
            var element;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        idField.maybeValue = 'myGeneralEnumType';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _c.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _c.sent();
                        element = doc.querySelector('EnumType[id="myGeneralEnumType"]');
                        testing_1.expect((_a = element === null || element === void 0 ? void 0 : element.nextElementSibling) === null || _a === void 0 ? void 0 : _a.tagName).to.equal('EnumType');
                        testing_1.expect((_b = element === null || element === void 0 ? void 0 : element.previousElementSibling) === null || _b === void 0 ? void 0 : _b.tagName).to.equal('DAType');
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows to add a predefined EnumType', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.not
                            .exist;
                        selector.value = 'AdjustmentKind';
                        idField.maybeValue = 'myGeneralEnumType';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('EnumType[id="myGeneralEnumType"] > EnumVal')
                            .length).to.equal(4);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines an eNumTypeEditWizard', function () {
        var idField;
        var primayAction;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        (eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _d.sent(); // await animation
                        idField = ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="id"]'));
                        primayAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelectorAll('mwc-menu > mwc-list-item')[0]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //work around, because the escapes get removed in snapshot
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pattern;
            return __generator(this, function (_a) {
                pattern = '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
                    '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
                    '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(2);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(pattern);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(foundation_js_1.patterns.normalizedString);
                return [2 /*return*/];
            });
        }); });
        it('edits EnumType attributes id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.exist;
                        idField.value = 'changedEnumType';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('EnumType[id="changedEnumType"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the EnumVal element on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('EnumType').length).to.equal(4);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.not.exist;
                        testing_1.expect(doc.querySelectorAll('EnumType').length).to.equal(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not edit EnumType element without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originData = (doc.querySelector('EnumType[id="Dummy_ctlModel"]')).cloneNode(true);
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(originData.isEqualNode(doc.querySelector('EnumType[id="Dummy_ctlModel"]'))).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a eNumValWizard to edit an existing EnumVal', function () {
        var ordField;
        var valueField;
        var descField;
        var primayAction;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        (eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _h.sent(); // await animation
                        ((_b = (_a = parent.wizardUI) === null || _a === void 0 ? void 0 : _a.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-list-item[value="#Dummy_ctlModel>1"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _h.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _h.sent(); // await animation
                        ordField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="ord"]'));
                        valueField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="value"]'));
                        descField = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('wizard-textfield[label="desc"]'));
                        primayAction = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = ((_g = parent.wizardUI.dialog) === null || _g === void 0 ? void 0 : _g.querySelectorAll('mwc-menu > mwc-list-item')[0]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('edits EnumVal attributes ord', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).to.exist;
                        ordField.value = '10';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="10"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('edits EnumVal attributes value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('direct-with-normal-security');
                        valueField.value = 'direct-with-normal-security-test';
                        descField.nullable = false;
                        descField.maybeValue = 'myDesc';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _c.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _c.sent();
                        testing_1.expect((_b = doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"][desc="myDesc"]')) === null || _b === void 0 ? void 0 : _b.textContent).to.equal('direct-with-normal-security-test');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the EnumVal element on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('EnumType[id="Dummy_ctlModel"] > EnumVal').length).to.equal(5);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[name="1"]')).to.not.exist;
                        testing_1.expect(doc.querySelectorAll('EnumType[id="Dummy_ctlModel"] > EnumVal').length).to.equal(4);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not edit EnumVal element without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originData = (doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).cloneNode(true);
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(originData.isEqualNode(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]'))).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a eNumValWizard to create a new EnumVal element', function () {
        var ordField;
        var valueField;
        var descField;
        var primayAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        (eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _f.sent(); // await animation
                        ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-menu > mwc-list-item')[1]).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _f.sent(); // await animation
                        ordField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="ord"]'));
                        descField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="desc"]'));
                        valueField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="value"]'));
                        primayAction = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a new EnumVal element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]')).to.not.exist;
                        ordField.value = '9';
                        valueField.value = 'newValue';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _b.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]:not([desc])')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('newValue');
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates yet another new EnumVal element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]')).to.not.exist;
                        ordField.value = '9';
                        valueField.value = 'newValue';
                        descField.nullable = false;
                        descField.maybeValue = 'myDesc';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _b.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"][desc="myDesc"]')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('newValue');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
