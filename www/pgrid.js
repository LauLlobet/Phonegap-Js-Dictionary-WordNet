
function get_level(corrects,incorrects){
	

	
	if(corrects+incorrects <= 3 ){
		return [4,0,0.3];
	}
	
	/*
	 * inc = diferencia percentual al pujar de nivell 
	 * lvl = nivell , de 4 dolent a 0 excelent
	 * percent_lvl = part decilmal del nivell  ----> AKA .status
	 */
	var inc =  ( ( 1 - corrects/(corrects+incorrects)) *4.999) - ( ( 1 - (corrects+1)/(corrects+1+incorrects)) *4.999);
	var deinc =  - ( ( 1 - corrects/(corrects+incorrects)) *4.999) + ( ( 1 - (corrects)/(corrects+1+incorrects)) *4.999);
	//alert("inc0 "+inc +"deinc "+ deinc);
	
	if(inc == 0){
		inc = deinc;
	}
	var lvl =  Math.floor( ( 1 - corrects/(corrects+incorrects)) *4.999);
	var percent_lvl =  ( 1 - corrects/(corrects+incorrects)) *4.999 - Math.floor( ( 1 - corrects/(corrects+incorrects)) *4.9999) ;
	return [ lvl , percent_lvl, inc ];//- Math.floor(5 - corrects/(corrects+incorrects)*5) ];
	
}

function level_grid(levels){
	
	this.size = 4;
	var max = Math.max.apply( Math, levels );
	if( max > 28)
		this.size = 8;
	
	// 10 o 5 , si el maxim es 
	this.level_size = [round(levels[0]/this.size),round(levels[1]/this.size),round(levels[2]/this.size),round(levels[3]/this.size),round(levels[4]/this.size)];

	this.buttons = [];

}

function load_wordsXsenses(callback){

	if(db == ""){
		db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);
	}
	var lang_answer = "cat";
	db.transaction(function(tx) {
		word_list = [];
		tx.executeSql("select * from selected_wordsXsensesXcases;", [], function(tx, res1) {
			
			if(lang_answer == "eng_def"){
		    	load_wordsXsenses_with_res1(callback,res1);
	        	return;
	        }else{
			    fill_definitions2(0,res1,callback,tx,lang_answer);
	        	return;
	        }     
		});
	});
}

function fill_definitions2(i,res,callback,tx,lang_answer){
	if(i==res.rows.length){
		load_wordsXsenses_with_res1(callback,res);
		return;
	}
	//alert(lang_answer+"faha"+res.rows.item(i).synsetid);
	tx.executeSql("select lemma,synsetid,lang from lang_lemmas left join synsets using(synsetid) where synsetid="+res.rows.item(i).synsetid+" AND lang='"+lang_answer+"';", [], function(tx, reslang){
	//	console.log("----------->"+"select lemma,synsetid,lang from lang_lemmas left join synsets using(synsetid) where synsetid="+res.rows.item(i).synsetid+" AND lang='"+lang_answer+"';")
		if(reslang.rows.length != 0){
			var newdef = '';
			var pos =  Math.floor(Math.random()*reslang.rows.length);
			newdef= reslang.rows.item(pos).lemma;
			res.rows.item(i).definition = newdef;
		}else
			res.rows.item(i).definition = "(No Translation) "+res.rows.item(i).definition;
		
		fill_definitions2(i+1,res,callback,tx,lang_answer);
	});
}

function load_wordsXsenses_with_res1(callback,res1){
	
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
		wordsxsenses = new SortedSet([]);
		
		var SenseCase = new Class({
			include: Comparable,
			
		    initialize: function(row) {
		        this.row = row;
		        var levels = get_level(row.correct,row.incorrect); 
		        this.level =  levels[0];
		        this.status = levels[1]; // decimal de level
		        this.inc = levels[2];
		        this.serie = -1;
		        this.ctime = row.ctime;
		        this.selected = 0;
		        this.ssenseid = row.ssenseid; 
		        this.sensecaseid = row.sensecaseid; 
		        this.correct = row.correct;
		        this.incorrect = row.incorrect;
		        
		        
		        if(row.selected == 1)
			        this.selected = 1;
				//alert(row.lemma+"instanciant:"+row.sensecaseid);
		    },
		    equals: function(object) {
		        return (object instanceof this.klass)
		            && object.ctime == this.ctime;
		    },
		    hash: function() {
		        return this.ctime;
		    },
		    
		    compareTo: function(other) {
		        if (this.ctime < other.ctime) return 1;
		        if (this.ctime > other.ctime) return -1;
		        return 0;
		    }
		    
		    
		})	
		
		//wordsxsenses = new SortedSet([]);	
		for(var i=0; i<res1.rows.length ; i++){
			wordsxsenses.add(new SenseCase(res1.rows.item(i)));
		}
		callback(); 
	});
}


