
function level_grid(levels){
	
	this.size = 5;
	var max = Math.max.apply( Math, levels );
	if( max > 35)
		this.size = 10;
	
	// 10 o 5 , si el maxim es 
	this.level_size = [round(levels[0]/this.size),round(levels[1]/this.size),round(levels[2]/this.size),round(levels[3]/this.size),round(levels[4]/this.size)];

	this.buttons = [];

}

function load_wordsXsenses(){
	
	if(db == ""){
		db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);
	}
	
	//wordsxsenses = new Set();
	//var oo = new Set([0,1,2]);
	db.transaction(function(tx) {
		
		JS.require('JS.Set','JS.Comparable','JS.Class', function(Set,Comparable,Class) {

			var SenseCase = new Class({
				include: Comparable,
				
			    initialize: function(row) {
			        this.row = row;
			        this.level =  get_level(row.correct,row.incorrect);
			        this.ctime = row.ctime;
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
			    
			    
			});
			
			
			wordsxsenses = new Set([]);
			
			word_list = [];
			tx.executeSql("select * from selected_wordsXsenses;", [], function(tx, res1) {
				
				for(var i=0; i<res1.rows.length ; i++){
					wordsxsenses.add(new SenseCase(res1.rows.item(i)));
				}
				

				refresh_grid();
		
			});
			
		});
		


	});
}


function get_level(corrects,incorrects){
	
	if(corrects+incorrects < 4 )
		return 5;
	
	return Math.ceil(5 - corrects/(corrects+incorrects)*5);
	
}


function refresh_grid(){
	var line = '';
	var theme = 'notheme';
	
	///commit
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
	//if(wordsxsenses.toArray().lenght >= 1){
				
		//alert("commitOKpk->"+wordsxsenses.toArray()[0].definition);
	
		var level;
		var corrects = 16;
		var incorrects = 4; // 4 -> 17
		level = get_level(corrects,incorrects);
		
		var lvl1 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 1 }));
		var lvl2 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 2 }));
		var lvl3 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 3 }));
		var lvl4 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 4 }));
		var lvl5 = new SortedSet(wordsxsenses.select(function(x) { return x.level == 5 }));
		
		
		lvl2.forEach(function(x) {
		    alert("DbgOk->"+x.row.lemma);
		});
		

	//}	
	});
	///commit
	
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
function load_grid(){
	

	load_wordsXsenses();// is included 	refresh_grid();
	
	$(document).ready(function() {	
		$('#grid').on('vclick','.select_all_lvl'+''+'' , function() { 
			 
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
	        load_wordsXsenses();      
			return false;
		});
		
		$('#grid').on('vclick','.pgridOnButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 )
				buttons[id.charAt(0)][id.charAt(2)] = 1;
			else
				buttons[id.charAt(0)][id.charAt(2)] = 0;
			
			load_wordsXsenses();
			return false;
		});
		
		$('#grid').on('vclick','.pgridOffButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 )
				buttons[id.charAt(0)][id.charAt(2)] = 1;
			else
				buttons[id.charAt(0)][id.charAt(2)] = 0;
			
			load_wordsXsenses();
			return false;
		});
		
		
		$('#grid').on('vclick','.pgridOnBigButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 )
				buttons[id.charAt(0)][id.charAt(2)] = 1;
			else
				buttons[id.charAt(0)][id.charAt(2)] = 0;
			
			load_wordsXsenses();
			return false;
		});
		
		$('#grid').on('vclick','.pgridOffBigButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 )
				buttons[id.charAt(0)][id.charAt(2)] = 1;
			else
				buttons[id.charAt(0)][id.charAt(2)] = 0;
			
			load_wordsXsenses();
			return false;
		});
		
		
		
	});
}
