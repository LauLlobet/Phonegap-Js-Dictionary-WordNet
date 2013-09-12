
function get_level(corrects,incorrects){
	
	
	if(corrects+incorrects < 1 ){
		return [4,-1];
	}
	var lvl =  Math.floor( ( 1 - corrects/(corrects+incorrects)) *4.999);
	var inc =  ( ( 1 - corrects/(corrects+incorrects)) *4.999) - ( ( 1 - (corrects+1)/(corrects+1+incorrects)) *4.999);
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
	
	db.transaction(function(tx) {
	
			
			word_list = [];
			tx.executeSql("select * from selected_wordsXsensesXcases;", [], function(tx, res1) {
				
				JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
				
					wordsxsenses = new SortedSet([]);
					
					var SenseCase = new Class({
						include: Comparable,
						
					    initialize: function(row) {
					        this.row = row;
					        var levels = get_level(row.correct,row.incorrect); 
					        this.level =  levels[0];
					        this.status = levels[1];
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
					callback(); });
			});
			
	//	});
		


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
					
					if( res.rows.length == 0 ){
						tx.executeSql("insert into test(lastssenseid) values('"+res0.rows.item(0)["MAX(ssenseid)"]+"');");
						callback();
						return;
					}
					var filanova = 0;
					filanova = filanova || ( res.rows.item(0)["MAX(lastssenseid)"] < res0.rows.item(0)["MAX(ssenseid)"] ); // si esta desactualitzat en paraules seleccionades
					filanova = filanova || res.rows.item(0).stime != null;
					//alert("ton:"+ res.rows.item(0)["MAX(lastssenseid)"]+"<"+ res0.rows.item(0)["MAX(ssenseid)"])
					if( filanova ){
						tx.executeSql("insert into test(lastssenseid) values('"+res0.rows.item(0)["MAX(ssenseid)"]+"');");
					}
					callback();
					});
			});
		//});
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
					// s'han de carregar de wordxsenses 
					tx.executeSql("select * from selected_wordsXsenses;", [], function(tx, res1) {
							
						for(var i=0; i<res1.rows.length ; i++){
							tx.executeSql("insert into ans_sense_cases(anstype,testid,ssenseid,wordid) values('definition',(select MAX(testid) from test),"+res1.rows.item(i).ssenseid+","+res1.rows.item(i).wordid+");");
						}
					});
				}
				callback();
			});
						
		});
	
	
	});	
    //alert("asenseid"+actual_testid);
    
	//			
  
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
					alert("aixo no ha de sortir mai num:1");
					tx.executeSql("insert into ans_sense_cases(anstype,testid,ssenseid,wordid) values('definition',(select MAX(testid) from test),"+res.rows.item(i).ssenseid+","+res.rows.item(i).wordid+");");
				}
				callback();
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
				});
				
				//tx.executeSql("select * from selected_wordsXsensesXcases where sensecaseid IS NULL;");
			})
			//alert("faha"+Object.keys([0]));
			callback();
	});
	
}

function set_buttons_ready(){
	
	$(document).ready(function() {	
		$('#grid').on('touchstart','.select_all_lvl'+''+'' , function() { 
			 
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
	        
	        for(var i=0; i<buttons[line].length; i++){
	        	buttons[line][i]=onoff;
	        }
	        refresh_grid();      
			return false;
		});
		
		$('#grid').on('touchstart','.pgridOnButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 ){
				//buttons[id.charAt(0)][id.charAt(2)] = 1;
				toggle_selected(1,id.charAt(0),id.charAt(2),load_grid());
				
			}else
				toggle_selected(0,id.charAt(0),id.charAt(2),load_grid());
				//buttons[id.charAt(0)][id.charAt(2)] = 0;
			return false;
		});
		
		$('#grid').on('touchstart','.pgridOffButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 ){
				//buttons[id.charAt(0)][id.charAt(2)] = 1;
				toggle_selected(1,id.charAt(0),id.charAt(2),load_grid());
				
			}else
				toggle_selected(0,id.charAt(0),id.charAt(2),load_grid());
				//buttons[id.charAt(0)][id.charAt(2)] = 0;
			
	//		refresh_grid();
			return false;
		});
		
		
		$('#grid').on('touchstart','.pgridOnBigButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 )
				buttons[id.charAt(0)][id.charAt(2)] = 1;
			else
				buttons[id.charAt(0)][id.charAt(2)] = 0;
			
			refresh_grid();
			return false;
		});
		
		$('#grid').on('touchstart','.pgridOffBigButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 )
				buttons[id.charAt(0)][id.charAt(2)] = 1;
			else
				buttons[id.charAt(0)][id.charAt(2)] = 0;
			
			refresh_grid();
			return false;
		});
		
		
		
	});
}
function load_grid(){
	

	create_test_or_not(function(){
		instance_cases(function(){	
			instance_new_selected(function(){
				load_wordsXsenses(function(){
					classify_senses(function(){
						save_order(function(){
							print_grid();
							set_buttons_ready();
						});
					})
				})
			})
		})
	});	
}

function refresh_grid(){
	
	print_grid();
	
}

