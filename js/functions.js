$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Ленивая загрузка
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select').niceSelect()

	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function() {
    	$(this).closest('.line').find('.input, textarea').focus()
	})

	// Если поле не пустое, скрывает label
	$('body').on('blur', '.form .input, .form textarea', function() {
    	if( $(this).val() != '' ){
    		$(this).addClass('active')
    	} else {
    		$(this).removeClass('active')
    	}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let minimum = parseFloat( input.data('minimum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal > minimum ){
	    	input.val( inputVal-step+unit )
	    }
	})

	$('body').on('click', '.amount .plus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let maximum = parseFloat( input.data('maximum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal < maximum ){
	    	input.val( inputVal+step+unit )
	    }
	})


	// Табы
	$('body').on('click', '.tabs button', function(e) {
		e.preventDefault()

	    if( !$(this).hasClass('active') ) {
	    	let parent = $(this).closest('.tabs_container')
		    let activeTab = $(this).data('content')
        	let level = $(this).data('level')

		    parent.find('.tabs:first').find('button').removeClass('active')
		    parent.find('.tab_content.' + level).removeClass('active')

		    $(this).addClass('active')
		    $(activeTab).addClass('active')
	    }
	})


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    let modalId = $(this).data('modal-id')

	    if( $(this).hasClass('active') ){
	        $(this).removeClass('active')
	      	$('.mini_modal').removeClass('active')

	        firstClick = false

			if( is_touch_device() ){
				$('body').css('cursor', 'default')
			}
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).addClass('active')

	        $('.mini_modal').removeClass('active')
	        $(modalId).addClass('active')

	        firstClick = true

			if( is_touch_device() ){
				$('body').css('cursor', 'pointer')
			}
	    }
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function(e){
	    if ( !firstClick && $(e.target).closest('.mini_modal').length == 0 ){
	        $('.mini_modal, .mini_modal_link').removeClass('active')

			if( is_touch_device() ){
				$('body').css('cursor', 'default')
			}
	    }

	    firstClick = false
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('body').on('click', '.mini_modal .close', function(e) {
	    e.preventDefault()

	    $('.mini_modal, .mini_modal_link').removeClass('active')

	    if( is_touch_device() ){
			$('body').css('cursor', 'default')
		}

	    firstClick = false
	})


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.touch = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en' : {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}

	// Всплывающие окна
	$('body').on('click', '.modal_link', function(e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src  : $(this).data('content'),
			type : 'inline',
			afterShow: function(){
				// Кастомный скролл
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
				    	wheelStep: 10
				    })
				})
			}
		})
	})

	// Закрытие всплывающего окна по произвольной кнопке
	$('body').on('click', '.modal .close', function(e) {
		e.preventDefault()

		$.fancybox.close(true)
	})

	// Увеличение картинки
	$('.fancy_img').fancybox()


	// Плавная прокрутка к якорю
	// Работает и при прокрутке к табу
	$('body').on('click', '.scroll_link', function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')
		let addOffset = 20

		if( $(this).data('offset') ) {
			addOffset = $(this).data('offset')
		}

		if( $('.tabs button[data-content='+ href +']').length ) {
			let activeTab = $('.tabs button[data-content='+ href +']')
			let parent = activeTab.closest('.tabs_container')

			parent.find('> .tabs button').removeClass('active')
			parent.find('> .tab_content').removeClass('active')

			activeTab.addClass('active')
			$(href).addClass('active')
		}

		$('html, body').stop().animate({
		   	scrollTop: $(href).offset().top - addOffset
		}, 1000)
	})


	// Моб. меню
	$('body').on('click', '.mob_header .mob_menu_link', function(e) {
    	e.preventDefault()

		$(this).addClass('active')
		$('body').addClass('lock')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
    })

	$('body').on('click', 'header .close, .overlay', function(e) {
    	e.preventDefault()

    	$('.mob_header .mob_menu_link').removeClass('active')
		$('body').removeClass('lock')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
    })


    if( is_touch_device() ){
    	$('header .cats .item > a.sub_link').addClass('touch_link')

    	$('body').on('click', 'header .cats .item > a.sub_link', function(e) {
    		e.preventDefault()

    		if( $(this).hasClass('active') ) {
				$(this).removeClass('active').next().removeClass('show')
			} else {
				$('header .cats .item > a.sub_link').removeClass('active')
				$('header .cats .sub_cats').slideUp(300)

				$(this).addClass('active').next().addClass('show')
			}
	    })
    }
})



// Вспомогательные функции
function setHeight(className){
    let maxheight = 0
    let object = $(className)

    object.each(function() {
    	let elHeight = $(this).innerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    object.innerHeight( maxheight )
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}