function classify_senses(callback){
	
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
	//if(wordsxsenses.toArray().lenght >= 1){
				
		//alert("commitOKpk->"+wordsxsenses.toArray()[0].definition);
	
		var level;
		var corrects = 16;
		var incorrects = 4; // 4 -> 17
		level = get_level(corrects,incorrects);
	
		var lvl1 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 0 }));
		var lvl2 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 1 }));
		var lvl3 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 2 }));
		var lvl4 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 3 }));
		var lvl5 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 4 }));
	

		buttons = [['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0']];
		senses_grid = [ [],[],[],[],[] ];

		
		var snum = 0;
		lvl1.forEachSlice(4, function(list) {
			var slice = new Set(list);
			slice.forEach(function(x){x.serie=snum}); // x.serie=snum
			if(slice.any(function(x){return x.selected == 1}))
				buttons[0][snum]=1;
			snum++;
			senses_grid[0].push(list);
		});
		snum = 0;
		lvl2.forEachSlice(4, function(list) {
			var slice = new Set(list);
			slice.forEach(function(x){x.serie=snum}); // x.serie=snum
			senses_grid[1].push(list);
			if(slice.any(function(x){return x.selected == 1}))
				buttons[1][snum]=1;
			snum++;
		});
		snum = 0;
		lvl3.forEachSlice(4, function(list) {
			var slice = new Set(list);
			slice.forEach(function(x){x.serie=snum}); // x.serie=snum
			if(slice.any(function(x){return x.selected == 1}))
				buttons[2][snum]=1;
			snum++;
		    senses_grid[2].push(list);
		});
		snum = 0;
		lvl4.forEachSlice(4, function(list) {
			var slice = new Set(list);
			slice.forEach(function(x){x.serie=snum}); // x.serie=snum
			if(slice.any(function(x){return x.selected == 1}))
				buttons[3][snum]=1;
			snum++;
		    senses_grid[3].push(list);
		});
		snum = 0;
		lvl5.forEachSlice(4, function(list) {
			var slice = new Set(list);
			slice.forEach(function(x){x.serie=snum}); // x.serie=snum
			if(slice.any(function(x){return x.selected == 1}))
				buttons[4][snum]=1;
			snum++;
		    senses_grid[4].push(list);
		});
		
		grid = new level_grid([lvl1.count(),lvl2.count(),lvl3.count(),lvl4.count(),lvl5.count()]);
		
		
		
		//lvl2.toArray()[0].selected=1;

	callback();
	});
}


function create_test_or_not(callback){
	
	if(db == "")
		db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);
	
	db.transaction(function(tx) {		
		
			tx.executeSql(" select MAX(ssenseid) from selected_senses ;", [], function(tx, res0) {
				
				if(res0.rows.length == 0)
					return;
				
				tx.executeSql(' select MAX(lastssenseid), MAX(testid)  ,stime from test ;', [], function(tx, res) {
					
					var filanova = 0;
					filanova = filanova || ( res.rows.item(0)["MAX(lastssenseid)"] < res0.rows.item(0)["MAX(ssenseid)"] ); // si esta desactualitzat en paraules seleccionades
					filanova = filanova || res.rows.item(0).stime != null;
					filanova = filanova || res.rows.item(0)["MAX(lastssenseid)"] == null;
					filanova = filanova || res.rows.item(0)["MAX(lastssenseid)"] == undefined;
					//alert("ton:"+ res.rows.item(0)["MAX(lastssenseid)"]+"<"+ res0.rows.item(0)["MAX(ssenseid)"])
					//alert("1:"+res.rows.item(0)["MAX(lastssenseid)"]+"2:"+res0.rows.item(0)["MAX(ssenseid)"]+"filanova "+ filanova);
					if( filanova ){
						db.transaction(function(ty) {	
							ty.executeSql("insert into test(lastssenseid) values('"+res0.rows.item(0)["MAX(ssenseid)"]+"');",[], function(tx,res){callback();});
						});
						return;
					}
					callback();
					});
			});
	});
}

function force_new_test(){
	
	db.transaction(function(tx) {			
		tx.executeSql(" select MAX(ssenseid) from selected_senses ;", [], function(tx, res0) {
			db.transaction(function(ty) {	
				ty.executeSql("insert into test(lastssenseid) values('"+res0.rows.item(0)["MAX(ssenseid)"]+"');",[], function(tx,res){alert("forced test")});
			});
		});
	});
}

