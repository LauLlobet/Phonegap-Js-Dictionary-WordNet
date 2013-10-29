


cat $2 | sed "s:\':\'\':g;s/als:lemma/lemma/g" |sed-4.2 -r "s:([^\t-]+)-(.)\t(lemma)\t+(.+):insert into lang_off_lemmas(lang,oid,pos,lemma) values\('$1',\1,'\2','\4'\);:;tx;d;:x"
