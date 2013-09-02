

// ------------------------------------------------------------------------- //
// Utilities

/**
 * Load a JavaScript or CSS file dynamically
 *
 * @param string type 'js' or 'css'
 * @param string url The files's URL
 * @param function callback
 * @return void
 */
function loadFile(type, url, callback) {
    var headElt = document.getElementsByTagName('head')[0],
        elt;

    switch (type) {
    case 'js':
        elt = document.createElement('script');
        elt.setAttribute('type', 'text/javascript');
        elt.setAttribute('src', url);
        break;
    case 'css':
        elt = document.createElement('link');
        elt.setAttribute('type', 'text/css');
        elt.setAttribute('rel', 'stylesheet');
        elt.setAttribute('href', url);
        break;
    default:
        throw new Error('Unsupported type "' + type + '"');
        break;
    }

    elt.onreadystatechange = callback;
    elt.onload = callback;

    headElt.appendChild(elt);
}

/**
 * Load a CodeMirror mode or theme
 *
 * @param string modeOrTheme 'mode' or 'theme'
 * @param string name The name of the mode/theme
 * @param function callback
 * @return void
 */
function load(modeOrTheme, name, callback) {
    var codeMirrorPath = 'lib/codemirror/',
        path = codeMirrorPath + modeOrTheme + 's/',
        fileType = ({
            mode: 'js',
            theme: 'css'
        })[modeOrTheme],
        url = chrome.extension.getURL(path + name + '.' + fileType);

    tabs.executeScript(null, { file: path + name + '.' + fileType }, callback);
    // loadFile(fileType, url, callback);
}
