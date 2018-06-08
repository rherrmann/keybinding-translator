var expect = require("chai").expect;
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
require("../src/kbd.js");

describe("Key Binding Translator Tests", function () {

  it("Mac: Replaces modifier keys", function () {
    var dom = new JSDOM("<kbd>Shift+Ctrl+Alt+Cmd+P</kbd>", { "userAgent": "Mac" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").textContent).to.be.equal("⇧⌃⌥⌘P");
  });

  it("Mac: Replaces default key binding with specific", function () {
    var dom = new JSDOM("<kbd key-binding-mac='specific'>default</kbd>", { "userAgent": "Mac" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").textContent).to.be.equal("specific");
  });

  it("Mac: Replaces modifiers of specific key binding", function () {
    var dom = new JSDOM("<kbd key-binding-mac='Shift+Ctrl+Alt+Cmd+P'>default</kbd>", { "userAgent": "Mac" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").textContent).to.be.equal("⇧⌃⌥⌘P");
  });

  it("Win: Replaces default key binding with specific", function () {
    var dom = new JSDOM("<kbd key-binding-win='specific'>default</kbd>", { "userAgent": "Win" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").textContent).to.be.equal("specific");
  });

  it("Linux: Replaces default key binding with specific", function () {
    var dom = new JSDOM("<kbd key-binding-linux='specific'>default</kbd>", { "userAgent": "Linux" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").textContent).to.be.equal("specific");
  });

  it("Unknown: Leaves default key binding unchanged", function () {
    var dom = new JSDOM("<kbd key-binding-win='specific'>default</kbd>", { "userAgent": "Unknown" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").textContent).to.be.equal("default");
  });

  it("Replaces nested kbd element", function () {
    var dom = new JSDOM("<kbd key-binding-mac='specific'>outer<kbd>nested</kbd></kbd>", { "userAgent": "Mac" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").textContent).to.be.equal("specific");
  });

  it("Replaces title if not present", function () {
    var dom = new JSDOM("<kbd key-binding-mac='Cmd+P'>Ctrl+P</kbd>", { "userAgent": "Win" });

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").getAttribute("title")).is.not.empty;
  });

  it("Does not replace existing title", function () {
    var dom = new JSDOM("<kbd key-binding-mac='Cmd+P' title='existing-title'>Ctrl+P</kbd>", { "userAgent": "Win" } );

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector("kbd").getAttribute("title")).to.be.equal("existing-title");
  });

});