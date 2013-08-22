
function load_pdef(def){

	refresh_pdef(def);
	
}

function toogle_sense(senseid,word){
	
	if(db == "")
		db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);

	var wordid; 
	
	db.transaction(function(tx) {
		
		
		tx.executeSql("SELECT wordid  FROM words WHERE lemma = '"+word+"';", [], function(tx, res1) {
			
			if(res1.rows.length == 0){
				alert('wordid not found at toggle sense');
			}
				
		   wordid = res1.rows.item(0).wordid;
		   //alert("wordid found"+wordid);
			tx.executeSql("SELECT synsetid  FROM favourites_senses WHERE synsetid = '"+senseid+"' AND wordid='"+wordid+"';", [], function(tx, res2) {
	
				if(res2.rows.length == 0){
					
					var d = new Date();
					var n = d.getTime();
					
//					tx.executeSql("INSERT INTO favourites ( time,wordid, ok , nok) SELECT * FROM (SELECT '"+n+"','"+wordid+"', '0', '0') AS tmp WHERE NOT EXISTS (SELECT wordid FROM favourites WHERE wordid = '"+wordid+"') LIMIT 1;");
//					tx.executeSql("insert into favourites_senses(wordid,synsetid,ctime) values  ('"+wordid+"', '"+senseid+", '"+n+"');");
					
					tx.executeSql("INSERT INTO favourites ( time,wordid, ok , nok) SELECT * FROM (SELECT '"+n+"','"+wordid+"', '0', '0') AS tmp WHERE NOT EXISTS (SELECT wordid FROM favourites WHERE wordid = '"+wordid+"') LIMIT 1;");
					tx.executeSql("insert into favourites_senses(wordid,synsetid) values  ('"+wordid+"', '"+senseid+"');");
				
				
				}else{
					//ToDo: count en comptes de select per a millrar rendiment
					tx.executeSql("SELECT synsetid  FROM favourites_senses WHERE wordid='"+wordid+"';", [], function(tx, res3) {
						if(res3.rows.length == 1){
							tx.executeSql("delete from favourites where wordid='"+wordid+"';");
						}
					});
					tx.executeSql("delete from favourites_senses where synsetid='"+senseid+"' and wordid='"+wordid+"';");
					
				}
			});
		});
	});
	
}

function special_word(word){
	
	if( specialword == word ){
		
		load_pdef(word);
		return;
	}
	
	specialword=word;
	refresh_pdef(word_pdef);
	
}

function format_definition(def){
	
	var words=def.split(" ");
	
	var result="";
	
	for(var i=0;i<words.length;i++){
		
		if(words[i]==specialword)
			result+='<span class="word_to_search_e" id="'+words[i]+'">'+words[i]+"</span> ";
		else
			result+='<span class="word_to_search_c" id="'+words[i]+'">'+words[i]+"</span> ";
	}
	return result;
}

function refresh_pdef(word){

	word_pdef = word;
	/*var def  = '<li data-icon="check" data-theme="e"><a><span id="defline">+res.rows.item(i).definition+</span></a><a class="tick_sense" word="+word+" sense="+res.rows.item(i).synsetid+" >tick</a></li>';
    def += '<li data-icon="check" data-theme="d"><a><span id="defline">+res.rows.item(i).definition+</span></a><a class="tick_sense" word="+word+" sense="+res.rows.item(i).synsetid+" data-theme="d" data-icon="plus" >tick</a></li>';

	$.mobile.changePage( "index.html#pdef", { transition: "slide"} );
	
    $('#pdef_def').html(def).promise().done(function () {
		   //refresh here - $(this) refers to ul here
		   $(this).listview().listview("refresh");
    	   //$(this).listview("create");
		   //causes a refresh to happen on the elements such as button etc. WHICH lie inside ul
		   //$(this).trigger("create");
		});
	
	
	document.getElementById("pdef_word").innerHTML = word;
	*/
	
	if(word=="" || word==undefined )
		return;
	var def= "error";
	
	if(db == "")
		db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);

	var wordid; 
	
	db.transaction(function(tx) {
		
		
		tx.executeSql("SELECT wordid  FROM words WHERE lemma = '"+word+"';", [], function(tx, res1) {
			
			if(res1.rows.length == 0){
				toast('Sorry,word not found');
				return;
			}
				
		   wordid = res1.rows.item(0).wordid;
		
		
			tx.executeSql("SELECT synsetid  FROM favourites_senses WHERE wordid = '"+wordid+"';", [], function(tx, res2) {
	
				senses = [];
		        for(var i=0 ; i<res2.rows.length ; i++){
		        	senses.push(res2.rows.item(i).synsetid);
		   	    }
		        
		        
		        tx.executeSql("SELECT lemma,pos,sensenum,synsetid,definition,sampleset  FROM dict WHERE lemma = '"+word+"' ORDER BY pos,sensenum;", [], function(tx, res) {
		            //alert("res.rows.length: " + res.rows.length + " -- should be 1");

		   	        if( res.rows.length == 0 ){
		   	        	return;
		   	        }
		   	        def = '';
		   	        for(var i=0 ; i<res.rows.length ; i++){
		   	        
		   	           if( -1 != $.inArray(res.rows.item(i).synsetid, senses)){
		   	   	    	   def += '<li data-icon="check" data-theme="e"><a><span id="defline">'+format_definition(res.rows.item(i).definition)+'</span></a><a class="tick_sense" word="'+word+'" sense="'+res.rows.item(i).synsetid+'" >tick</a></li>';
		   	   	       }else{
		   	   	    	   def += '<li data-icon="check" data-theme="d"><a><span id="defline">'+format_definition(res.rows.item(i).definition)+'</span></a><a class="tick_sense" word="'+word+'" sense="'+res.rows.item(i).synsetid+'" data-theme="d" data-icon="plus" >tick</a></li>';
		   	   	       }
		   	   	       
		   	   	    }
		   	  		
		   	        $.mobile.changePage( "index.html#pdef", { transition: "slide"} );
		  		   	     
		    		$('#pdef_def').html(def).promise().done(function () {
		    			   //refresh here - $(this) refers to ul here
		    			   $(this).listview().listview("refresh");
		    			   //causes a refresh to happen on the elements such as button etc. WHICH lie inside ul
		    			   $(this).trigger("create");
		    			});
		    		
		    		
		    		document.getElementById("pdef_word").innerHTML = word;
		   
		         });
		   	        
			});
		
		});
	       
       });

}