function instance_cases(callback){

	//select de ja existents segons testid
	//si hi han 0 resultats 

	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
	
		db.transaction(function(tx) {		
			//Tes estara buit com a minim , com que s'ha executat create test or not mai hi haura un test antic , ho dic per el left join de select wordsXsenses()
			tx.executeSql("select * from ans_sense_cases where testid= (select MAX(testid) from test);", [], function(tx, res) {
				if( res.rows.length == 0 ){
					//alert("noneintest");
					// s'han de carregar de wordxsenses 
					tx.executeSql("select * from selected_wordsXsenses;", [], function(tx, res1) {
						insert_instance_cases(0,res1,callback);
					});
					return;
				}
				//alert("thereare in test");
				callback();
			});
						
		});
	
	});	
    //alert("asenseid"+actual_testid);
    
	//			
  
}

function insert_instance_cases(i,res1,callback){
	
	if(i>=res1.rows.length){
		//alert("calling back happily");
		callback();
		return;
	}
	db.transaction(function(tx) {		
		//alert("inserting before callback REC");		
		tx.executeSql("insert into ans_sense_cases(anstype,testid,ssenseid,wordid) values('definition',(select MAX(testid) from test),"+res1.rows.item(i).ssenseid+","+res1.rows.item(i).wordid+");");
		i++;
		insert_instance_cases(i,res1,callback);
	});
	
}

function save_order(callback){
	
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
		db.transaction(function(tx) {		
				
			wordsxsenses.forEach(function(x) {
			
				//alert(x.serie+"fahaorder:"+x.level+" "+x.serie+" "+x.sensecaseid);
				tx.executeSql("UPDATE ans_sense_cases SET x_serie='"+x.serie+"', y_lvl='"+x.level+"'  where sensecaseid='"+x.sensecaseid+"' ;");
				//tx.executeSql("select * from selected_wordsXsensesXcases where sensecaseid IS NULL;");
			
					
			})
			callback();
		});
	});
	
	
	
}

function instance_new_selected(callback){
	
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
		db.transaction(function(tx) {		
			tx.executeSql("select * from selected_wordsXsensesXcases where sensecaseid IS NULL;", [], function(tx, res) {
				for(var i=0; i<res.rows.length ; i++){
					//alert("aixo poster surt");
					//tx.executeSql("insert into ans_sense_cases(anstype,testid,ssenseid,wordid) values('definition',(select MAX(testid) from test),"+res.rows.item(i).ssenseid+","+res.rows.item(i).wordid+");");
				}
				
				tx.executeSql("select * from selected_wordsXsensesXcases where sensecaseid IS NULL;", [], function(tx, res) {
					for(var i=0; i<res.rows.length ; i++){
						alert("aixo no surt mai");
						//tx.executeSql("insert into ans_sense_cases(anstype,testid,ssenseid,wordid) values('definition',(select MAX(testid) from test),"+res.rows.item(i).ssenseid+","+res.rows.item(i).wordid+");");
					}			
					callback();
				});
			});
		});
	});
}

function print_grid(){
	
	var line = '';
	var theme = 'notheme';
	
	for(var i=0; i<5; i++){
		var ls = grid.level_size[i];
		var line = line + '<div class="grid_1" ><span id="pgridLineBtn" ><button data-iconpos="notext"  class="select_all_lvl" id="'+i+'" data-mini="false"  data-icon="arrow-r" > </span> </div>';

		for( var j=0;j<ls-1;j++){
			theme='Off';
			if(buttons[i][j]==1)
				theme = 'On';	
			line = line + '<div class="grid_2">  <a data-role="button" class="pgrid'+theme+big+'Button" data-inline="true" data-mini="true" data-shadow="false" data-theme="reset"  id="'+i+'_'+j+'"></a></div>\n';   
		
		}
	
		theme='Off';
		if(buttons[i][j]==1)
			theme = 'On';
		if(ls > 0)
			line = line + '<div class="grid_2  suffix_'+(16-(ls*2+1))+'">  <a data-role="button" class="pgrid'+theme+big+'Button" data-inline="true" data-mini="true" data-shadow="false" data-theme="reset"  id="'+i+'_'+j+'"></a></div>\n';   
		else
			line = line + '<div class="grid_2  suffix_13">   <a data-role="button" class="pgridNull'+big+'Button"     data-inline="true" data-mini="true" data-shadow="false" data-theme="reset"  id="'+i+'_'+j+'"></a></div>\n';  
			
		document.getElementById("grid").innerHTML = line ;//""+test.current_slide;
		$('.ui-page-active').page("destroy").page();
	}
	
	
}

