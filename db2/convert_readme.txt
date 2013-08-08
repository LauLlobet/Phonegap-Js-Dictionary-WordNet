
./convert mysql-wn-schema.sql > schema.sql 
sqlite3 lexitree < schema.sql 

irregular primary keys a ma , (´) que falta a una taula 

./convert2.sh mysql-wn-data.sql > data2.sql 
./convert.sh data2.sql > data3.sql
sqlite3 lexitree < data3.sql 

./convert mysql-wn-constraints.sql > constraints.sql 
sqlite3 lexitree < constraints.sql 


./convert mysql-wn-views.sql > views.sql

substituir OR REPLACE per null
 
sqlite3 lexitree < views.sql

errors en lineas : 

4 per l'ORDEr 
9 per 4
11 per no tenor enumeraciones
12 ^idem


--------------


 sqlite3 lexitree < views2.sql 


per a habilitar la taula 4 i la 9 per a fer servir diccionari s'ha modificat aixis

+++ CREATE  VIEW samplesets AS SELECT synsetid, GROUP_CONCAT(DISTINCT samples.sample , '|' ) AS sampleset FROM samples GROUP BY synsetid;
--- CREATE  VIEW samplesets AS SELECT synsetid, GROUP_CONCAT(DISTINCT samples.sample ORDER BY sampleid SEPARATOR '|' ) AS sampleset FROM samples GROUP BY synsetid;

per a millorar-ho si surten problemes
http://stackoverflow.com/questions/1897352/sqlite-group-concat-ordering


CREATE  VIEW dict AS SELECT * FROM words LEFT JOIN senses s USING (wordid) LEFT JOIN casedwords USING (wordid,casedwordid) LEFT JOIN synsets USING (synsetid) LEFT JOIN samplesets USING (synsetid);




