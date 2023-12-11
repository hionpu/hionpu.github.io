/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CharacterInsertionPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/worker.ts
function switchChar(astring, characterList) {
  let ret = astring;
  if (characterList.length > 0) {
    const index = characterList.findIndex((c) => astring.startsWith(c));
    if (index == -1) {
      ret = `${characterList[0]}${astring}`;
    } else if (index < characterList.length - 1) {
      const next = characterList[index + 1];
      ret = `${next}${astring.slice(characterList[index].length)}`;
    } else {
      ret = astring.slice(characterList[index].length);
    }
  }
  return ret;
}

// src/main.ts
var DEFAULT_SETTINGS = {
  charactors: [..."\u2B50\u{1F536}\u{1F537}\u{1F7E2}\u{1F44D}"].join("\n")
};
var CharacterInsertionPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    const ribbonIconEl = this.addRibbonIcon("edit", "Insert / switch characters", (evt) => {
      const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      if (view) {
        this.switchCharactor(view.editor);
      }
    });
    ribbonIconEl.addClass("character-insertion-insert-class");
    this.addCommand({
      id: "character-insertion-insert",
      name: "Insert / switch characters",
      editorCallback: (editor, view) => {
        this.switchCharactor(editor);
      }
    });
    this.addSettingTab(new SettingTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  /**
   * エディタオブジェクトから文字列を取得し、文字のスイッチを行う
   * @param editor エディタオブジェクト
   */
  switchCharactor(editor) {
    const cursor = editor.getCursor("from");
    const text = editor.getLine(cursor.line);
    const check = text.slice(cursor.ch);
    editor.setLine(cursor.line, `${text.substring(0, cursor.ch)}${switchChar(check, this.settings.charactors.split("\n"))}`);
    editor.setCursor(cursor);
  }
};
var SettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Setting of input" });
    new import_obsidian.Setting(containerEl).setName("Input character").setDesc("Specify the character to be input (one per line)").addTextArea((text) => text.setValue(this.plugin.settings.charactors).onChange(async (value) => {
      this.plugin.settings.charactors = value;
      await this.plugin.saveSettings();
    }).inputEl.style.height = "6em");
  }
};