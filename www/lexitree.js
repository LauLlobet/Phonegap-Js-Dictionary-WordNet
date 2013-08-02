
var test = new test( [ new wordset('swift','bird',['dog','ape','mamal']) ,
                       new wordset('prison','place',['lake','river','book']) ,
                       new wordset('job','work',['sentence','escape','pain'])
					] , 30 ) ;

var grid = new level_grid([25,40,10,5,30]);

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

function round(n){
	return Math.round(n);
}

function level_grid(levels){
	
	this.size = 5;
	var max = Math.max.apply( Math, levels );
	if( max > 35)
		this.size = 10;
	
	// 10 o 5 , si el maxim es 
	this.level_size = [round(levels[0]/this.size),round(levels[1]/this.size),round(levels[2]/this.size),round(levels[3]/this.size),round(levels[4]/this.size)];

	this.buttons = [];

}

function load_grid(){
	
	var line = '';
	for(var i=0; i<5; i++){
		var ls = grid.level_size[i];
		var line = line + '<div class="grid_2"><a id="select_all_lvl'+i+'" data-role="button" data-mini="false" data-icon="arrow-r">.</a></div>\n';
		
		for( var j=0;j<ls-1;j++){
			line = line + '<div class="grid_2"><a id="grid_btn'+i+''+j+'" data-role="button"  data-mini="false" data-theme="c" data-icon="arrow-da">.</a></div>\n';   
		}
		j++;
		line = line + '<div class="grid_2 suffix_'+(16-(ls*2+2))+'"><a id="grid_btn'+i+''+j+'" data-role="button"  data-mini="false" data-theme="c" data-icon="arrow-da">.</a></div>\n';   
	}
	
	var line2 = '<div class="grid_2"><a href="#pdef" data-role="button" data-mini="false" data-icon="arrow-r" id="inici-search-btn">.</a></div>  <div class="grid_2 suffix_12"><a href="#pdef" data-role="button" data-mini="false" data-theme="c" data-icon="arrow-da"  id="inici-search-btn">.</a></div> ';
	
	document.getElementById("grid").innerHTML = line ;//""+test.current_slide;
	$('.ui-page-active').page("destroy").page();
}



function init()
{
	init_test();
	load_grid();
}



$(document).ready(function() {

//	
//	for(var i=0;i<5;i++ )//grid.buttons.length 
//	{
//		$('#select_all_lvl'+i).on('vclick', function() { 
//		   console.log("select all lvl"+i);
//           return false;
//		});
//	}
	
	
    $('#btn_op_a').on('vclick', function() { 
    	test_answer(0);
    	 next_slide();
//    	 $.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
          return false;
    });
    
    $('#btn_op_b').on('vclick', function() { 
    	test_answer(1);
    	next_slide();
//    	$.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
         return false;
    });
    
    $('#btn_op_c').on('vclick', function() { 
    	test_answer(2);
    	next_slide();
//    	$.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
         return false;
    });

    $('#btn_l1').on('vclick', function() { 
        $.mobile.changePage( "index.html#pgrid", { transition: "slide"} );
        return false;
     });
        
});


