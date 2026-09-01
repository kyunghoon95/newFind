function shuffleArr(array) { // 객체 랜덤으로 섞어주는 함수
	let currentIndex = array.length, randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}

function swieperRandomSlides(el){ // 스와이퍼 랜덤 함수
	var slides = $(el).find('.swiper-slide');
	shuffleArr(slides);
	$(el).find('.swiper-wrapper').empty().append(slides);
}

var resizeFinalEvent = (function(){ // resize 후 한번만 실행하는 함수
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

window.addEventListener('load', function(e){
	let vhFix = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vhFix}px`);
	window.addEventListener('resize', () => {
		let vhFix = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vhFix}px`);
	});
});

function accoAction(accoBtn){
	$(accoBtn).next().slideToggle(); //아코디언
	$(accoBtn).parent().toggleClass('on') //아코디언(웹툰형) 화살표 변경 
}

function moveTop(){
	$('html, body').animate({
		scrollTop:0
	}, 500);
}

function tagAction(tagBtn, slideW){
	var _slideW = $(slideW);
	var _this = $(tagBtn);
	_this.toggleClass('on').siblings().removeClass('on');
	if(_this.hasClass('on')){
		_slideW.slideDown(300);
		_slideW.find('.tag_slide_list li').removeClass('on').eq(_this.index()).addClass('on');
	} else {
		_slideW.slideUp(300);
	}
}

function gnbMenu(btn){
	btn.toggleClass('on').siblings('.gnb_menu_wrap').toggleClass('on');
	if(btn.hasClass('on')){
		$('#mainFullpage').css('pointer-events', 'none');
	} else {
		$('#mainFullpage').css('pointer-events', '');
	}
	if(window.innerHeight < 720 || !$('.wrap').hasClass('main_wrap')){
		if(btn.hasClass('on')){
			var posY = $(window).scrollTop();
			$('body').addClass('body_fixed').css('top', -posY);
		} else {
			var posTop = Math.abs(parseInt($('body').css('top')));
			$('body').removeClass('body_fixed').css('top', 0);
			$(window).scrollTop(posTop);
		}
	} else {
		if($('body').hasClass('body_fixed')){
			$('body').removeClass('body_fixed').css('top', 0);
		}
	}
}

