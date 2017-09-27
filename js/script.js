


console.log('Hi! 朋友，感谢您愿意调试简历代码。\n本简历目前还在开发中暂时不作介绍。')
$(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 16 + 'px';
	window.onresize = function() {
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 16 + 'px';
	}
	/*if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {  
	    bodyTag = document.getElementsByTagName('body')[0];  
	    bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';  
	}  
	setTimeout(function() {  
	    window.scrollTo(0, 1)  
	}, 0);*/
	/* a链接*/
	/*$(document).on($('a'),'click',function(event){
		event.preventDefault();    
	})*/
	document.querySelector('body').addEventListener('touchmove', function (ev) {
	    console.log('滑了')
	    event.preventDefault();
	});
	var obj={};
	obj.y=0;//旋转deg
	obj.h=0;//屏幕高
	obj.fontsize=0;
	obj.index=0;
	//设置高
	
	obj.h=document.body.clientheight ||document.documentElement.clientHeight;
	obj.w=document.body.clientWidth ||document.documentElement.clientWidth;
	obj.fontsize=parseFloat($('html').css('fontSize'))
	console.log((innerHeight)+'px',obj.h)
	if(obj.w<700){
		$('.content').css({'height':(innerHeight-4*obj.fontsize)+'px',"width":innerWidth});
		var aLi=nav.getElementsByTagName('div');
		// ?????????????????????????
	}else{
		$('.content').css({'height':(innerHeight-80)+'px',"width":innerWidth});
		var aLi=nav.getElementsByTagName('li');
	}
	//(obj.h-4*obj.fontsize)
	
	//三角
	setInterval(function(){
		$('.positionsanjiao').animate({'bottom':'50px','opacity':'0'},990,function(){
			$('.positionsanjiao').css({'bottom':'10px','opacity':'1'})
		})
	},1000);
	//渐变Tab
	$('.bggyw3 ul li span').click(function(){
		$(this).addClass('active').parent().siblings().find('span').removeClass('active');
		//console.log()
		$('.gradient div').fadeOut(800,function(){	
			}).eq($(this).parent().index()).fadeIn(800);
		})
	//rotete
	
	$('.rotateprev').click(function(){
		obj.y+=90;
		$('#rotate').css({'transform':'perspective(800px) rotateY('+obj.y+'deg)'})
	});
	$('.rotatenext').click(function(){
		obj.y-=90;
		$('#rotate').css({'transform':'perspective(800px) rotateY('+obj.y+'deg)'})
	})
	//nav
	obj.arr=['首页','关于我','技能栈','经历','作品','联系我'];
	var forli='';
	for(var i=0;i<obj.arr.length;i++){
		if(i==0){
			forli+='<div class="color">'+obj.arr[i]+'</div>';
		}else{
			forli+='<div>'+obj.arr[i]+'</div>';
		}
	}
//	$('#nav').append(forli);
	//nav.show.hide
	$('.heade-right a').click(function(){
		if($('.nav').css('display')=='none'){
			$('.nav').fadeIn(500);
			$('#navsan').css({'transform':'rotate(0deg)'})
		}else{
			$('.nav').fadeOut(500);
			$('#navsan').css({'transform':'rotate(180deg)'})
		}
	})
	
	/*4.13完结*/
	var B={
		oldY:0,
		needY:0,
		index:0
	};
	
	var innerH=innerHeight;//-6*obj.fontsize
	var arr=[];
	var t=null;
	box.style.height=6*innerHeight+'px';
	box.style.top=-innerH+'px';
	//var hhh=innerH+6*obj.fontsize
	var aDiv=document.getElementsByClassName('content');
	
	for(var i=0;i<aDiv.length;i++){
		aDiv[i].style.transform='translateY('+i*innerH+'px)';
		arr.push(i*innerH);
	}
	var oldY=0,needY=0,index=0,n=1,zou=0;
	document.addEventListener('touchstart',function(e){
		oldY=e.touches[0].clientY;
		needY=0;
	},false)
	document.addEventListener('touchmove',function(e){
		needY=e.touches[0].clientY-oldY
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].style.transition='0s';
			aDiv[i].style.transform='translateY('+(needY+arr[i])+'px)'
		}
	},false)
	function zouni (){
			index--;
			if(index==-1){
				index=5;
			};
			arr.push(arr.shift())
			for(var i=0;i<aDiv.length;i++){
				aLi[i].className='';
				if(arr[i]==0){
					aDiv[i].style.transition='0s';
				}else{
					aDiv[i].style.transition='0.3s';
				}
				aDiv[i].style.transform='translateY('+(arr[i])+'px)'
			}
			aLi[index].className='color';
			$('.heade-right i').text(obj.arr[index]);
			//console.log(arr)
		}
	function laiba(){
		index++;
			if(index==6){
				index=0;
			}
			arr.unshift(arr.pop())
			for(var i=0;i<aDiv.length;i++){
				aLi[i].className='';
				if(arr[i]==960){
					aDiv[i].style.transition='0s';
				}else{
					aDiv[i].style.transition='0.3s';
				}
				aDiv[i].style.transform='translateY('+(arr[i])+'px)'
			}
			//console.log(index)
			//console.log(aLi)
			aLi[index].className='color';
			$('.heade-right i').text(obj.arr[index]);
	}
	document.addEventListener('touchend',function(){
		if(needY>30){
			zouni();
		}else if(needY<-30){
			laiba();
			//console.log(arr)
		}else{
			for(var i=0;i<aDiv.length;i++){
				aDiv[i].style.transition='0.3s';
				aDiv[i].style.transform='translateY('+(arr[i])+'px)'
			}
		}
	},false);
	//nav点击
	$('.nav div').click(function(){
		$(this).addClass('color').siblings().removeClass('color');
		$('.nav').fadeOut(500);
		$('#navsan').css({'transform':'rotate(180deg)'})
		$('.heade-right i').text($(this).text());
		obj.index=$(this).index()-1;
		console.log(obj.index)
		if(index<obj.index){
			for(var i=0;i<obj.index-index;i++){
				arr.unshift(arr.pop())
			}
		}else if(index>obj.index){
			for(var i=0;i<index-obj.index;i++){
				arr.push(arr.shift())
			}
		}
		index=obj.index
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].style.transition='0.3s';
			aDiv[i].style.transform='translateY('+arr[i]+'px)';
		}
		//console.log(arr)
		//aDiv[obj.index].style.transform='translateY('+arr[obj.index]+'px)';
	})
	/*PC轮播*/
	var flag=true;//开关
	addWheel(box, function (down){
		if(flag){
			flag=false;
			if (down){
				console.log('下');
				laiba();
			}else{
				console.log('上');
				zouni();
			}
			setTimeout(function(){
				flag=true;
			},500)
		}	
	});
	
	function addWheel(obj, fn){
		// 加事件
		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			// DOMMouseScroll
			obj.addEventListener('DOMMouseScroll', _wheel, false);
		}else{
			// onmousewheel IE chrome
			obj.onmousewheel=_wheel;
		}
		
		// 统一 down
		function _wheel(ev){
			var oEvent=ev || event;
			
			if (oEvent.wheelDelta){
				var down=oEvent.wheelDelta>0 ? false : true;
			}else{
				var down=oEvent.detail>0 ? true : false;
			}
			
			// 事件触发调用，down统一了
			fn(down);
		}
	}	
	/*PCnav点击*/
	$('.nav li').click(function(){
		$(this).addClass('color').siblings().removeClass('color');
		obj.index=$(this).index();
		//console.log(index)
		if(index<obj.index){
			for(var i=0;i<obj.index-index;i++){
				arr.unshift(arr.pop())
			}
		}else if(index>obj.index){
			for(var i=0;i<index-obj.index;i++){
				arr.push(arr.shift())
			}
		}
		index=obj.index
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].style.transition='0.3s';
			aDiv[i].style.transform='translateY('+arr[i]+'px)';
		}
	})
	
	
	
	
	
	/*chart*/
	var dom = echarts.init(document.getElementById("chart"));
	var asd=2500;//chart 线长短
	if(obj.w <= 700){
		asd=1000;
	}else{
		asd=3000;
	}
