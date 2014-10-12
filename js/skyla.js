$(document).ready(function () {
//PAGES nav
	$title = $('.main h2').html();
	$('li a:contains(' + $title + ')').css('color', 'red');
	$('.thumbs > img:first-child').addClass('activeThumb');
	
	var navUl = $('li:contains(' + $title + ')').parent();
	if (! navUl.prev().is('#navigation')){
		navUl.prev().addClass('underline');
		navUl.toggle();
	}
	
	if (navUl.prev().is("#music-videos")) {
		$('#music-videos').parent().prev().addClass('underline');
		$('#music-videos').parent().toggle();
		$('#music-videos').css('color', 'red');
	}

	$('nav > ul > li, #music-videos').click(function(e){
		if ($(this).next().is('ul')){
			e.preventDefault();
			$(this).toggleClass('underline');
			$(this).next('ul').slideToggle();
		}
	});
	
//MOBILE nav
	$('#navigation').click(function(e){
		if ($('nav > ul').css('display') == 'none') {
			$('nav > ul').slideToggle();
		} else {
			$('nav > ul').attr('style', '');
		}
	});
	
		
//click thumbnail
	$('.thumbs > img').click(function(e){	flip($(this));	});
	
    $("body").keydown(function(e) {
      if(e.which == 37) { // left     
          $("#flip :first-child").trigger("click");
      }
      else if(e.which == 39) { // right     
          $("#flip :last-child").trigger("click");
      }		});

//click flip 
	$('#flip *').click(function(e){
		$oldSrc = $('.main > img').attr('src');
		if ($(this).is('p:first-child')) {  //prev arrow
			if ($('.thumbs > img[src=\''+$oldSrc+'\']').is('img:first-child')){
				flip($('.thumbs > img:last-child'));
			} else {		
				flip($('.thumbs > img[src=\''+$oldSrc+'\']').prev());
			}
		}
		else {	//next arrow
			if ($('.thumbs > img[src=\''+$oldSrc+'\']').is('img:last-child')){
				flip($('.thumbs > img:first-child'));
			} else {		
				flip($('.thumbs > img[src=\''+$oldSrc+'\']').next());
			} 
		}
	});
	function flip(image) {
		$('.main > img').attr('src',image.attr('src'));
		changeAttr(image, 'alt');
		changeAttr(image, 'title');
		emphThumb(image);
		if ($('.main').hasClass('resize')) resizeMain(image);
		scroll();
	}
	function changeAttr(img, att) {
		switch(att) {
			case 'alt': target = 'h5'; break;
			case 'title': target = 'p'; break;
			default: target = att; 
		} 
		if (typeof img.attr(att) == 'undefined' || img.attr(att) == false) {
			$('.main > ' + target).html('');
		} else {
			$('.main > ' + target).html(img.attr(att));
		}
		if ($('h5').is(':empty')) $('.thumbs').css('padding-top','10px');
		else $('.thumbs').css('padding-top','0');
	}
	function emphThumb(img) {
		$('.thumbs > img').each(function( i ){
			$(this).removeClass();
		});
		$(img).addClass('activeThumb');
	}
  	function scroll() {
        if ($('.main > h2').html() == 'Canon') {
            $('html, body').animate({scrollTop:$('.main > img').offset().top -5}, 'fast');
        } else {
            $('html, body').animate({scrollTop:$('.main').offset().top - 10}, 'fast');
        }
  	}
	function addUnderline($section) {
		$($section.toggleClass('underline'));
	}


// Resize functions 
	function resizeMain(image) {
		var w = imgRealSize(image);
		$('.main').css('max-width', w + 'px');
	}
	function imgRealSize(img) {
		var $img = $(img);
		if ($img.prop('naturalWidth') == undefined) {
			var $tmpImg = $('<img/>').attr('src', $img.attr('src'));
			$img.prop('naturalWidth', $tmpImg[0].width);
		}
		return $img.prop('naturalWidth')
	}//thanks 'Richard' from comments at css-tricks.com/snippets/jquery/get-an-images-native-width/#comment-117242
});

