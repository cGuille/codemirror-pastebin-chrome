#/usr/bin/env sh

MODES=lib/codemirror/modes.js
THEMES=lib/codemirror/themes.css

rm -f $MODES
rm -f $THEMES

for mode in modes/* ; do
    cat $mode >> $MODES
done

for theme in themes/* ; do
    cat $theme >> $THEMES
done