option = {
	tooltip: {
		show: false
	},
	legend: {
		x: "center",
		data: []
	},
	animation: false,
	series: [{
		categories: [{
			name: '家人',
			itemStyle: {
				normal: {
					color: "#009800",
				}
			}
		}, {
			name: '朋友',
			itemStyle: {
				normal: {
					color: "#4592FF",
				}
			}
		}],
		type: 'graph',
		layout: 'force',
		symbol: "circle",
		symbolSize: 50,
		roam: false, //禁止用鼠标滚轮缩小放大效果
		edgeSymbol: ['circle', 'arrow'],
		edgeSymbolSize: [0, 10],
		// 连接线上的文字
		focusNodeAdjacency: true, //划过只显示对应关系
		edgeLabel: {
			normal: {
				show: true,
				textStyle: {
					fontSize: 10
				},
				formatter: "{c}"
			}
		},
		categories: [{
			name: '家人ss',
			itemStyle: {
				normal: {
					color: "#009800",
				}
			}
		}, {
			name: '朋友dddd',
			itemStyle: {
				normal: {
					color: "#4592FF",
				}
			}
		}],
		lineStyle: {
			normal: {
				opacity: 1,
				width: 2,
				curveness: 0.5
			}
		},
		// 圆圈内的文字
		label: {
			normal: {
				show: true
			}
		},
		force: {
			repulsion: asd
		},
		data: [{
			name: '',
			symbol: 'image://css/img/tou.png',
			itemStyle: {
				normal: {
					color: '#f90', //圆点的颜色
					label: {
						//position: 'bottom',
						textStyle: {
							color: '#f90',

						}
					}
				}
			},

		}, {
			name: '节点2',
			category: 0.5,
			itemStyle: {
				normal: {
					color: '#090',

				},
				emphasis: {
					color: "#000"
				}
			}
		}, {
			name: 'node.js',
			category: 0,
			draggable: true,
		}, {
			name: 'jquery',
			category: 0,
			draggable: true,
		}, {
			name: 'angular',
			category: 0,
			draggable: true,
		}, {
			name: 'echart',
			category: 0,
			draggable: true,
		}, {
			name: 'zepto',
			category: 0,
			draggable: true,
		}, {
			name: 'webpack',
			category: 0,
			draggable: true,
		}, {
			name: 'git',
			category: 0,
			draggable: true,
		}, {
			name: 'gulp',
			category: 0,
			draggable: true,
		}, {
			name: 'bootstrap',
			category: 0,
			draggable: true,
		}, {
			name: 'vue',
			category: 0,
			draggable: true,
		},{
			name: 'element',
			category: 0,
			draggable: true,
		},{
			name: '小程序',
			category: 0,
			draggable: true,
		}],
		links: [{
			source: 'js',
			target: '节点2',
			value: "",
			lineStyle: {
				normal: {
					color: '#38f',
					curveness: 0 // 线的弯曲度 0-1之间 越大则歪曲度更大
				}
			},
			label: {
				normal: {
					textStyle: {
						color: '#07ac72'
					}
				}
			}
		}, {
			source: 'js',
			target: 'node.js',
			value: ""
		}, {
			source: 'js',
			target: 'jquery',
			value: ""
		}, {
			source: 'js',
			target: 'angular',
			value: ""
		}, {
			source: 'js',
			target: 'echart',
			value: ""
		}, {
			source: 'js',
			target: 'zepto',
			value: ""
		}, {
			source: 'js',
			target: 'webpack',
			value: ""
		}, {
			source: 'js',
			target: 'git',
			value: ""
		}, {
			source: 'js',
			target: 'gulp',
			value: ""
		}, {
			source: 'js',
			target: 'bootstrap',
			value: ""
		}, {
			source: 'js',
			target: 'vue',
			value: ""
		},{
			source: 'js',
			target: 'element',
			value: ""
		}, {
			source: 'js',
			target: '小程序',
			value: ""
		}]
	}]
};


dom.setOption(option);
	var qq_chat = true;
	function PlayJsAdPopWin() {
		if (qq_chat) {
			popwin = window.location.href = 'http://wpa.qq.com/msgrd?V=1&amp;Uin=281135332&amp;Site=在线QQ&amp;Menu=yes';
					 
					 //location.href = 'tencent://message/?uin=我们的QQ号码&Site=网站名称&Menu=yes'
		}
	};
	//setTimeout(PlayJsAdPopWin, 1000);
	
})




