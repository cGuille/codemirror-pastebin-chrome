#/usr/bin/env bash

MODES=lib/codemirror/modes/ALL.js
THEMES=lib/codemirror/themes/ALL.css

rm -f $MODES
rm -f $THEMES

for mode in lib/codemirror/modes/* ; do
    cat $mode >> $MODES
done

for theme in lib/codemirror/themes/* ; do
    cat $theme >> $THEMES
done
