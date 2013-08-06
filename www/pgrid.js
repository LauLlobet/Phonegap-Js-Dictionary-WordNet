
function level_grid(levels){
	
	this.size = 5;
	var max = Math.max.apply( Math, levels );
	if( max > 35)
		this.size = 10;
	
	// 10 o 5 , si el maxim es 
	this.level_size = [round(levels[0]/this.size),round(levels[1]/this.size),round(levels[2]/this.size),round(levels[3]/this.size),round(levels[4]/this.size)];

	this.buttons = [];

}

function refresh_grid(){
	
	var line = '';
	var theme = 'notheme';
	for(var i=0; i<5; i++){
		var ls = grid.level_size[i];
		var line = line + '<div class="grid_2"><button  class="select_all_lvl" id="'+i+'" data-mini="false"  data-icon="arrow-r" >&nbsp;</div>';
		
		for( var j=0;j<ls-1;j++){
			theme='c';
			if(buttons[i][j]==1)
				theme = 'e';	
			line = line + '<div class="grid_2" style="position:relative;"> <img src="img/pgrid_p'+theme+'.png" class="grid_btn" id="'+i+'_'+j+'" height=30 width=30 style="position:absolute;z-index:1;left:9px;bottom:13px;pointer-events:none;"> <button data-mini="false" style="z-index:2;position:relative;" data-theme="'+theme+'" class="grid_btn" id="'+i+'_'+j+'" ></button></div>\n';   
		}
	
		theme='c';
		if(buttons[i][j]==1)
			theme = 'e';
		
		line = line + '<div class="grid_2  suffix_'+(16-(ls*2+2))+'" style="position:relative;"> <img src="img/pgrid_p'+theme+'.png" class="iconabc"  height=30 width=30 style="position:absolute;z-index:1;left:9px;bottom:13px"> <button data-mini="false" style="z-index:2;position:relative;" data-theme="'+theme+'" class="grid_btn" id="'+i+'_'+j+'" ></button></div>\n';   
		
		document.getElementById("grid").innerHTML = line ;//""+test.current_slide;
		$('.ui-page-active').page("destroy").page();
	}
	
	
}
function load_grid(){
	
	refresh_grid();
	
	$(document).ready(function() {	
		$('#grid').on('vclick','.select_all_lvl'+''+'' , function() { 
			 
			console.log("--SA-->"+ $(this).attr('id'));
	        var line = $(this).attr('id');
	        console.log(line);
	        var onoff = 1;
	
	        for(var i=0; i<buttons[line].length; i++){
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
		
		$('#grid').on('vclick','.grid_btn'+''+'' , function() { 
			 
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
