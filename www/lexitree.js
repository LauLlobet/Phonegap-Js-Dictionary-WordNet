

 var db = "";


var test = "";

var grid = new level_grid([56,5,4,0,24]);
var senses_grid;

var alto =120;

var buttons = [['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0']];


var word_list = ["house",
                 "want",
                 "nonbenevolence",];

var specialword = "";
var word_pdef = "helo";
var previous_synsetid = "pnull";

var pdef_tick = 0;

word_listpage = 0;
word_listpage_size = 0;

actual_testid = 0;

var wordsxsenses = "";

//var lang_answer = "eng_def";
var lang_answer = "spa";
	
senses_grid = [ [],[],[],[],[] ];

var big = "";
if(screen.width > 330)
	big="Big";


function round(n){
	return Math.ceil(n);
}


function init()
{
	//db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);

	
	
	//document.getElementById("welcome").innerHTML = " "+screen.width+" "+screen.height;
}


// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
    
    var db = window.sqlitePlugin.openDatabase({name: "new_lexitree"})
    $(document).delegate("#pinit", "pageshow", function() {
        load_words();
    });
    
    $(document).delegate("#pgrid", "pageshow", function() {
    	load_words(function(){load_grid();});
    });
    
	//load_words();
    alto = $(document).height();
    load_words();
    
    //load_pinit();
	//load_grid();
}


/*		*/

/*//Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: "DB"});
  // ...
}

$('#index').live('pagebeforeshow',function(e,data){
    $('input[type="checkbox"]').each(function(){
        ($(this).is(':checked')) ? $(this).parent().parent().addClass('checked') : $(this).parent().parent().addClass('not-checked');
    });
});

*/


$(document).ready(function() {
//$('#pinit').bind('pageinit',function(){
	
	
	//------------------------ pinit -----------------------------------
                  
	$('#word_list').on('vclick','.pinit_back' , function() {
		 
    	word_listpage--;
    	load_pinit();
    	return false;
	});
	
	$('#word_list').on('vclick','.pinit_next' , function() { 
		 
    	word_listpage++;
    	load_pinit(); 	
    	
    	return false;
	});
	
	$('#word_list').on('vclick','.word_pinit' , function() { 
		
		load_pdef($(this).attr('id'));
    	return false;
	});
	
	
	//--------------------pdef & pinit---------------------
	
	$('#word_search').on('vclick' , function() { 
		
		var word = document.getElementById('word_search_box').value;
		previous_synsetid = "pnull";
		load_pdef(word);
    	return false;
	});
	
	$('#word_search_pdef').on('vclick' , function() { 
		
		var word = document.getElementById('word_search_box_pdef').value;
		previous_synsetid = "pnull";
		load_pdef(word);
    	return false;
	});
	
	//----------------------pgrid---------------------------
	
    $('#btn_ptest').on('touchstart', function() { 
    	
    	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
    		if( wordsxsenses.any(function(x) {return x.selected == 1}) ){
	    		new Test(function(){
	    			init_test();
		        	$.mobile.changePage( "index.html#ptest", { transition: "slide"} ); 
	        	}) ;
	        	  
    		}else
    			toast("Select word sets to make a test.");
    	});
    	return false;
 
    });

	//-----------------------pdef---------------------------
	

	$('#pdef_def').on('click' ,'.word_to_search_e', function() { 
		
		//alert('tosearch'+$(this).attr('id'));
		//alert("wordtserc:"+$(this).attr('psid'));
		special_word($(this).attr('id'),$(this).attr('psid'));
    	return false;
	});
	
	$('#pdef_def').on('click' ,'.word_to_search_c', function() { 
		
		//alert('tosearch'+$(this).attr('id'));
		special_word($(this).attr('id'),"pnull");
    	return false;
	});
	
	$('#pdef_def').on('vclick' ,'.tick_sense', function() { 
		
		var word = $(this).attr('word');
		var sense = $(this).attr('sense');
		toogle_sense(sense,word);
    	
		refresh_pdef(word);
		
		return false;
	});
	
	
	
	//----------------------ptest--------------------------
	
    $('#btn_op_a').on('vclick', function() { 
    	test_answer(0);
//    	 $.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
    	return false;
    });
    
    $('#btn_op_b').on('vclick', function() { 
    	test_answer(1);
//    	$.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
         return false;
    });
    
    $('#btn_op_c').on('vclick', function() { 
    	test_answer(2);
//    	$.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
         return false;
    });
    
    //-----------------------pok--------------------------------
    
    $('#pok_next').on('vclick', function(){ 
    	next_slide();
//    	$.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#ptest", { transition: "slide"} );
         return false;
    });
    
    
    //--------------------------???????--------------------------

    $('#btn_l1').on('vclick', function() { 
    	//load_words(function(){load_grid();});
        $.mobile.changePage( "index.html#pgrid", { transition: "slide"} );
        return false;
     });
    
    $('#edb').on('vclick', function() { 
    	
    	db.transaction(function(tx) {		
			tx.executeSql("delete from 'selected_senses';");
			tx.executeSql("delete from 'ans_sense_cases';");
			tx.executeSql("delete from 'test';");
			tx.executeSql("delete from 'subjects';");
			tx.executeSql("delete from 'subject_sets';");	
			load_words();
			$.mobile.changePage( "index.html#pinit", { transition: "slide"} );
	    	//alert("empty data base");
    	});
    	return false;
     });
    
    $('#back_init').on('vclick', function() { 
    	$( '#popup_option' ).popup( 'open', { transition: "fade" } ); 
         return false;
    });
    $('#back_init2').on('vclick', function() { 
    	$( '#popup_option2' ).popup( 'open', { transition: "fade" } ); 
        return false;
    });
    $('#back_init3').on('vclick', function() { 
    	$.mobile.changePage( "index.html#pinit", { transition: "slide"} );
         return false;
    });
});


var toast=function(msg){
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
	.css({ display: "block", 
		opacity: 0.90, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "270px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/5 })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}

