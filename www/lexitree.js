
var test = new test( [ new wordset('swift','bird',['dog','ape','mamal']) ,
                       new wordset('prison','place',['lake','river','book']) ,
                       new wordset('job','work',['sentence','escape','pain'])
					] , 30 ) ;

var grid = new level_grid([25,40,10,5,30]);

var buttons = [['0','1','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0'],['0','0','0','0','0','0','0']];
var word_list = ["jollity",
                 "letty",
                 "nonbenevolence",
                 "nonfanatical","tinplate","presupplication","displaced","sorrier","loculus","centibar","convinced","upswell","prober","punty","qualifyingly","elector","graves","kipnis","liddie","undetained","zaragoza",
                
                 "presa","cyanic","eyetooth","sandman","inofficiousness",
                 "pinner","plastometric","bargelli","browning","constrainingly","testament","figurate","gelatinizer","glutting",
                "keeley","kneel","lithically","ludhiana",
                
                "beeves","prefabricate","pussy","diatomaceous","finialed","unenlivening","unrefunding","recapitulating","veritas","crushingly","saltier","sorry","stingy","gettable",
                "judicialness","meconium","snatchable","unweeping","recalculate",
                
                "unfugitive","hidalgism","blotchier","durion","toluca","wurst","intellectualization","natal","carthage","brattishing","wright","unlivableness","pulverising","gracility","ecthlipsis","silliness","overfold","tagus","impinged",
                
                "them","kayak","poikiloblast","oxter","sanforise","timoshenko","superallowance","reinduced","overtheorization","fifo","sinistrad","ambage","weighty","chrismatory","delimitation","chron","odontiasis","ophelia","gamekeeping","licetus","accusal","lienal","eunomus","whites","phrenetic","uncomputableness","objectivistic","depersonalised","induplicated","uninterchangeable","unabject","sedately","sniffer","brachycardia","foundling","diarchic","kindredship","artifact","dilate","prepurposed","legazpi","cloot","skipdent","vantage","alyssum","depreciated","compositeness","detrital","vetchling","nonpurchase","superconductivity","fireman","nasal","callipus","lasker","unfilched","lithophyte","revet","rewrite","mewar","pangolin","descension","pedanthood","ahasuerus","unrescinded","barretter","nga","biannual","slakeless","perigonia","actinobacillosis","posen","extinctive","distorter","ringwood","liftman"  
                
                
                ];


word_list.page = 0;



function round(n){
	return Math.round(n);
}

function abc(n){
	var id = n%3
	
	switch(id){
	case 0:
		return 'a';
		break;
	case 1:
		return 'b';
		break;
	case 2:
		return 'c';
		break;
	}
	
	console.log("error abc()");
}

function refresh_pinit(){
	var offset = 1;
	if( word_list.page == 0)
		offset = 0;
	var line = '';
	
	for(var i=0; i<20; i++){
		
		if (i==0){
				if ( word_list.page == 0){
					line = '<div class="ui-block-'+abc(i)+'"> <button class="word_pinit" id="'+i+'" data-mini="true" data-theme="d" >'+word_list[0]+'</button></div>';
				}else{
					line = '<div class="ui-block-'+abc(i)+'"> <button class="pinit_back" id="back_wlist" data-mini="true" data-theme="b" data-icon="arrow-l"  data-iconpos="left">...</button></div>';
				}
		}else{
			j = i - offset;
			word_i = j+word_list.page*(word_list.page_size-2)+1;
			
			line = line + '<div class="ui-block-'+abc(i)+'"> <button class="word_pinit" id="'+j+'" data-mini="true" data-theme="d" >'+word_list[word_i]+'</button></div>';
		}
	}
	var p= word_list.page*word_list.page_size + i + 1 ;
	var q= word_list.length;
	
	if( word_list.length > (word_list.page + 1 )*(word_list.page_size -2 )+ 1 )
		line = line + '<div class="ui-block-'+abc(i)+'"> <button class="pinit_next" id="pinit_next" data-mini="true" data-theme="b" data-icon="arrow-r"  data-iconpos="right">...</button></div>';
	
	document.getElementById("word_list").innerHTML = line ;//""+test.current_slide;
	$('.ui-page-active').page("destroy").page();
}


function load_pinit(){
	word_list.page_size = 21;
	var pages= Math.floor( (word_list.length/19));
	refresh_pinit();
	
	
	
	
	
}

function init()
{
	init_test();
	load_pinit();
	load_grid();
}

/*		*/

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


