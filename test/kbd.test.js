const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
require('../src/kbd.js');

describe('Key Binding Translator Tests', function () {

  it('Mac: Replaces modifier keys', function () {
    const dom = new JSDOM('<kbd>Shift+Ctrl+Alt+Cmd+P</kbd>', resources('Mac'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').textContent).to.be.equal('⇧⌃⌥⌘P');
  });

  it('Mac: Replaces default key binding with specific', function () {
    const dom = new JSDOM('<kbd key-binding-mac="specific">default</kbd>', resources('Mac'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').textContent).to.be.equal('specific');
  });

  it('Mac: Replaces modifiers of specific key binding', function () {
    const dom = new JSDOM('<kbd key-binding-mac="Shift+Ctrl+Alt+Cmd+P">default</kbd>', resources('Mac'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').textContent).to.be.equal('⇧⌃⌥⌘P');
  });

  it('Win: Replaces default key binding with specific', function () {
    const dom = new JSDOM('<kbd key-binding-win="specific">default</kbd>', resources('Windows'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').textContent).to.be.equal('specific');
  });

  it('Linux: Replaces default key binding with specific', function () {
    const dom = new JSDOM('<kbd key-binding-linux="specific">default</kbd>', resources('Linux'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').textContent).to.be.equal('specific');
  });

  it('Unknown: Leaves default key binding unchanged', function () {
    const dom = new JSDOM('<kbd key-binding-win="specific">default</kbd>', resources('Unknown'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').textContent).to.be.equal('default');
  });

  it('Replaces nested kbd element', function () {
    const dom = new JSDOM('<kbd key-binding-mac="specific">outer<kbd>nested</kbd></kbd>', resources('Mac'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').textContent).to.be.equal('specific');
  });

  it('Replaces title if not present', function () {
    const dom = new JSDOM('<kbd key-binding-mac="Cmd+P">Ctrl+P</kbd>', resources('Windows'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').getAttribute('title')).is.not.empty;
  });

  it('Does not replace existing title', function () {
    const dom = new JSDOM('<kbd key-binding-mac="Cmd+P" title="existing-title">Ctrl+P</kbd>', resources('Windows'));

    KeyBindingTranslator.translateAll(dom.window);

    expect(dom.window.document.querySelector('kbd').getAttribute('title')).to.be.equal('existing-title');
  });

});

function resources(userAgent) {
  return {
    resources: new jsdom.ResourceLoader({ userAgent: userAgent })
  };
}
