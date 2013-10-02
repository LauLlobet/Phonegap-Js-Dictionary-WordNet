sed-4.2 -r 's:([^\ ]+) ([^\ ]+).*:insert into offset_tmp(sensekey,oid) values\("\1",\2\);:' < index.sense > db_offset_table
