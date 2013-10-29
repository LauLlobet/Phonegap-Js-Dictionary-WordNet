#!/bin/bash
cd all_lang_tab/
export PATH=/usr/sed-4.2/bin:$PATH
FILES=*
for f in $FILES
do
  echo "Processing $f file..."
  lang=$(echo "$f" | sed-4.2 -r "s:wn-data-(...).*:\1:")
  echo "lang: $lang"
  out="$f.sql"
  ../convert.lang_tab.sh $lang $f > ../all_lang_tab.sql/$out
  sqlite3 ../new_indexed_lexitree.db < ../all_lang_tab.sql/$out
done
cd ..