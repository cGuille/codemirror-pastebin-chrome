/**
 * CodeMirror for Pastebin (Chrome Extension version)
 * Written by Guillaume Charmetant (@cGuille) - cguille.dev@gmail.com
 * Based on the work of Maxime (@EpocDotFr)
 * See http://blog.epoc.fr/2013/09/01/codemirror-for-pastebin/ (fr)
 */

(function () {
    'use strict';
    
    // List of available languages associated by their pastebin IDs:
    var languages = {
        153 : 'clojure',
        84 : 'cobol',
        200 : 'coffeescript',
        16 : 'css',
        17 : 'd',
        19 : 'diff',
        57 : 'erlang',
        162 : 'go',
        59 : 'groovy',
        60 : 'haskell',
        221 : 'haxe',
        25 : 'htmlmixed',
        196 : 'htmlmixed',
        28 : 'javascript',
        30 : 'lua',
        110 : 'ocaml',
        36 : 'ocaml',
        39 : 'pascal',
        40 : 'perl',
        180 : 'perl',
        41 : 'php',
        113 : 'php',
        120 : 'properties',
        42 : 'python',
        188 : 'r',
        187 : 'rpm',
        45 : 'ruby',
        46 : 'scheme',
        69 : 'smalltalk',
        47 : 'smartymixed',
        48 : 'sql',
        70 : 'tcl',
        51: 'vb',
        132 : 'verilog',
        53 : 'xml',
        205 : 'yaml',
        72 : 'z80'
    },
    themes = window.THEMES.map(function (themeFilePath) {
        return themeFilePath.substring(
            themeFilePath.lastIndexOf('/') + 1,
            themeFilePath.lastIndexOf('.')
        );
    });

    var pasteFormatElt = document.getElementsByName('paste_format')[0],
        cm = CodeMirror.fromTextArea(
            document.getElementById('paste_code'),
            {
                lineNumbers: true,
                matchBrackets: true,
                styleActiveLine: true,
            }
        ),
        updateTheme = cm.setOption.bind(cm, 'theme');

    if (!pasteFormatElt) {
        return;
    }

    cm.setSize('100%');

    function inferMode() {
        var selectedId = pasteFormatElt.options[pasteFormatElt.selectedIndex].value,
            selectedLanguage = languages[selectedId];
        if (!selectedLanguage) {
            console.error('Unsupported language ID: ' + selectedId);
            cm.setOption('mode', '');
        } else {
            cm.setOption('mode', selectedLanguage);
        }
    }
    pasteFormatElt.addEventListener('change', inferMode, false);
    inferMode();

    var contentTitleElt = document.querySelector('div.content_title'),
        containerElt = document.createElement('div'),
        themeLblElt = document.createElement('label'),
        selectThemeElt = document.createElement('select'),
        indentStyleLblElt = document.createElement('label'),
        selectIndentStyleElt = document.createElement('select'),
        tabWidthLblElt = document.createElement('label'),
        selectTabWidthElt = document.createElement('select');

    containerElt.appendChild(document.createTextNode('Editor options: '))

    themeLblElt.appendChild(document.createTextNode('Theme: '));
    containerElt.appendChild(themeLblElt);
    themes.forEach(function (theme) {
        var optionElt = document.createElement('option');
        optionElt.setAttribute('value', theme);
        optionElt.textContent = theme;
        selectThemeElt.appendChild(optionElt);
    });
    containerElt.appendChild(selectThemeElt);
    selectThemeElt.addEventListener('change', function (event) {
        var selectedIndex = selectThemeElt.selectedIndex,
            selectedTheme = selectThemeElt.options[selectedIndex].value
        updateTheme(selectedTheme);
        localStorage.cmTheme = selectedTheme;
    }, false);
    if (!localStorage.cmTheme) {
        localStorage.cmTheme = '';
    }

    for (var i = 0; i < selectThemeElt.options.length; ++i) {
        var optionElt = selectThemeElt.options[i];
        if (localStorage.cmTheme === optionElt.value) {
            optionElt.setAttribute('selected');
            updateTheme(localStorage.cmTheme);
            break;
        }
    }

/*
    indentStyleLblElt.appendChild(document.createTextNode('Indentation: '));
    containerElt.appendChild(indentStyleLblElt);
    containerElt.appendChild(selectIndentStyleElt);

    tabWidthLblElt.appendChild(document.createTextNode('Tab width: '));
    containerElt.appendChild(tabWidthLblElt);
    containerElt.appendChild(selectTabWidthElt);
*/

    contentTitleElt.parentNode.insertBefore(containerElt, contentTitleElt.nextSibling);
}());