function toggle_selected( togg, x, y, callback){

	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
			var set = new Set(senses_grid[x][y]);
			
			set.forEach(function(x) {
				//alert("serie:"+x.serie +"level:"+x.level+" "+x.sensecaseid+" togg"+togg);
				db.transaction(function(tx) {
					tx.executeSql("UPDATE ans_sense_cases SET selected='"+togg+"' where sensecaseid='"+x.sensecaseid+"' ;");
					//alert("toggled:"+x.sensecaseid);
					db.transaction(function(ty) {
						ty.executeSql("UPDATE ans_sense_cases SET selected='"+togg+"' where sensecaseid='"+x.sensecaseid+"' ;");
					});
				});
			});
			//alert("before callback");
			callback();
	});
}

function toggle_level(i,line,onoff,callback){
	if(i<=0){
		callback();
		return;
	}
	toggle_selected(onoff,line,i-1,function(){
		toggle_level(i-1,line,onoff,callback)	
	});
	
}

function set_buttons_ready(){
	
	$(document).ready(function() {	
		
		$('body').off('touchstart','.select_all_lvl');
		$('body').on('touchstart','.select_all_lvl'+''+'' , function() { 
			 
			console.log("--SA-->"+ $(this).attr('id'));
	        var line = $(this).attr('id');
	        console.log(line);
	        var onoff = 1;
	
	        for(var i=0; i<grid.level_size[line]; i++){
	        	onoff = onoff && buttons[line][i];
	        }
	        
	        if(onoff==0)
	        	onoff=1;
	        else
	        	onoff=0;
	        
	       /* for(var i=0; i<buttons[line].length; i++){
	        	//buttons[line][i]=onoff;
	        	toggle_selected(onoff,line,1,function(){toggle_selected(onoff,line,2,load_grid());});
	        }*/
	        
	        toggle_level(buttons[line].length,line,onoff,function(){load_grid();})
	        
	        //refresh_grid();      
			return false;
		});
		
		$('body').off('touchstart','.pgridOnButton');
		$('body').on('touchstart','.pgridOnButton' , function() { 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 ){
				alert("mai hauria de sortir toggle onMini");//toggle_selected(0,id.charAt(0),id.charAt(2),load_grid());
			}else
				toggle_selected(0,id.charAt(0),id.charAt(2),function(){load_grid("button");}); // 
			     //buttons[id.charAt(0)][id.charAt(2)] = 0;
			return false;
		});
		
		$('body').off('touchstart','.pgridOffButton');
		$('body').on('touchstart','.pgridOffButton' , function() { 	 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 ){
				toggle_selected(1,id.charAt(0),id.charAt(2),function(){load_grid("buttoff");}); // 
				
			}else
				alert("mai hauria de sortir toggle off");//toggle_selected(0,id.charAt(0),id.charAt(2),load_grid());
				//buttons[id.charAt(0)][id.charAt(2)] = 0;
			
	//		refresh_grid();
			return false;
		});
		
		
		$('body').off('touchstart','.pgridOnBigButton');
		$('body').on('touchstart','.pgridOnBigButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 ){
				//buttons[id.charAt(0)][id.charAt(2)] = 1;
				//toggle_selected(1,id.charAt(0),id.charAt(2),load_grid());
				alert("mai hauria de sortir toggle on big");
			}else
				toggle_selected(0,id.charAt(0),id.charAt(2),function(){load_grid("button");}); // 
			//buttons[id.charAt(0)][id.charAt(2)] = 0;
			return false;
		});
		
		$('body').off('touchstart','.pgridOffBigButton');
		$('body').on('touchstart','.pgridOffBigButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 ){
				//buttons[id.charAt(0)][id.charAt(2)] = 1;
				toggle_selected(1,id.charAt(0),id.charAt(2),function(){load_grid("buttoff");}); // 
				
			}else
				alert("mai hauria de sortir toggle off big");
				//buttons[id.charAt(0)][id.charAt(2)] = 0;
			
	//		refresh_grid();
			return false;
		});
		
		
		
	});
}
function load_grid(msg){
	//alert("load grid:"+msg);

	create_test_or_not(function(){				//alert("create done");
		instance_cases(function(){				//alert("instance done");
			instance_new_selected(function(){	//alert("instance2 done");
				load_wordsXsenses(function(){	//alert("load_words done");
					classify_senses(function(){	//alert("classify done");
						save_order(function(){ 	//alert("save done");
							print_grid();
							set_buttons_ready();
						});
					})
				})
			})
		})
	});	
}

//function load_grid(){
//	
//
//	create_test_or_not(function(){				alert("create done");
//		instance_cases(function(){				alert("instance done");
//			instance_new_selected(function(){	alert("instance2 done");
//				load_wordsXsenses(function(){	alert("load_words done");
//					classify_senses(function(){	alert("classify done");
//						save_order(function(){ 	alert("save done");
//							print_grid();
//							set_buttons_ready();
//						});
//					})
//				})
//			})
//		})
//	});	
//}

function refresh_grid(){
	
	print_grid();
	
}

