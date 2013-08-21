
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
	if( word_listpage == 0)
		offset = 0;
	var line = '';
	var psize = word_listpage_size;
	for(var i=0; i<(word_listpage_size-1); i++){
		
		if (i==0){
				if ( word_listpage == 0){
					line = '<div class="ui-block-'+abc(i)+'"> <button class="word_pinit" id="'+word_list[0]+'" data-mini="true" data-theme="d" >'+word_list[0]+'</button></div>';
				}else{
					line = '<div class="ui-block-'+abc(i)+'"> <button class="pinit_back" id="back_wlist" data-mini="true" data-theme="b" data-icon="arrow-l"  data-iconpos="left">...</button></div>';
				}
		}else{
			j = i;// - offset;
			word_i = j+word_listpage*(word_listpage_size-2)+1;
			
			if(word_list[word_i]!=undefined)
				line = line + '<div class="ui-block-'+abc(i)+'"> <button class="word_pinit" id="'+word_list[word_i]+'" data-mini="true" data-theme="d" >'+word_list[word_i]+'</button></div>';
		}
	}
	if( word_list.length > (word_listpage + 1 )*(word_listpage_size -2 )+ 1 )
		line = line + '<div class="ui-block-'+abc(i)+'"> <button class="pinit_next" id="pinit_next" data-mini="true" data-theme="b" data-icon="arrow-r"  data-iconpos="right">...</button></div>';
	
	document.getElementById("word_list").innerHTML = line ;//""+test.current_slide;
	$('.ui-page-active').page("destroy").page();
}








$('#index').live('pagebeforeshow',function(e,data){
    $('input[type="checkbox"]').each(function(){
        ($(this).is(':checked')) ? $(this).parent().parent().addClass('checked') : $(this).parent().parent().addClass('not-checked');
    });
});

$('.checkBoxLeft').bind('click', function(e) {
    if($(this).find('input[type="checkbox"]').is(':checked')){
       $(this).removeClass('checked').addClass('not-checked'); 
       $(this).find('input[type="checkbox"]').attr('checked' , false);
    } else {
       $(this).removeClass('not-checked').addClass('checked');             
       $(this).find('input[type="checkbox"]').attr('checked' , true);
    }
});
    
    



function load_pinit(){

	word_listpage_size = Math.floor( (alto-160)/40)*3;
	var pages= Math.floor( (word_list.length/19));
	refresh_pinit();
}
