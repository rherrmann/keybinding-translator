# Key Binding Translator

Show key bindings according to the platform that currently displays the HTML page.

On macOS, modifier keys are replaced by the commonly used symbols (e.g. &#x21e7; for Shift and &#x2318; for Command).

If different key bindings are used on different platforms, those can be specified with data attributes which replace the default key binding when shown on a matching platform.

## Example
```html
<kbd data-mac="Cmd+K V">
  Ctrl+K V
</kbd>
```

data-win
data-linux
data-mac