#/usr/bin/env sh

MODES=lib/codemirror/modes.js
THEMES=lib/codemirror/themes.css
THEMES_LIST=lib/codemirror/themes-list.js

rm -f $MODES
rm -f $THEMES
rm -f $THEMES_LIST

for mode in modes/* ; do
    cat $mode >> $MODES
done


echo "window.THEMES = [" >> $THEMES_LIST
echo '    "",' >> $THEMES_LIST

for theme in themes/* ; do
    cat $theme >> $THEMES
    echo '    "'"$theme"'",' >> $THEMES_LIST
done

echo "];" >> $THEMES_LIST
