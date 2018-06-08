# Key Binding Translator

Show key bindings according to the platform that currently displays the HTML page.

On macOS, modifier keys are replaced by the commonly used symbols (e.g. &#x21e7; for Shift and &#x2318; for Command).

If different key bindings are used on different platforms, those can be specified with custom attributes that replace the default key binding when shown on a matching platform.

Note, that for showing macOS-specific modifier key symbols, a font that provides these glyphs need to be provided or present on the user's system.

## Example
```html
<kbd key-binding-mac="Cmd+K V" key-binding-win="Ctrl+K V" key-binding-linux="Alt+K V">
  Ctrl+K V
</kbd>
```
Will show as <kbd>⌘K V</kbd> on macOs, as <kbd>Ctrl+K V</kbd> on Windows and as <kbd>Alt+K V</kbd> on Linux.
The element remains unchanged if the platform cannot be determined.

In addition, the `title` attribute of the `kbd` element will show an enumeration of the key bindings for all three platforms. If the `title` attribtue is specified explicitly, it will remain unchanged.