var headerSetting = {
	menuList : [
		{
			title: '<span class="txt_blue02">해외여행</span> 2배로 즐기기',
			titleLink : './IFC-MA-01.html#pageSec02',
			list: [
				'<a href="./IFC-WT-01.html">지갑을 살찌우는 환전비법</a>',
				'<a href="./IFC-NM-14.html">설레는 해외여행 준비,<br>마무리는 은행에서 완벽하게</a>',
				'<a href="./IFC-NM-11.html">현금이 있으면 지갑이 든든!<br>미리 신고해야 진짜로 든든!</a>',
			]
		},
		{
			title: '<span class="txt_blue02">해외송금</span> 쉽고 빠르게!',
			titleLink : './IFC-MA-01.html#pageSec03',
			list: [
				'<a href="./IFC-NM-05.html">정말 EASY한 EZ로 해외송금하기</a>',
				'<a href="./IFC-NM-06.html">유학생송금은 거래외국환은행 지정부터!</a>',
				'<a href="./IFC-NM-07.html">그때 그때 꼭 맞는 해외송금 서비스 찾기</a>',
				'<a href="./IFC-NM-09.html">외화 송금받을 때 이것만은 알아두세요!</a>',
			]
		},
		{
			title: '<span class="txt_blue02">환테크,</span> 어디까지 해봤니?',
			titleLink : './IFC-MA-01.html#pageSec04',
			list: [
				'<a href="./IFC-NM-04.html">달러, 해외 나갈 때만 사는 건가요?</a>',
				'<a href="./IFC-WT-02.html">하나 밀리언달러 통장으로 <br>해외주식 100만배 즐기기</a>',
				'<a href="./IFC-WT-03.html">해외직구할때 수수료가 0원!<br>비법이 궁금하세요?</a>',
			]
		},
		{
			title: '<span class="txt_blue02">은행 업무</span> 간편하게 정복하기!',
			titleLink : './IFC-MA-01.html#pageSec05',
			list: [
				'<a href="./IFC-NM-08.html">거래외국환은행 지정, 나도 해야 할까?</a>',
				'<a href="./IFC-NM-13.html">유튜버의 필수품 \'외화통장\'</a>',
				'<a href="./IFC-NM-12.html">외화 ‘현찰 수수료’ 넌 누구니?</a>',
				'<a href="./IFC-NM-10.html">외화이체, 해외은행 말고<br>국내 은행끼리 하기</a>',
			]
		}
	],
	menuListSet : function(ul, onNum){
		var ulEl = $(ul);
		var menuLi = '';
		for(var i = 0; headerSetting.menuList.length > i; i++){
			menuLi += '<li class="on">';
			menuLi += '	<div class="gnb_depth1_tit_w">';
			menuLi += '		<a href="' + headerSetting.menuList[i].titleLink + '" class="gnb_depth1_tit" onclick="gnbMenu($(this).parents(\'.gnb_menu_wrap\').siblings(\'.btn_gnb_menu\'))">' + headerSetting.menuList[i].title + '</a>';
			menuLi += '		<button type="button" class="btn_arr"></button>';
			menuLi += '	</div>';
			menuLi += '	<div class="gnb_depth2_w">';
			menuLi += '		<ul class="gnb_depth2_list">';
				for(var j = 0; headerSetting.menuList[i].list.length > j; j++){
					menuLi += '<li>' + headerSetting.menuList[i].list[j] + '</li>';
				}
			menuLi += '		</ul>';
			menuLi += '	</div>';
			menuLi += '</li>';
		}
		ulEl.append(menuLi);

		if(onNum != undefined){
			$('.gnb_depth2_list li').eq(onNum - 1).addClass('on').parents('li').siblings('li').removeClass('on').find('.gnb_depth2_w').hide(0);
		}
		$('.header').on('click', '.gnb_list_w .btn_arr', function(){
			$(this).parents('li').toggleClass('on').find('.gnb_depth2_w').slideToggle(300);
		});
	},
	subHeaderHtml : function(){
		var subHeaderHtml = '';
		subHeaderHtml += '<header class="header bg_white border_b_gray01">';
		subHeaderHtml += '	<h1 class="header_txt fs18">외환의 발견</h1>';
		subHeaderHtml += '	<a href="javascript:void(0);" class="btn_back" onclick="history.back()">뒤로가기</a>';
		subHeaderHtml += '	<a href="./IFC-MA-01.html" class="btn_home">홈</a>';
		subHeaderHtml += '	<button type="button" class="btn_gnb_menu" onclick="gnbMenu($(this));">';
		subHeaderHtml += '		<span class="bar"></span>';
		subHeaderHtml += '		<span class="bar"></span>';
		subHeaderHtml += '		<span class="bar"></span>';
		subHeaderHtml += '	</button>';
		subHeaderHtml += '	<div class="gnb_menu_wrap">';
		subHeaderHtml += '		<p class="p_t20 p_l20"><strong class="gnb_tit fs18 ff_kotra txt_blue01">외환의 발견</strong></p>';
		subHeaderHtml += '		<div class="gnb_list_w">';
		subHeaderHtml += '			<ul class="gnb_depth1_list">';
		subHeaderHtml += '			</ul>';
		subHeaderHtml += '		</div>';
		subHeaderHtml += '	</div>';
		subHeaderHtml += '</header>';
		document.write(subHeaderHtml);
	},
	subHeaderSet : function(ul, onNum){
		headerSetting.subHeaderHtml();
		headerSetting.menuListSet(ul, onNum);
	}
}
