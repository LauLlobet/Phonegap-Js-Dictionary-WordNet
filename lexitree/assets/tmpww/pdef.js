

$("#pdef").live('pageshow', function(event, data) {
    //alert("the previous page was: " + data.prevPage.attr('id'));
    previouspage = data.prevPage.attr('id');
    if(previouspage!='pdef')
    	previous_synsetid = "pnull"
});



function load_pdef(def){

	refresh_pdef(def);
	
}

function toogle_sense(senseid,word){
	
	pdef_tick = 1;
	if(db == "")
		db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);

	var wordid; 
	
	db.transaction(function(tx) {
		
		tx.executeSql("SELECT wordid  FROM words WHERE lemma = '"+word+"';", [], function(tx, res1) {
			
			if(res1.rows.length == 0){
				alert('wordid not found at toggle sense');
			}
				
		   wordid = res1.rows.item(0).wordid;
		   
			tx.executeSql("SELECT synsetid,ssenseid FROM selected_senses WHERE synsetid = '"+senseid+"' AND wordid='"+wordid+"' AND dtime IS NULL;", [], function(tx, res2) {
				var d = new Date();
				var n = d.getTime();
				if(res2.rows.length == 0){
					if(previous_synsetid != "pnull"){
						toast("chained!");
						tx.executeSql("insert into selected_senses(wordid,synsetid,ctime,previous_synsetid) values  ('"+wordid+"', '"+senseid+"', '"+n+"', '"+previous_synsetid+"');");
					}else{
						toast("unchainedQQQ!");
						tx.executeSql("insert into selected_senses(wordid,synsetid,ctime) values  ('"+wordid+"', '"+senseid+"', '"+n+"');");
					}
						
				}else{
					tx.executeSql("UPDATE selected_senses SET dtime = "+n+" where ssenseid ='"+res2.rows.item(0).ssenseid+"' ;");
				}
			});
		});
	});
	
}

function special_word(word,psid){
	
	if( specialword == word ){

		previous_synsetid = psid;
		load_pdef(word);
		return;
	}
	
	specialword=word;
	
	refresh_pdef(word_pdef);
	
}

function format_definition(def,psid){
	
	var words=def.split(" ");
	
	var result="";
	
	for(var i=0;i<words.length;i++){
		
		if(words[i]==specialword)
			result+='<span class="word_to_search_e" id="'+words[i]+'" psid="'+psid+'">'+words[i]+"</span> ";
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
		
			tx.executeSql("SELECT synsetid  FROM selected_senses WHERE wordid = '"+wordid+"' AND dtime IS NULL;", [], function(tx, res2) {
	
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
		   	        	
		   	        	var synsetid = res.rows.item(i).synsetid;
		   	        	
		   	           if( -1 != $.inArray(res.rows.item(i).synsetid, senses)){
		   	   	    	   def += '<li data-icon="check" data-theme="e"><a><span id="defline">'+format_definition(res.rows.item(i).definition,synsetid)+'</span></a><a class="tick_sense" word="'+word+'" sense="'+res.rows.item(i).synsetid+'" >tick</a></li>';
		   	   	       }else{
		   	   	    	   synsetid = "pnull";
		   	   	    	   def += '<li data-icon="check" data-theme="d"><a><span id="defline">'+format_definition(res.rows.item(i).definition,synsetid)+'</span></a><a class="tick_sense" word="'+word+'" sense="'+res.rows.item(i).synsetid+'" data-theme="d" data-icon="plus" >tick</a></li>';
		   	   	       }
		   	   	       
		   	   	    }
		   	  		
		   	        if(specialword == word && pdef_tick == 0)
		   	        	$.mobile.changePage( "index.html#pdef", { transition: "slidefade" , allowSamePageTransition: true} );
		   	        else
		   	        	$.mobile.changePage( "index.html#pdef", { transition: "slide"} );
		   	     
		   	        pdef_tick = 0
		   	     new_word_pdef = 1;
		   	     
		    		$('#pdef_def').html(def).promise().done(function () {
		    			   //refresh here - $(this) refers to ul here
		    			   $(this).listview().listview("refresh");
		    			   //causes a refresh to happen on the elements such as button etc. WHICH lie inside ul
		    			   $(this).trigger("create");
		    			   //$.mobile.changePage( "index.html#pdef", { transition: "slide" , allowSamePageTransition: true} );
				   	        
		    			});
		    		
		    		
		    		document.getElementById("pdef_word").innerHTML = word;
		    		


		   
		         });
		   	        
			});
		
		});
	       
       });

}

