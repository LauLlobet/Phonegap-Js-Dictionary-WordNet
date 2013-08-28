
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