/*

document.addEventListener("deviceready", function onDeviceReady() {
                          alert('Javascript OK');
                          }, false);
*/
// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//


	
var db = "";


var test = new test( [ new wordset('swift','bird',['dog','ape','mamal']) ,
                       new wordset('prison','place',['lake','river','book']) ,
                       new wordset('job','work',['sentence','escape','pain'])
					] , 30 ) ;

var grid = new level_grid([65,5,4,0,24]);
var alto =120;

var buttons = [['0','1','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0']];
var word_list = ["house",
                 "want",
                 "nonbenevolence",
                 "nonfanatical","tinplate","presupplication","displaced","sorrier","loculus","centibar","convinced","upswell","prober","punty","qualifyingly","elector","graves","kipnis","liddie","undetained","zaragoza",
                
                 "presa","cyanic","eyetooth","sandman","inofficiousness",
                 "pinner","plastometric","bargelli","browning","constrainingly","testament","figurate","gelatinizer","glutting",
                "keeley","kneel","lithically","ludhiana",
                "beeves",
                
                "prefabricate","pussy","diatomaceous","finialed","unenlivening","unrefunding","recapitulating","veritas","crushingly","saltier","sorry","stingy","gettable",
                "judicialness","meconium","snatchable","unweeping","recalculate",
                "unfugitive",
                
                "hidalgism","blotchier","durion","toluca","wurst","intellectualization","natal","carthage","brattishing","wright","unlivableness","pulverising","gracility","ecthlipsis","silliness","overfold","tagus",
                
                "impinged",
                
                "them","kayak","poikiloblast","oxter","sanforise","timoshenko","superallowance","reinduced","overtheorization","fifo","sinistrad","ambage","weighty","chrismatory","delimitation","chron","odontiasis","ophelia","gamekeeping","licetus","accusal","lienal","eunomus","whites","phrenetic","uncomputableness","objectivistic","depersonalised","induplicated","uninterchangeable","unabject","sedately","sniffer","brachycardia","foundling","diarchic","kindredship","artifact","dilate","prepurposed","legazpi","cloot","skipdent","vantage","alyssum","depreciated","compositeness","detrital","vetchling","nonpurchase","superconductivity","fireman","nasal","callipus","lasker","unfilched","lithophyte","revet","rewrite","mewar","pangolin","descension","pedanthood","ahasuerus","unrescinded","barretter","nga","biannual"
                ];


word_list.page = 0;

var big = "";
if(screen.width > 330)
	big="Big";

function round(n){
	return Math.ceil(n);
}

function load_pdef(def){

	refresh_pdef(def);
	
}

function refresh_pdef(word){

	if(word=="" || word==undefined )
		return;
	var def= "error";
	
	db2 = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);

    db2.transaction(function(tx) {
    	tx.executeSql("SELECT lemma,pos,sensenum,synsetid,definition,sampleset  FROM dict WHERE lemma = '"+word+"' ORDER BY pos,sensenum;", [], function(tx, res) {
         //alert("res.rows.length: " + res.rows.length + " -- should be 1");

	        if( res.rows.length == 0 ){
	        	alert(word+": not found");
	        	return;
	        }
	        def = '';
	        for(var i=0 ; i<res.rows.length ; i++){
	        
	        	def +=  "<li>"+res.rows.item(i).definition+"</li>";
	        	
	        }
	        
    		document.getElementById("pdef_def").innerHTML = def;
    		document.getElementById("pdef_word").innerHTML = word;
    		 $.mobile.changePage( "index.html#pdef", { transition: "slide"} );
         });
       });

}


function init()
{
	db = window.sqlitePlugin.openDatabase("new_lexitree", "1.0", "new_lexitree.db", -1);
	alert("dbisready-android!");  
	init_test();
    alto = $(document).height();
	load_pinit();
	load_grid();
	
	
	//document.getElementById("welcome").innerHTML = " "+screen.width+" "+screen.height;
}

/*		*/

/*//Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: "DB"});
  // ...
}*/

$(document).ready(function() {

             
                  
	$('#word_list').on('vclick','.pinit_back' , function() {
		 
    	word_list.page--;
    	load_pinit();
    	return false;
	});
	
	$('#word_list').on('vclick','.pinit_next' , function() { 
		 
    	word_list.page++;
    	load_pinit(); 	
    	
    	return false;
	});
	
	$('#word_list').on('vclick','.word_pinit' , function() { 
		 
    	load_pdef($(this).attr('id'));
    	return false;
	});
	
	$('#word_search').on('vclick' , function() { 
		
		var word = document.getElementById('word_search_box').value;
		alert("searching:"+word);
		load_pdef(word);
    	document.getElementById('');
    	return false;
	});
	
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
    
    $('#back_init').on('vclick', function() { 
    	$.mobile.changePage( "index.html#pinit", { transition: "slide"} );
         return false;
    });
    $('#back_init2').on('vclick', function() { 
    	$.mobile.changePage( "index.html#pinit", { transition: "slide"} );
         return false;
    });
        
});


