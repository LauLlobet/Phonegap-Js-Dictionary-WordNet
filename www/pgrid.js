
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
		var line = line + '<div class="grid_1" ><span id="pgridLineBtn" ><button data-iconpos="notext"  class="select_all_lvl" id="'+i+'" data-mini="false"  data-icon="arrow-r" > </span> </div>';

		for( var j=0;j<ls-1;j++){
			theme='Off';
			if(buttons[i][j]==1)
				theme = 'On';	
			line = line + '<div class="grid_2">  <a data-role="button" class="pgrid'+theme+'Button" data-inline="true" data-mini="true" data-shadow="false" data-theme="reset"  id="'+i+'_'+j+'"></a></div>\n';   
		
		}
	
		theme='Off';
		if(buttons[i][j]==1)
			theme = 'On';
		if(ls > 0)
			line = line + '<div class="grid_2  suffix_'+(16-(ls*2+1))+'">  <a data-role="button" class="pgrid'+theme+'Button" data-inline="true" data-mini="true" data-shadow="false" data-theme="reset"  id="'+i+'_'+j+'"></a></div>\n';   
		else
			line = line + '<div class="grid_2  suffix_'+(16-(ls*2+1))+'">&nbsp;</div>';
			
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
		
		$('#grid').on('vclick','.pgridOnButton' , function() { 
			 
			var id= $(this).attr('id');
			if( buttons[id.charAt(0)][id.charAt(2)] == 0 )
				buttons[id.charAt(0)][id.charAt(2)] = 1;
			else
				buttons[id.charAt(0)][id.charAt(2)] = 0;
			
			refresh_grid();
			return false;
		});
		
		$('#grid').on('vclick','.pgridOffButton' , function() { 
			 
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
