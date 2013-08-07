
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
	
	for(var i=0; i<(word_list.page_size-1); i++){
		
		if (i==0){
				if ( word_list.page == 0){
					line = '<div class="ui-block-'+abc(i)+'"> <button class="word_pinit" id="'+i+'" data-mini="true" data-theme="d" >'+word_list[0]+'</button></div>';
				}else{
					line = '<div class="ui-block-'+abc(i)+'"> <button class="pinit_back" id="back_wlist" data-mini="true" data-theme="b" data-icon="arrow-l"  data-iconpos="left">...</button></div>';
				}
		}else{
			j = i;// - offset;
			word_i = j+word_list.page*(word_list.page_size-2)+1;
			
			if(word_list[word_i]!=undefined)
				line = line + '<div class="ui-block-'+abc(i)+'"> <button class="word_pinit" id="'+word_list[word_i]+'" data-mini="true" data-theme="d" >'+word_list[word_i]+'</button></div>';
		}
	}
	if( word_list.length > (word_list.page + 1 )*(word_list.page_size -2 )+ 1 )
		line = line + '<div class="ui-block-'+abc(i)+'"> <button class="pinit_next" id="pinit_next" data-mini="true" data-theme="b" data-icon="arrow-r"  data-iconpos="right">...</button></div>';
	
	document.getElementById("word_list").innerHTML = line ;//""+test.current_slide;
	$('.ui-page-active').page("destroy").page();
}


function load_pinit(){
	word_list.page_size = Math.floor( ($(window).height()-160)/40)*3;
	var pages= Math.floor( (word_list.length/19));
	refresh_pinit();
}
