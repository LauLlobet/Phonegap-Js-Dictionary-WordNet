


cat $2 | sed "s:\':\'\':g" |sed-4.2 -r "s:([^\t-]+)-(.)\t([^\t]+)\t+(.+):insert into lang_off_lemmas(lang,oid,pos,lemma) values\('$1',\1,'\2','\4'\);:"
