/**
 * Translate key bindings enclosed in <kbd> elements
 */
KeyBindingTranslator = (function() {
  const publicScope = {};
  const Os = Object.freeze({ UNKNOWN: 0, WIN: 1, MAC: 2, LINUX: 3 });
  let detectedOs = Os.UNKNOWN;

  publicScope.translateAll = function(win) {
    detectedOs = detectOs(win.navigator);
    const elements = win.document.getElementsByTagName('kbd');
    for (let i = 0; i < elements.length; i++) {
      translateKeyBinding(detectedOs, elements[i]);
    }
  }

  function translateKeyBinding(detectedOs, element) {
    const defaultKeyBinding = element.innerHTML;
    const winKeyBinding = element.getAttribute('key-binding-win') || '';
    const macKeyBinding = translateMacOsKeyBinding(element.getAttribute('key-binding-mac') || '');
    const linuxKeyBinding = element.getAttribute('key-binding-linux') || '';
    switch (detectedOs) {
      case Os.WIN:
        element.innerHTML = winKeyBinding || defaultKeyBinding;
        break;
      case Os.MAC:
        element.innerHTML = macKeyBinding || translateMacOsKeyBinding(defaultKeyBinding);
        break;
      case Os.LINUX:
        element.innerHTML = linuxKeyBinding || defaultKeyBinding;
        break;
    }
    if (!element.getAttribute('title')) {
      element.setAttribute('title', keyBindingTooltip(winKeyBinding, macKeyBinding, linuxKeyBinding));
    }
  }

  function translateMacOsKeyBinding(keyBinding) {
    return keyBinding
        .replace(/ctrl\+/ig, '\u2303')
        .replace(/shift\+/ig, '\u21e7')
        .replace(/alt\+/ig, '\u2325')
        .replace(/cmd\+/ig, '\u2318');
  }

  function keyBindingTooltip(winKeyBinding, macKeyBinding, linuxKeyBinding) {
    const parts = [];
    if (winKeyBinding && detectedOs !== Os.WIN) {
      parts.push(`Windows: ${winKeyBinding}`);
    }
    if (macKeyBinding && detectedOs !== Os.MAC) {
      parts.push(`macOS: ${macKeyBinding}`);
    }
    if (linuxKeyBinding && detectedOs !== Os.LINUX) {
      parts.push(`Linux: ${linuxKeyBinding}`);
    }
    return parts.join(', ');
  }

  function detectOs(nav) {
    const userAgent = nav.userAgent;
    if (userAgent.indexOf('Win') !== -1) {
      return Os.WIN;
    }
    if (userAgent.indexOf('Mac') !== -1) {
      return Os.MAC;
    }
    if (userAgent.indexOf('X11') !== -1 || userAgent.indexOf('Linux') !== -1) {
      return Os.LINUX;
    }
    return Os.UNKNOWN;
  }

  return publicScope;
})();
