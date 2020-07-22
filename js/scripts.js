$(function(){
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000
	})


	// Карусель товаров
	$('.products .slider').owlCarousel({
		nav: true,
		dots: false,
		loop: true,
		smartSpeed: 500,
		responsive: {
	        0:{
	            items: 1,
	            margin: 15
	        },
	        480:{
	            items: 2,
	            margin: 15
	        },
	        768:{
	            items: 3,
	            margin: 15
	        },
	        1240:{
	            items: 4,
	            margin: 10
	        }
		},
		onInitialized: function(event){
			setHeight($(event.target).find('.product .name'))
		},
		onResized: function(event){
			$(event.target).find('.product .name').height('auto')

			setHeight($(event.target).find('.product .name'))
		}
	})


	// Карточка товара
	$product_info = $('.product_info .images .big .slider').owlCarousel({
		items: 1,
		margin: 20,
		loop: false,
		smartSpeed: 500,
		nav: true,
		dots: false,
	    onTranslate: function(event){
	    	$('.product_info .images .thumbs .slide > *').removeClass('active')
	    	$('.product_info .images .thumbs .slide:eq('+ event.item.index +') > *').addClass('active')
	    }
	})

	$('.product_info .images .thumbs .slider').bxSlider({
		mode: 'vertical',
		infiniteLoop: false,
		speed: 400,
		slideMargin: 4,
		minSlides: 5,
		maxSlides: 5,
		moveSlides: 1,
		pager: false
	})

	$('.product_info .images .thumbs .slide > *').click(function(e) {
		e.preventDefault()

		$('.product_info .images .thumbs .slide > *').removeClass('active')

	    $product_info.trigger('to.owl.carousel', $(this).data('slide-index'))

	    $(this).addClass('active')
	})


	// Кастомный скролл
	$('.shops.block .custom_scroll').each(function(){
		$(this).slimScroll({
	        height: $(this).innerHeight(),
	        position: 'right',
		    railVisible: true,
		    alwaysVisible: true,
		    color: '#005c8b',
	    	size: '4px',
	    	distance: '15px',
	    	railColor: '#f5f5f5',
	    	railOpacity: 1,
	    	wheelStep: 25,
	    	allowPageScroll: true
	    })
	})

	$('.modal .custom_scroll').each(function(){
		$(this).slimScroll({
	        height: $(this).innerHeight(),
	        position: 'right',
		    railVisible: true,
		    alwaysVisible: true,
		    color: '#005c8b',
	    	size: '4px',
	    	distance: '0',
	    	railColor: '#f5f5f5',
	    	railOpacity: 1,
	    	wheelStep: 25,
	    	allowPageScroll: true
	    })
	})


	// Фильтр
	$('.filter #price_range').ionRangeSlider({
        type     : 'double',
        min      : 0,
        max      : 400000,
        from     : 20000,
        to       : 284980,
        step     : 10,
        postfix  : '<span>руб</span>'
    })


    $priceRange = $('.products_head #price_range').ionRangeSlider({
        type     : 'double',
        min      : 0,
        max      : 400000,
        from     : 20000,
        to       : 284980,
        step     : 10,
        postfix  : '<span>руб</span>',
        onChange : function (data) {
            $('.products_head .price_range input.from').val( data.from.toLocaleString() + ' руб' )
            $('.products_head .price_range input.to').val( data.to.toLocaleString() + ' руб' )
        }
    }).data("ionRangeSlider")

    $('.products_head .price_range .input').keyup(function() {
        $priceRange.update({
            from : parseInt( $('.products_head .price_range input.from').val().replace(/\s+/g, '') ),
            to : parseInt( $('.products_head .price_range input.to').val().replace(/\s+/g, '') )
        })
    })


    $priceRange = $('.cat_filter #price_range').ionRangeSlider({
        type     : 'double',
        min      : 0,
        max      : 400000,
        from     : 20000,
        to       : 284980,
        step     : 10,
        postfix  : '<span>руб</span>',
        onChange : function (data) {
            $('.cat_filter .price_range input.from').val( data.from.toLocaleString() + ' руб' )
            $('.cat_filter .price_range input.to').val( data.to.toLocaleString() + ' руб' )
        }
    }).data("ionRangeSlider")

    $('.cat_filter .price_range .input').keyup(function() {
        $priceRange.update({
            from : parseInt( $('.cat_filter .price_range input.from').val().replace(/\s+/g, '') ),
            to : parseInt( $('.cat_filter .price_range input.to').val().replace(/\s+/g, '') )
        })
    })


    $('aside .cat_filter .name').click(function(e) {
		e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
    })


	$('body').on('click', 'aside .cat_filter .spoler_link', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.item')

	    if( $(this).hasClass('active') ) {
	    	$(this).removeClass('active')

	    	parent.find('.hide').slideUp(500)
	    } else {
	    	$(this).addClass('active')

	    	parent.find('.hide').slideDown(500)
	    }
	})


	$('aside .mob_filter_link, .category_info .mob_cats_link').click(function(e) {
		e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
    })


    // Боковая колонка
    $('aside .catalog a.sub_link').click(function(e) {
		e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
    })


    // Изменение вида отображения товаров
    if( $(window).width() < 1024 ) {
		$('.products .list').addClass('flex')
	    $('.products .list').removeClass('list')

	    $('.products .mob_slider:not(.owl-loaded)').addClass('owl-carousel').owlCarousel({
			nav: true,
			dots: false,
			loop: true,
			smartSpeed: 500,
			responsive: {
		        0:{
		            items: 1,
		            margin: 15
		        },
		        480:{
		            items: 2,
		            margin: 15
		        },
		        768:{
		            items: 3,
		            margin: 15
		        }
			},
			onInitialized: function(event){
				setTimeout(function(){
					setHeight($(event.target).find('.product .name'))
					setHeight($(event.target).find('.product .desc'))
				}, 200)
			},
			onResized: function(event){
				$(event.target).find('.product .name').height('auto')
				$(event.target).find('.product .desc').height('auto')

				setTimeout(function(){
					setHeight($(event.target).find('.product .name'))
					setHeight($(event.target).find('.product .desc'))
				}, 200)
			}
		})
	}


	// Моб. табы
	$('body').on('click', '.mob_tab_link', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.tabs_container')

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			parent.find('.mob_tab_link').removeClass('active')
			parent.find('.tab_content').slideUp(300)

			$(this).addClass('active').next().slideDown(300)

			$(this).next().find('.product .name').height('auto')
			$(this).next().find('.product .desc').height('auto')

			setTimeout(function(){
				setHeight($(this).next().find('.product .name'))
				setHeight($(this).next().find('.product .desc'))
			}, 200)
		}
	})


	// Изменение вида отображения товаров в категории
	$('.view .grid_link').click(function(e){
	    e.preventDefault()

	    $('.view > *').removeClass('active')
	    $(this).addClass('active')

	    $('.products .list').addClass('flex')
	    $('.products .list').removeClass('list')
	})

	$('.view .list_link').click(function(e){
	    e.preventDefault()

	    $('.view > *').removeClass('active')
	    $(this).addClass('active')

	    $('.products .flex').addClass('list')
	    $('.products .flex').removeClass('flex')
	})


	if( $(window).width() < 1242 ) {
		$('.content .products .list').addClass('flex')
	    $('.content .products .list').removeClass('list')
	}



	$.fancybox.open({
		src  : '#promo_modal',
		type : 'inline',
		afterLoad: function(){
			$('.fancybox-content .products .product .name').height('auto')
			$('.fancybox-content .products .slider').trigger('destroy.owl.carousel')

			$('.fancybox-content .products .slider').owlCarousel({
				nav: true,
				dots: false,
				loop: true,
				smartSpeed: 500,
				responsive: {
			        0:{
			            items: 1,
			            margin: 15
			        },
			        480:{
			            items: 2,
			            margin: 15
			        },
			        768:{
			            items: 3,
			            margin: 15
			        },
			        1024:{
			            items: 4,
			            margin: 15
			        }
				},
				onInitialized: function(event){
					setHeight($(event.target).find('.product .name'))
				},
				onResized: function(event){
					$(event.target).find('.product .name').height('auto')

					setHeight($(event.target).find('.product .name'))
				}
			})
		}
	})
})


$(window).resize(function(){
	// Изменение вида отображения товаров
	if( $(window).width() < 1024 ) {
		$('.products .list').addClass('flex')
	    $('.products .list').removeClass('list')

	    $('.products .mob_slider:not(.owl-loaded)').addClass('owl-carousel').owlCarousel({
			nav: true,
			dots: false,
			loop: true,
			smartSpeed: 500,
			responsive: {
		        0:{
		            items: 1,
		            margin: 15
		        },
		        480:{
		            items: 2,
		            margin: 15
		        },
		        768:{
		            items: 3,
		            margin: 15
		        }
			},
			onInitialized: function(event){
				setTimeout(function(){
					setHeight($(event.target).find('.product .name'))
					setHeight($(event.target).find('.product .desc'))
				}, 200)
			},
			onResized: function(event){
				$(event.target).find('.product .name').height('auto')
				$(event.target).find('.product .desc').height('auto')

				setTimeout(function(){
					setHeight($(event.target).find('.product .name'))
					setHeight($(event.target).find('.product .desc'))
				}, 200)
			}
		})
	}


	if( $(window).width() < 1242 ) {
		$('.content .products .list').addClass('flex')
	    $('.content .products .list').removeClass('list')
	}
})