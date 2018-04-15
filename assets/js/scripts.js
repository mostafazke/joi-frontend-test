var tns=(function(){if(!Object.keys){Object.keys=function(object){var keys=[];for(var name in object){if(Object.prototype.hasOwnProperty.call(object,name)){keys.push(name)}}
return keys}}(function(){"use strict";if(!("remove" in Element.prototype)){Element.prototype.remove=function(){if(this.parentNode){this.parentNode.removeChild(this)}}}})();function extend(){var obj,name,copy,target=arguments[0]||{},i=1,length=arguments.length;for(;i<length;i++){if((obj=arguments[i])!==null){for(name in obj){copy=obj[name];if(target===copy){continue}else if(copy!==undefined){target[name]=copy}}}}
return target}
function checkStorageValue(value){return['true','false'].indexOf(value)>=0?JSON.parse(value):value}
function setLocalStorage(key,value,access){if(access){localStorage.setItem(key,value)}
return value}
function getSlideId(){var id=window.tnsId;window.tnsId=!id?1:id+1;return'tns'+window.tnsId}
function getBody(){var doc=document,body=doc.body;if(!body){body=doc.createElement('body');body.fake=!0}
return body}
var docElement=document.documentElement;function setFakeBody(body){var docOverflow='';if(body.fake){docOverflow=docElement.style.overflow;body.style.background='';body.style.overflow=docElement.style.overflow='hidden';docElement.appendChild(body)}
return docOverflow}
function resetFakeBody(body,docOverflow){if(body.fake){body.remove();docElement.style.overflow=docOverflow;docElement.offsetHeight}}
function calc(){var doc=document,body=getBody(),docOverflow=setFakeBody(body),div=doc.createElement('div'),result=!1;body.appendChild(div);try{var vals=['calc(10px)','-moz-calc(10px)','-webkit-calc(10px)'],val;for(var i=0;i<3;i++){val=vals[i];div.style.width=val;if(div.offsetWidth===10){result=val.replace('(10px)','');break}}}catch(e){}
body.fake?resetFakeBody(body,docOverflow):div.remove();return result}
function subpixelLayout(){var doc=document,body=getBody(),docOverflow=setFakeBody(body),parent=doc.createElement('div'),child1=doc.createElement('div'),child2,supported;parent.style.cssText='width: 10px';child1.style.cssText='float: left; width: 5.5px; height: 10px;';child2=child1.cloneNode(!0);parent.appendChild(child1);parent.appendChild(child2);body.appendChild(parent);supported=child1.offsetTop!==child2.offsetTop;body.fake?resetFakeBody(body,docOverflow):parent.remove();return supported}
function mediaquerySupport(){var doc=document,body=getBody(),docOverflow=setFakeBody(body),div=doc.createElement('div'),style=doc.createElement('style'),rule='@media all and (min-width:1px){.tns-mq-test{position:absolute}}',position;style.type='text/css';div.className='tns-mq-test';body.appendChild(style);body.appendChild(div);if(style.styleSheet){style.styleSheet.cssText=rule}else{style.appendChild(doc.createTextNode(rule))}
position=window.getComputedStyle?window.getComputedStyle(div).position:div.currentStyle.position;body.fake?resetFakeBody(body,docOverflow):div.remove();return position==="absolute"}
function createStyleSheet(media){var style=document.createElement("style");if(media){style.setAttribute("media",media)}
document.querySelector('head').appendChild(style);return style.sheet?style.sheet:style.styleSheet}
function addCSSRule(sheet,selector,rules,index){'insertRule' in sheet?sheet.insertRule(selector+'{'+rules+'}',index):sheet.addRule(selector,rules,index)}
function getCssRulesLength(sheet){var rule=('insertRule' in sheet)?sheet.cssRules:sheet.rules;return rule.length}
function toDegree(y,x){return Math.atan2(y,x)*(180/Math.PI)}
function getTouchDirection(angle,range){var direction=!1,gap=Math.abs(90-Math.abs(angle));if(gap>=90-range){direction='horizontal'}else if(gap<=range){direction='vertical'}
return direction}
function forEachNodeList(arr,callback,scope){for(var i=0,l=arr.length;i<l;i++){callback.call(scope,arr[i],i)}}
function hasClass(el,str){return el.className.indexOf(str)>=0}
function addClass(el,str){if(!hasClass(el,str)){el.className+=' '+str}}
function removeClass(el,str){if(hasClass(el,str)){el.className=el.className.replace(str,'')}}
function hasAttr(el,attr){return el.hasAttribute(attr)}
function getAttr(el,attr){return el.getAttribute(attr)}
function isNodeList(el){return typeof el.item!=="undefined"}
function setAttrs(els,attrs){els=(isNodeList(els)||els instanceof Array)?els:[els];if(Object.prototype.toString.call(attrs)!=='[object Object]'){return}
for(var i=els.length;i--;){for(var key in attrs){els[i].setAttribute(key,attrs[key])}}}
function removeAttrs(els,attrs){els=(isNodeList(els)||els instanceof Array)?els:[els];attrs=(attrs instanceof Array)?attrs:[attrs];var attrLength=attrs.length;for(var i=els.length;i--;){for(var j=attrLength;j--;){els[i].removeAttribute(attrs[j])}}}
function removeElementStyles(el){el.style.cssText=''}
function hideElement(el){if(!hasAttr(el,'hidden')){setAttrs(el,{'hidden':''})}}
function showElement(el){if(hasAttr(el,'hidden')){removeAttrs(el,'hidden')}}
function isVisible(el){return el.offsetWidth>0&&el.offsetHeight>0}
function whichProperty(props){var el=document.createElement('fakeelement'),len=props.length;for(var i=0;i<props.length;i++){var prop=props[i];if(el.style[prop]!==undefined){return prop}}
return!1}
function getEndProperty(propIn,propOut){var endProp=!1;if(/^Webkit/.test(propIn)){endProp='webkit'+propOut+'End'}else if(/^O/.test(propIn)){endProp='o'+propOut+'End'}else if(propIn){endProp=propOut.toLowerCase()+'end'}
return endProp}
var supportsPassive=!1;try{var opts=Object.defineProperty({},'passive',{get:function(){supportsPassive=!0}});window.addEventListener("test",null,opts)}catch(e){}
var passiveOption=supportsPassive?{passive:!0}:!1;function addEvents(el,obj){for(var prop in obj){var option=(prop==='touchstart'||prop==='touchmove')?passiveOption:!1;el.addEventListener(prop,obj[prop],option)}}
function removeEvents(el,obj){for(var prop in obj){var option=['touchstart','touchmove'].indexOf(prop)>=0?passiveOption:!1;el.removeEventListener(prop,obj[prop],option)}}
function Events(){return{topics:{},on:function(eventName,fn){this.topics[eventName]=this.topics[eventName]||[];this.topics[eventName].push(fn)},off:function(eventName,fn){if(this.topics[eventName]){for(var i=0;i<this.topics[eventName].length;i++){if(this.topics[eventName][i]===fn){this.topics[eventName].splice(i,1);break}}}},emit:function(eventName,data){if(this.topics[eventName]){this.topics[eventName].forEach(function(fn){fn(data)})}}}}
function jsTransform(element,attr,prefix,postfix,to,duration,callback){var tick=Math.min(duration,10),unit=(to.indexOf('%')>=0)?'%':'px',to=to.replace(unit,''),from=Number(element.style[attr].replace(prefix,'').replace(postfix,'').replace(unit,'')),positionTick=(to-from)/duration*tick,running;setTimeout(moveElement,tick);function moveElement(){duration-=tick;from+=positionTick;element.style[attr]=prefix+from+unit+postfix;if(duration>0){setTimeout(moveElement,tick)}else{callback()}}}
var browserInfo=navigator.userAgent;var localStorageAccess=!0;var tnsStorage={};try{tnsStorage=localStorage;if(tnsStorage.tnsApp&&tnsStorage.tnsApp!==browserInfo){['tC','tSP','tMQ','tTf','tTDu','tTDe','tADu','tADe','tTE','tAE'].forEach(function(item){tnsStorage.removeItem(item)})}
tnsStorage.tnsApp=browserInfo}catch(e){localStorageAccess=!1}
if(localStorageAccess&&!localStorage){tnsStorage={}}
var doc=document;var win=window;var KEYS={ENTER:13,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40};var CALC=checkStorageValue(tnsStorage.tC)||setLocalStorage('tC',calc(),localStorageAccess);var SUBPIXEL=checkStorageValue(tnsStorage.tSP)||setLocalStorage('tSP',subpixelLayout(),localStorageAccess);var CSSMQ=checkStorageValue(tnsStorage.tMQ)||setLocalStorage('tMQ',mediaquerySupport(),localStorageAccess);var TRANSFORM=checkStorageValue(tnsStorage.tTf)||setLocalStorage('tTf',whichProperty(['transform','WebkitTransform','MozTransform','msTransform','OTransform']),localStorageAccess);var TRANSITIONDURATION=checkStorageValue(tnsStorage.tTDu)||setLocalStorage('tTDu',whichProperty(['transitionDuration','WebkitTransitionDuration','MozTransitionDuration','OTransitionDuration']),localStorageAccess);var TRANSITIONDELAY=checkStorageValue(tnsStorage.tTDe)||setLocalStorage('tTDe',whichProperty(['transitionDelay','WebkitTransitionDelay','MozTransitionDelay','OTransitionDelay']),localStorageAccess);var ANIMATIONDURATION=checkStorageValue(tnsStorage.tADu)||setLocalStorage('tADu',whichProperty(['animationDuration','WebkitAnimationDuration','MozAnimationDuration','OAnimationDuration']),localStorageAccess);var ANIMATIONDELAY=checkStorageValue(tnsStorage.tADe)||setLocalStorage('tADe',whichProperty(['animationDelay','WebkitAnimationDelay','MozAnimationDelay','OAnimationDelay']),localStorageAccess);var TRANSITIONEND=checkStorageValue(tnsStorage.tTE)||setLocalStorage('tTE',getEndProperty(TRANSITIONDURATION,'Transition'),localStorageAccess);var ANIMATIONEND=checkStorageValue(tnsStorage.tAE)||setLocalStorage('tAE',getEndProperty(ANIMATIONDURATION,'Animation'),localStorageAccess);if(!CSSMQ){SUBPIXEL=!1}
var tns=function(options){options=extend({container:'.slider',mode:'carousel',axis:'horizontal',items:1,gutter:0,edgePadding:0,fixedWidth:!1,slideBy:1,controls:!0,controlsText:['prev','next'],controlsContainer:!1,nav:!1,navContainer:!1,navAsThumbnails:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayTimeout:5000,autoplayDirection:'forward',autoplayText:['',''],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!1,autoplayResetOnVisibility:!0,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,touch:!0,mouseDrag:!1,swipeAngle:15,nested:!1,freezable:!0,onInit:!1},options||{});var supportConsoleWarn=win.console&&typeof win.console.warn==="function";var list=['container','controlsContainer','navContainer','autoplayButton'];for(var i=list.length;i--;){var item=list[i];if(typeof options[item]==='string'){var el=doc.querySelector(options[item]);if(el&&el.nodeName){options[item]=el}else{if(supportConsoleWarn){console.warn('Can\'t find',options[item])}
return}}}
if(options.container.children&&options.container.children.length<1){if(supportConsoleWarn){console.warn('No slides found in',options.container)}
return}
if(options.responsive){var resTem={},res=options.responsive;for(var key in res){var val=res[key];resTem[key]=typeof val==='number'?{items:val}:val}
options.responsive=resTem;resTem=null;if(0 in options.responsive){options=extend(options,options.responsive[0]);delete options.responsive[0]}}
var carousel=options.mode==='carousel'?!0:!1;if(!carousel){options.axis='horizontal';options.rewind=!1;options.loop=!0;options.edgePadding=!1;var animateIn='tns-fadeIn',animateOut='tns-fadeOut',animateDelay=!1,animateNormal=options.animateNormal||'tns-normal';if(TRANSITIONEND&&ANIMATIONEND){animateIn=options.animateIn||animateIn;animateOut=options.animateOut||animateOut;animateDelay=options.animateDelay||animateDelay}}
var horizontal=options.axis==='horizontal'?!0:!1,outerWrapper=doc.createElement('div'),innerWrapper=doc.createElement('div'),container=options.container,containerParent=container.parentNode,slideItems=container.children,slideCount=slideItems.length,vpInner,responsive=options.responsive,responsiveItems=[],breakpoints=!1,breakpointZone=0,windowWidth=getWindowWidth(),isOn;if(options.fixedWidth){var vpOuter=getViewportWidth(containerParent)}
if(responsive){breakpoints=Object.keys(responsive).map(function(x){return parseInt(x)}).sort(function(a,b){return a-b});breakpoints.forEach(function(bp){responsiveItems=responsiveItems.concat(Object.keys(responsive[bp]))});var arr=[];responsiveItems.forEach(function(item){if(arr.indexOf(item)<0){arr.push(item)}});responsiveItems=arr;setBreakpointZone()}
var items=getOption('items'),slideBy=getOption('slideBy')==='page'?items:getOption('slideBy'),nested=options.nested,gutter=getOption('gutter'),edgePadding=getOption('edgePadding'),fixedWidth=getOption('fixedWidth'),arrowKeys=getOption('arrowKeys'),speed=getOption('speed'),rewind=options.rewind,loop=rewind?!1:options.loop,autoHeight=getOption('autoHeight'),sheet=createStyleSheet(),lazyload=options.lazyload,slideOffsetTops,slideItemsOut=[],cloneCount=loop?slideCount*2:0,slideCountNew=!carousel?slideCount+cloneCount:slideCount+cloneCount*2,hasRightDeadZone=fixedWidth&&!loop&&!edgePadding?!0:!1,updateIndexBeforeTransform=!carousel||!loop?!0:!1,transformAttr=horizontal?'left':'top',transformPrefix='',transformPostfix='',startIndex=getOption('startIndex'),index=startIndex?updateStartIndex(startIndex):!carousel?0:cloneCount,indexCached=index,indexMin=0,indexMax=slideCountNew-items,resizeTimer,touchedOrDraged,swipeAngle=options.swipeAngle,moveDirectionExpected=swipeAngle?'?':!0,running=!1,onInit=options.onInit,events=new Events(),containerIdCached=container.id,classContainer=' tns-slider tns-'+options.mode,slideId=container.id||getSlideId(),disable=getOption('disable'),freezable=options.freezable,freeze=disable?!0:freezable?slideCount<=items:!1,frozen,importantStr=nested==='inner'?' !important':'',controlsEvents={'click':onControlsClick,'keydown':onControlsKeydown},navEvents={'click':onNavClick,'keydown':onNavKeydown},hoverEvents={'mouseover':mouseoverPause,'mouseout':mouseoutRestart},visibilityEvent={'visibilitychange':onVisibilityChange},docmentKeydownEvent={'keydown':onDocumentKeydown},touchEvents={'touchstart':onTouchOrMouseStart,'touchmove':onTouchOrMouseMove,'touchend':onTouchOrMouseEnd,'touchcancel':onTouchOrMouseEnd},dragEvents={'mousedown':onTouchOrMouseStart,'mousemove':onTouchOrMouseMove,'mouseup':onTouchOrMouseEnd,'mouseleave':onTouchOrMouseEnd},hasControls=checkOption('controls'),hasNav=checkOption('nav'),navAsThumbnails=options.navAsThumbnails,hasAutoplay=checkOption('autoplay'),hasTouch=checkOption('touch'),hasMouseDrag=checkOption('mouseDrag'),slideActiveClass='tns-slide-active';function updateStartIndex(indexTem){indexTem=indexTem%slideCount;if(indexTem<0){indexTem+=slideCount}
indexTem=Math.min(indexTem,slideCountNew-items);return indexTem}
if(hasControls){var controls=getOption('controls'),controlsText=getOption('controlsText'),controlsContainer=options.controlsContainer,prevButton,nextButton,prevIsButton,nextIsButton}
if(hasNav){var nav=getOption('nav'),navContainer=options.navContainer,navItems,visibleNavIndexes=[],visibleNavIndexesCached=visibleNavIndexes,navClicked=-1,navCurrentIndex=index%slideCount,navCurrentIndexCached=navCurrentIndex,navActiveClass='active'}
if(hasAutoplay){var autoplay=getOption('autoplay'),autoplayTimeout=getOption('autoplayTimeout'),autoplayDirection=options.autoplayDirection==='forward'?1:-1,autoplayText=getOption('autoplayText'),autoplayHoverPause=getOption('autoplayHoverPause'),autoplayButton=options.autoplayButton,autoplayResetOnVisibility=getOption('autoplayResetOnVisibility'),autoplayHtmlStrings=['<span class=\'tns-visually-hidden\'>',' animation</span>'],autoplayTimer,animating,autoplayHoverPaused,autoplayUserPaused,autoplayVisibilityPaused}
if(hasTouch){var touch=getOption('touch'),startX=null,startY=null,translateInit,disX,disY}
if(hasMouseDrag){var mouseDrag=getOption('mouseDrag'),isDragEvent=!1}
if(freeze){controls=nav=touch=mouseDrag=arrowKeys=autoplay=autoplayHoverPause=autoplayResetOnVisibility=!1}
if(TRANSFORM){transformAttr=TRANSFORM;transformPrefix='translate';transformPrefix+=horizontal?'X(':'Y(';transformPostfix=')'}
function getWindowWidth(){return win.innerWidth||doc.documentElement.clientWidth||doc.body.clientWidth}
function getViewportWidth(el){var width=el.clientWidth;return width?width:getViewportWidth(el.parentNode)}
function checkOption(item){var result=options[item];if(!result&&breakpoints&&responsiveItems.indexOf(item)>=0){breakpoints.forEach(function(bp){if(responsive[bp][item]){result=!0}})}
return result}
function getOption(item,viewport){viewport=viewport?viewport:windowWidth;var obj={slideBy:'page',edgePadding:!1,autoHeight:!0},result;if(!carousel&&item in obj){result=obj[item]}else{if(item==='items'&&getOption('fixedWidth')){result=Math.floor(vpOuter/(getOption('fixedWidth')+getOption('gutter')))}else if(item==='autoHeight'&&nested==='outer'){result=!0}else{result=options[item];if(breakpoints&&responsiveItems.indexOf(item)>=0){for(var i=0,len=breakpoints.length;i<len;i++){var bp=breakpoints[i];if(viewport>=bp){if(item in responsive[bp]){result=responsive[bp][item]}}else{break}}}}}
if(item==='slideBy'&&result==='page'){result=getOption('items')}
return result}
function getSlideMarginLeft(i){var str=CALC?CALC+'('+i*100+'% / '+slideCountNew+')':i*100/slideCountNew+'%';return str}
function getInnerWrapperStyles(edgePaddingTem,gutterTem,fixedWidthTem){var str='';if(edgePaddingTem){var gap=edgePaddingTem;if(gutterTem){gap+=gutterTem}
if(fixedWidthTem){str='margin: 0px '+(vpOuter%(fixedWidthTem+gutterTem)+gutterTem)/2+'px'}else{str=horizontal?'margin: 0 '+edgePaddingTem+'px 0 '+gap+'px;':'padding: '+gap+'px 0 '+edgePaddingTem+'px 0;'}}else if(gutterTem&&!fixedWidthTem){var gutterTemUnit='-'+gutterTem+'px',dir=horizontal?gutterTemUnit+' 0 0':'0 '+gutterTemUnit+' 0';str='margin: 0 '+dir+';'}
return str}
function getContainerWidth(fixedWidthTem,gutterTem,itemsTem){var str;if(fixedWidthTem){str=(fixedWidthTem+gutterTem)*slideCountNew+'px'}else{str=CALC?CALC+'('+slideCountNew*100+'% / '+itemsTem+')':slideCountNew*100/itemsTem+'%'}
return str}
function getSlideWidthStyle(fixedWidthTem,gutterTem,itemsTem){var str='';if(horizontal){str='width:';if(fixedWidthTem){str+=(fixedWidthTem+gutterTem)+'px'}else{var dividend=carousel?slideCountNew:itemsTem;str+=CALC?CALC+'(100% / '+dividend+')':100/dividend+'%'}
str+=importantStr+';'}
return str}
function getSlideGutterStyle(gutterTem){var str='';if(gutterTem!==!1){var prop=horizontal?'padding-':'margin-',dir=horizontal?'right':'bottom';str=prop+dir+': '+gutterTem+'px;'}
return str}(function sliderInit(){outerWrapper.appendChild(innerWrapper);containerParent.insertBefore(outerWrapper,container);innerWrapper.appendChild(container);vpInner=getViewportWidth(innerWrapper);var classOuter='tns-outer',classInner='tns-inner',hasGutter=checkOption('gutter');if(carousel){if(horizontal){if(checkOption('edgePadding')||hasGutter&&!options.fixedWidth){classOuter+=' tns-ovh'}else{classInner+=' tns-ovh'}}else{classInner+=' tns-ovh'}}else if(hasGutter){classOuter+=' tns-ovh'}
outerWrapper.className=classOuter;innerWrapper.className=classInner;innerWrapper.id=slideId+'-iw';if(autoHeight){innerWrapper.className+=' tns-ah';innerWrapper.style[TRANSITIONDURATION]=speed/1000+'s'}
if(container.id===''){container.id=slideId}
classContainer+=SUBPIXEL?' tns-subpixel':' tns-no-subpixel';classContainer+=CALC?' tns-calc':' tns-no-calc';if(carousel){classContainer+=' tns-'+options.axis}
container.className+=classContainer;if(carousel&&TRANSITIONEND){var eve={};eve[TRANSITIONEND]=onTransitionEnd;addEvents(container,eve)}
classOuter=classInner=null;for(var x=0;x<slideCount;x++){var item=slideItems[x];if(!item.id){item.id=slideId+'-item'+x}
addClass(item,'tns-item');if(!carousel&&animateNormal){addClass(item,animateNormal)}
setAttrs(item,{'aria-hidden':'true'})}
if(loop||edgePadding){var fragmentBefore=doc.createDocumentFragment(),fragmentAfter=doc.createDocumentFragment();for(var j=cloneCount;j--;){var num=j%slideCount,cloneFirst=slideItems[num].cloneNode(!0);removeAttrs(cloneFirst,'id');fragmentAfter.insertBefore(cloneFirst,fragmentAfter.firstChild);if(carousel){var cloneLast=slideItems[slideCount-1-num].cloneNode(!0);removeAttrs(cloneLast,'id');fragmentBefore.appendChild(cloneLast)}}
container.insertBefore(fragmentBefore,container.firstChild);container.appendChild(fragmentAfter);slideItems=container.children}
for(var i=index,l=index+Math.min(slideCount,items);i<l;i++){var item=slideItems[i];setAttrs(item,{'aria-hidden':'false'});removeAttrs(item,['tabindex']);addClass(item,slideActiveClass);if(!carousel){item.style.left=(i-index)*100/items+'%';addClass(item,animateIn);removeClass(item,animateNormal)}}
if(carousel&&horizontal){if(SUBPIXEL){addCSSRule(sheet,'#'+slideId+' > .tns-item','font-size:'+win.getComputedStyle(slideItems[0]).fontSize+';',getCssRulesLength(sheet));addCSSRule(sheet,'#'+slideId,'font-size:0;',getCssRulesLength(sheet))}else{forEachNodeList(slideItems,function(slide,i){slide.style.marginLeft=getSlideMarginLeft(i)})}}
if(CSSMQ){var str=getInnerWrapperStyles(options.edgePadding,options.gutter,options.fixedWidth);addCSSRule(sheet,'#'+slideId+'-iw',str,getCssRulesLength(sheet));if(carousel&&horizontal){str='width:'+getContainerWidth(options.fixedWidth,options.gutter,options.items);addCSSRule(sheet,'#'+slideId,str,getCssRulesLength(sheet))}
if(horizontal||options.gutter){str=getSlideWidthStyle(options.fixedWidth,options.gutter,options.items)+getSlideGutterStyle(options.gutter);addCSSRule(sheet,'#'+slideId+' > .tns-item',str,getCssRulesLength(sheet))}}else{innerWrapper.style.cssText=getInnerWrapperStyles(edgePadding,gutter,fixedWidth);if(carousel&&horizontal){container.style.width=getContainerWidth(fixedWidth,gutter,items)}
if(horizontal||gutter){var str=getSlideWidthStyle(fixedWidth,gutter,items)+getSlideGutterStyle(gutter);addCSSRule(sheet,'#'+slideId+' > .tns-item',str,getCssRulesLength(sheet))}}
if(!horizontal&&!disable){getSlideOffsetTops();updateContentWrapperHeight()}
if(responsive&&CSSMQ){breakpoints.forEach(function(bp){var opts=responsive[bp],str='',innerWrapperStr='',containerStr='',slideStr='',itemsBP=getOption('items',bp),fixedWidthBP=getOption('fixedWidth',bp),edgePaddingBP=getOption('edgePadding',bp),gutterBP=getOption('gutter',bp);if('edgePadding' in opts||'gutter' in opts){innerWrapperStr='#'+slideId+'-iw{'+getInnerWrapperStyles(edgePaddingBP,gutterBP,fixedWidthBP)+'}'}
if(carousel&&horizontal&&('fixedWidth' in opts||'gutter' in opts||'items' in opts)){containerStr='#'+slideId+'{'+'width:'+getContainerWidth(fixedWidthBP,gutterBP,itemsBP)+'}'}
if('fixedWidth' in opts||checkOption('fixedWidth')&&'gutter' in opts||!carousel&&'items' in opts){slideStr+=getSlideWidthStyle(fixedWidthBP,gutterBP,itemsBP)}
if('gutter' in opts){slideStr+=getSlideGutterStyle(gutterBP)}
if(slideStr.length>0){slideStr='#'+slideId+' > .tns-item{'+slideStr+'}'}
str=innerWrapperStr+containerStr+slideStr;if(str.length>0){sheet.insertRule('@media (min-width: '+bp/16+'em) {'+str+'}',sheet.cssRules.length)}})}
if(carousel&&!disable){doContainerTransform()}
if(navigator.msMaxTouchPoints){addClass(outerWrapper,'ms-touch');addEvents(outerWrapper,{'scroll':ie10Scroll});setSnapInterval()}
if(hasNav){var initIndex=!carousel?0:cloneCount;if(navContainer){setAttrs(navContainer,{'aria-label':'Carousel Pagination'});navItems=navContainer.children;forEachNodeList(navItems,function(item,i){setAttrs(item,{'data-nav':i,'aria-selected':'false','aria-controls':slideItems[initIndex+i].id,})})}else{var navHtml='',hiddenStr=navAsThumbnails?'':' hidden';for(var i=0;i<slideCount;i++){navHtml+='<div class="dot" data-nav="'+i+'" aria-selected="false" aria-controls="'+slideItems[initIndex+i].id+hiddenStr+'"></div>'}
navHtml='<div class="tns-nav" aria-label="Carousel Pagination">'+navHtml+'</div>';outerWrapper.insertAdjacentHTML('afterbegin',navHtml);navContainer=outerWrapper.querySelector('.tns-nav');navItems=navContainer.children}
updateNavVisibility();if(TRANSITIONDURATION){var prefix=TRANSITIONDURATION.substring(0,TRANSITIONDURATION.length-18).toLowerCase(),str='transition: all '+speed/1000+'s';if(prefix){str='-'+prefix+'-'+str}
addCSSRule(sheet,'[aria-controls^='+slideId+'-item]',str,getCssRulesLength(sheet))}
setAttrs(navItems[navCurrentIndex],{'tabindex':'0','aria-selected':'true'});addClass(navItems[navCurrentIndex],navActiveClass);addEvents(navContainer,navEvents);if(!nav){hideElement(navContainer)}}
if(hasAutoplay){var txt=autoplay?'stop':'start';if(autoplayButton){setAttrs(autoplayButton,{'data-action':txt})}else if(options.autoplayButtonOutput){innerWrapper.insertAdjacentHTML('beforebegin','<button data-action="'+txt+'" type="button">'+autoplayHtmlStrings[0]+txt+autoplayHtmlStrings[1]+autoplayText[0]+'</button>');autoplayButton=outerWrapper.querySelector('[data-action]')}
if(autoplayButton){addEvents(autoplayButton,{'click':toggleAutoplay})}
if(!autoplay){if(autoplayButton){hideElement(autoplayButton)}}else{startAutoplay();if(autoplayHoverPause){addEvents(container,hoverEvents)}
if(autoplayResetOnVisibility){addEvents(container,visibilityEvent)}}}
if(hasControls){if(controlsContainer){prevButton=controlsContainer.children[0];nextButton=controlsContainer.children[1];setAttrs(controlsContainer,{'aria-label':'Carousel Navigation'});setAttrs(prevButton,{'data-controls':'prev'});setAttrs(nextButton,{'data-controls':'next'});setAttrs(controlsContainer.children,{'aria-controls':slideId})}else{outerWrapper.insertAdjacentHTML('afterbegin','<div class="tns-controls" aria-label="Carousel Navigation"><div data-controls="next" class="next" aria-controls="'+slideId+'"></div><div data-controls="prev" class="prev" aria-controls="'+slideId+'"></div></div>');controlsContainer=outerWrapper.querySelector('.tns-controls');prevButton=controlsContainer.children[0];nextButton=controlsContainer.children[1]}
prevIsButton=isButton(prevButton);nextIsButton=isButton(nextButton);updateControlsStatus();addEvents(controlsContainer,controlsEvents);if(!controls){hideElement(controlsContainer)}}
if(touch){addEvents(container,touchEvents)}
if(mouseDrag){addEvents(container,dragEvents)}
if(arrowKeys){addEvents(doc,docmentKeydownEvent)}
if(nested==='inner'){events.on('outerResized',function(){resizeTasks();events.emit('innerLoaded',info())})}else{addEvents(win,{'resize':onResize});if(nested==='outer'){events.on('innerLoaded',runAutoHeight)}}
lazyLoad();runAutoHeight();toggleSlideDisplayAndEdgePadding();updateFixedWidthInnerWrapperStyle();events.on('indexChanged',additionalUpdates);if(typeof onInit==='function'){onInit(info())}
if(nested==='inner'){events.emit('innerLoaded',info())}
if(disable){disableSlider(!0)}
isOn=!0})();function onResize(e){e=e||win.event;clearTimeout(resizeTimer);resizeTimer=setTimeout(function(){if(isOn){var newWW=getWindowWidth();if(windowWidth!==newWW){windowWidth=newWW;resizeTasks();if(nested==='outer'){events.emit('outerResized',info(e))}}}},100)}
function resizeTasks(){var breakpointZoneTem=breakpointZone,indexTem=index,itemsTem=items,freezeTem=freeze;if(fixedWidth){vpOuter=getViewportWidth(outerWrapper)}
vpInner=getViewportWidth(innerWrapper);if(breakpoints){setBreakpointZone()}
if(breakpointZoneTem!==breakpointZone||fixedWidth){var slideByTem=slideBy,arrowKeysTem=arrowKeys,autoHeightTem=autoHeight,fixedWidthTem=fixedWidth,edgePaddingTem=edgePadding,gutterTem=gutter,disableTem=disable;items=getOption('items');slideBy=getOption('slideBy');disable=getOption('disable');freeze=disable?!0:freezable?slideCount<=items:!1;if(items!==itemsTem){indexMax=slideCountNew-items;updateIndex()}
if(disable!==disableTem){disableSlider(disable)}
if(freeze!==freezeTem){if(freeze){index=!carousel?0:cloneCount}
toggleSlideDisplayAndEdgePadding()}
if(breakpointZoneTem!==breakpointZone){speed=getOption('speed');edgePadding=getOption('edgePadding');gutter=getOption('gutter');fixedWidth=getOption('fixedWidth');if(!disable&&fixedWidth!==fixedWidthTem){doContainerTransform()}
autoHeight=getOption('autoHeight');if(autoHeight!==autoHeightTem){if(!autoHeight){innerWrapper.style.height=''}}}
arrowKeys=freeze?!1:getOption('arrowKeys');if(arrowKeys!==arrowKeysTem){arrowKeys?addEvents(doc,docmentKeydownEvent):removeEvents(doc,docmentKeydownEvent)}
if(hasControls){var controlsTem=controls,controlsTextTem=controlsText;controls=freeze?!1:getOption('controls');controlsText=getOption('controlsText');if(controls!==controlsTem){controls?showElement(controlsContainer):hideElement(controlsContainer)}
if(controlsText!==controlsTextTem){prevButton.innerHTML=controlsText[0];nextButton.innerHTML=controlsText[1]}}
if(hasNav){var navTem=nav;nav=freeze?!1:getOption('nav');if(nav!==navTem){if(nav){showElement(navContainer);updateNavVisibility()}else{hideElement(navContainer)}}}
if(hasTouch){var touchTem=touch;touch=freeze?!1:getOption('touch');if(touch!==touchTem&&carousel){touch?addEvents(container,touchEvents):removeEvents(container,touchEvents)}}
if(hasMouseDrag){var mouseDragTem=mouseDrag;mouseDrag=freeze?!1:getOption('mouseDrag');if(mouseDrag!==mouseDragTem&&carousel){mouseDrag?addEvents(container,dragEvents):removeEvents(container,dragEvents)}}
if(hasAutoplay){var autoplayTem=autoplay,autoplayHoverPauseTem=autoplayHoverPause,autoplayResetOnVisibilityTem=autoplayResetOnVisibility,autoplayTextTem=autoplayText;if(freeze){autoplay=autoplayHoverPause=autoplayResetOnVisibility=!1}else{autoplay=getOption('autoplay');if(autoplay){autoplayHoverPause=getOption('autoplayHoverPause');autoplayResetOnVisibility=getOption('autoplayResetOnVisibility')}else{autoplayHoverPause=autoplayResetOnVisibility=!1}}
autoplayText=getOption('autoplayText');autoplayTimeout=getOption('autoplayTimeout');if(autoplay!==autoplayTem){if(autoplay){if(autoplayButton){showElement(autoplayButton)}
if(!animating&&!autoplayUserPaused){startAutoplay()}}else{if(autoplayButton){hideElement(autoplayButton)}
if(animating){stopAutoplay()}}}
if(autoplayHoverPause!==autoplayHoverPauseTem){autoplayHoverPause?addEvents(container,hoverEvents):removeEvents(container,hoverEvents)}
if(autoplayResetOnVisibility!==autoplayResetOnVisibilityTem){autoplayResetOnVisibility?addEvents(doc,visibilityEvent):removeEvents(doc,visibilityEvent)}
if(autoplayButton&&autoplayText!==autoplayTextTem){var i=autoplay?1:0,html=autoplayButton.innerHTML,len=html.length-autoplayTextTem[i].length;if(html.substring(len)===autoplayTextTem[i]){autoplayButton.innerHTML=html.substring(0,len)+autoplayText[i]}}}
if(!CSSMQ){if(!freeze&&(edgePadding!==edgePaddingTem||gutter!==gutterTem)){innerWrapper.style.cssText=getInnerWrapperStyles(edgePadding,gutter,fixedWidth)}
if(carousel&&horizontal&&(fixedWidth!==fixedWidthTem||gutter!==gutterTem||items!==itemsTem)){container.style.width=getContainerWidth(fixedWidth,gutter,items)}
if(horizontal&&(items!==itemsTem||gutter!==gutterTem||fixedWidth!=fixedWidthTem)){var str=getSlideWidthStyle(fixedWidth,gutter,items)+getSlideGutterStyle(gutter);sheet.removeRule(getCssRulesLength(sheet)-1);addCSSRule(sheet,'#'+slideId+' > .tns-item',str,getCssRulesLength(sheet))}
if(!fixedWidth&&index===indexTem){doTransform(0)}}
if(index!==indexTem){events.emit('indexChanged',info());doTransform(0);indexCached=index}
if(items!==itemsTem){additionalUpdates();updateSlidePosition();runAutoHeight();if(navigator.msMaxTouchPoints){setSnapInterval()}}}
if(!horizontal&&!disable){getSlideOffsetTops();updateContentWrapperHeight();doContainerTransform()}
updateFixedWidthInnerWrapperStyle(!0);runAutoHeight()}
function setBreakpointZone(){breakpointZone=0;breakpoints.forEach(function(bp,i){if(windowWidth>=bp){breakpointZone=i+1}})}
var updateIndex=(function(){return loop?function(){var leftEdge=indexMin,rightEdge=indexMax;if(carousel){leftEdge+=slideBy;rightEdge-=slideBy;if(edgePadding){leftEdge+=1;rightEdge-=1}else if(fixedWidth){var gt=gutter?gutter:0;if(vpOuter%(fixedWidth+gt)>gt){rightEdge-=1}}}
if(index>rightEdge){while(index>=leftEdge+slideCount){index-=slideCount}}else if(index<leftEdge){while(index<=rightEdge-slideCount){index+=slideCount}}}:function(){index=Math.max(indexMin,Math.min(indexMax,index))}})();function toggleSlideDisplayAndEdgePadding(){var str='tns-transparent';if(freeze){if(!frozen){if(edgePadding){innerWrapper.style.margin='0px'}
if(cloneCount){for(var i=cloneCount;i--;){if(carousel){addClass(slideItems[i],str)}
addClass(slideItems[slideCountNew-i-1],str)}}
frozen=!0}}else if(frozen){if(edgePadding&&!fixedWidth&&CSSMQ){innerWrapper.style.margin=''}
if(cloneCount){for(var i=cloneCount;i--;){if(carousel){removeClass(slideItems[i],str)}
removeClass(slideItems[slideCountNew-i-1],str)}}
frozen=!1}}
function updateFixedWidthInnerWrapperStyle(resize){if(fixedWidth&&edgePadding){if(freeze||vpOuter<=(fixedWidth+gutter)){if(innerWrapper.style.margin!=='0px'){innerWrapper.style.margin='0px'}}else if(resize){innerWrapper.style.cssText=getInnerWrapperStyles(edgePadding,gutter,fixedWidth)}}}
function disableSlider(disable){var len=slideItems.length;if(disable){sheet.disabled=!0;container.className=container.className.replace(classContainer.substring(1),'');removeElementStyles(container);if(loop){for(var j=cloneCount;j--;){if(carousel){hideElement(slideItems[j])}
hideElement(slideItems[len-j-1])}}
if(!horizontal||!carousel){removeElementStyles(innerWrapper)}
if(!carousel){for(var i=index,l=index+slideCount;i<l;i++){var item=slideItems[i];removeElementStyles(item);removeClass(item,animateIn);removeClass(item,animateNormal)}}}else{sheet.disabled=!1;container.className+=classContainer;if(!horizontal){getSlideOffsetTops()}
doContainerTransform();if(loop){for(var j=cloneCount;j--;){if(carousel){showElement(slideItems[j])}
showElement(slideItems[len-j-1])}}
if(!carousel){for(var i=index,l=index+slideCount;i<l;i++){var item=slideItems[i],classN=i<index+items?animateIn:animateNormal;item.style.left=(i-index)*100/items+'%';addClass(item,classN)}}}}
function lazyLoad(){if(lazyload&&!disable){var i=index,len=index+items;if(edgePadding){i-=1;len+=1}
for(;i<len;i++){forEachNodeList(slideItems[i].querySelectorAll('.tns-lazy-img'),function(img){var eve={};eve[TRANSITIONEND]=function(e){e.stopPropagation()};addEvents(img,eve);if(!hasClass(img,'loaded')){img.src=getAttr(img,'data-src');addClass(img,'loaded')}})}}}
function runAutoHeight(){if(autoHeight&&!disable){var images=[],imagesSuccess=[],imagesFail=[];for(var i=index,l=index+items;i<l;i++){forEachNodeList(slideItems[i].querySelectorAll('img'),function(img){img.addEventListener('load',function loadcheck(){imagesSuccess.push(img);img.removeEventListener('load',loadcheck)});img.addEventListener('error',function errorcheck(){imagesFail.push(img);img.removeEventListener('error',errorcheck)});var src=img.src;img.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";img.src=src;images.push(img)})}
if(!images.length){updateInnerWrapperHeight();return}
checkImagesLoaded(images,imagesSuccess,imagesFail)}}
function checkImagesLoaded(imgs,imgsSuccess,imgsFail){imgs.forEach(function(img,index){if(imgsSuccess.indexOf(img)>=0||imgsFail.indexOf(img)>=0){imgs.splice(index,1)}});if(!imgs.length){updateInnerWrapperHeight();return}
setTimeout(function(){checkImagesLoaded(imgs,imgsSuccess,imgsFail)},16)}
function additionalUpdates(){lazyLoad();updateSlideStatus();updateControlsStatus();updateNavVisibility();updateNavStatus()}
function updateInnerWrapperHeight(){if(autoHeight){var heights=[],maxHeight;for(var i=index,l=index+items;i<l;i++){heights.push(slideItems[i].offsetHeight)}
maxHeight=Math.max.apply(null,heights);if(innerWrapper.style.height!==maxHeight){if(TRANSITIONDURATION){setDurations(speed)}
innerWrapper.style.height=maxHeight+'px'}}}
function getSlideOffsetTops(){slideOffsetTops=[0];var topFirst=slideItems[0].getBoundingClientRect().top,attr;for(var i=1;i<slideCountNew;i++){attr=slideItems[i].getBoundingClientRect().top;slideOffsetTops.push(attr-topFirst)}}
function setSnapInterval(){outerWrapper.style.msScrollSnapPointsX='snapInterval(0%, '+(100/items)+'%)'}
function updateSlideStatus(){var l=index+Math.min(slideCount,items);for(var i=slideCountNew;i--;){var item=slideItems[i];if(i>=index&&i<l){if(hasAttr(item,'tabindex')){setAttrs(item,{'aria-hidden':'false'});removeAttrs(item,['tabindex']);addClass(item,slideActiveClass)}}else{if(!hasAttr(item,'tabindex')){setAttrs(item,{'aria-hidden':'true'})}
if(hasClass(item,slideActiveClass)){removeClass(item,slideActiveClass)}}}}
function updateSlidePosition(){if(!carousel){var l=index+Math.min(slideCount,items);for(var i=slideCountNew;i--;){var item=slideItems[i];if(i>=index&&i<l){addClass(item,'tns-moving');item.style.left=(i-index)*100/items+'%';addClass(item,animateIn);removeClass(item,animateNormal)}else if(item.style.left){item.style.left='';addClass(item,animateNormal);removeClass(item,animateIn)}
removeClass(item,animateOut)}
setTimeout(function(){forEachNodeList(slideItems,function(el){removeClass(el,'tns-moving')})},300)}}
function updateNavStatus(){if(nav){navCurrentIndex=navClicked!==-1?navClicked:index%slideCount;navClicked=-1;if(navCurrentIndex!==navCurrentIndexCached){var navPrev=navItems[navCurrentIndexCached],navCurrent=navItems[navCurrentIndex];setAttrs(navPrev,{'aria-selected':'false'});setAttrs(navCurrent,{'aria-selected':'true'});removeClass(navPrev,navActiveClass);addClass(navCurrent,navActiveClass)}}}
function getLowerCaseNodeName(el){return el.nodeName.toLowerCase()}
function isButton(el){return getLowerCaseNodeName(el)==='button'}
function isAriaDisabled(el){return el.getAttribute('aria-disabled')==='true'}
function disEnableElement(isButton,el,val){if(isButton){el.disabled=val}else{el.setAttribute('aria-disabled',val.toString())}}
function updateControlsStatus(){if(!controls||rewind||loop){return}
var prevDisabled=(prevIsButton)?prevButton.disabled:isAriaDisabled(prevButton),nextDisabled=(nextIsButton)?nextButton.disabled:isAriaDisabled(nextButton),disablePrev=(index===indexMin)?!0:!1,disableNext=(!rewind&&index===indexMax)?!0:!1;if(disablePrev&&!prevDisabled){disEnableElement(prevIsButton,prevButton,!0)}
if(!disablePrev&&prevDisabled){disEnableElement(prevIsButton,prevButton,!1)}
if(disableNext&&!nextDisabled){disEnableElement(nextIsButton,nextButton,!0)}
if(!disableNext&&nextDisabled){disEnableElement(nextIsButton,nextButton,!1)}}
function setDurations(duration,target){duration=!duration?'':duration/1000+'s';target=target||container;target.style[TRANSITIONDURATION]=duration;if(!carousel){target.style[ANIMATIONDURATION]=duration}
if(!horizontal){innerWrapper.style[TRANSITIONDURATION]=duration}}
function getContainerTransformValue(){var val;if(horizontal){if(fixedWidth){val=-(fixedWidth+gutter)*index+'px'}else{var denominator=TRANSFORM?slideCountNew:items;val=-index*100/denominator+'%'}}else{val=-slideOffsetTops[index]+'px'}
return val}
function doContainerTransform(val){if(!val){val=getContainerTransformValue()}
container.style[transformAttr]=transformPrefix+val+transformPostfix}
function animateSlide(number,classOut,classIn,isOut){for(var i=number,l=number+items;i<l;i++){var item=slideItems[i];if(!isOut){item.style.left=(i-index)*100/items+'%'}
if(TRANSITIONDURATION){setDurations(speed,item)}
if(animateDelay&&TRANSITIONDELAY){item.style[TRANSITIONDELAY]=item.style[ANIMATIONDELAY]=animateDelay*(i-number)/1000+'s'}
removeClass(item,classOut);addClass(item,classIn);if(isOut){slideItemsOut.push(item)}}}
var transformCore=(function(){return carousel?function(duration,distance){if(!distance){distance=getContainerTransformValue()}
if(hasRightDeadZone&&index===indexMax){distance=-((fixedWidth+gutter)*slideCountNew-vpInner)+'px'}
if(TRANSITIONDURATION||!duration){doContainerTransform(distance);if(!duration||!isVisible(container)){onTransitionEnd()}}else{jsTransform(container,transformAttr,transformPrefix,transformPostfix,distance,speed,onTransitionEnd)}
if(!horizontal){updateContentWrapperHeight()}}:function(duration){slideItemsOut=[];var eve={};eve[TRANSITIONEND]=eve[ANIMATIONEND]=onTransitionEnd;removeEvents(slideItems[indexCached],eve);addEvents(slideItems[index],eve);animateSlide(indexCached,animateIn,animateOut,!0);animateSlide(index,animateNormal,animateIn);if(!TRANSITIONEND||!ANIMATIONEND||!duration){onTransitionEnd()}}})();function doTransform(duration,distance){if(isNaN(duration)){duration=speed}
if(animating&&!isVisible(container)){duration=0}
if(TRANSITIONDURATION){setDurations(duration)}
transformCore(duration,distance)}
function render(e,sliderMoved){if(updateIndexBeforeTransform){updateIndex()}
if(index!==indexCached||sliderMoved){events.emit('indexChanged',info());events.emit('transitionStart',info());if(animating&&e&&['click','keydown'].indexOf(e.type)>=0){stopAutoplay()}
running=!0;doTransform()}}
function strTrans(str){return str.toLowerCase().replace(/-/g,'')}
function onTransitionEnd(event){if(carousel||running){events.emit('transitionEnd',info(event));if(!carousel&&slideItemsOut.length>0){for(var i=0;i<items;i++){var item=slideItemsOut[i];item.style.left='';if(TRANSITIONDURATION){setDurations(0,item)}
if(animateDelay&&TRANSITIONDELAY){item.style[TRANSITIONDELAY]=item.style[ANIMATIONDELAY]=''}
removeClass(item,animateOut);addClass(item,animateNormal)}}
if(!event||!carousel&&event.target.parentNode===container||event.target===container&&strTrans(event.propertyName)===strTrans(transformAttr)){if(!updateIndexBeforeTransform){var indexTem=index;updateIndex();if(index!==indexTem){events.emit('indexChanged',info());if(TRANSITIONDURATION){setDurations(0)}
doContainerTransform()}}
runAutoHeight();if(nested==='inner'){events.emit('innerLoaded',info())}
running=!1;navCurrentIndexCached=navCurrentIndex;indexCached=index}}}
function goTo(targetIndex,e){if(freeze){return}
if(targetIndex==='prev'){onControlsClick(e,-1)}else if(targetIndex==='next'){onControlsClick(e,1)}else if(!running){var absIndex=index%slideCount,indexGap=0;if(absIndex<0){absIndex+=slideCount}
if(targetIndex==='first'){indexGap=-absIndex}else if(targetIndex==='last'){indexGap=slideCount-items-absIndex}else{if(typeof targetIndex!=='number'){targetIndex=parseInt(targetIndex)}
if(!isNaN(targetIndex)){var absTargetIndex=targetIndex%slideCount;if(absTargetIndex<0){absTargetIndex+=slideCount}
indexGap=absTargetIndex-absIndex}}
index+=indexGap;if(index%slideCount!==indexCached%slideCount){render(e)}}}
function onControlsClick(e,dir){if(!running){var passEventObject;if(!dir){e=e||win.event;var target=e.target||e.srcElement;while(target!==controlsContainer&&[prevButton,nextButton].indexOf(target)<0){target=target.parentNode}
var targetIn=[prevButton,nextButton].indexOf(target);if(targetIn>=0){passEventObject=!0;dir=targetIn===0?-1:1}}
if(rewind){if(index===indexMin&&dir===-1){goTo('last',e);return}else if(index===indexMax&&dir===1){goTo(0,e);return}}
if(dir){index+=slideBy*dir;render(passEventObject||e&&e.type==='keydown'?e:null)}}}
function onNavClick(e){if(!running){e=e||win.event;var target=e.target||e.srcElement,navIndex;while(target!==navContainer&&!hasAttr(target,'data-nav')){target=target.parentNode}
if(hasAttr(target,'data-nav')){navIndex=navClicked=[].indexOf.call(navItems,target);goTo(navIndex,e)}}}
function setAutoplayTimer(){autoplayTimer=setInterval(function(){onControlsClick(null,autoplayDirection)},autoplayTimeout);animating=!0}
function stopAutoplayTimer(){clearInterval(autoplayTimer);animating=!1}
function updateAutoplayButton(action,txt){setAttrs(autoplayButton,{'data-action':action});autoplayButton.innerHTML=autoplayHtmlStrings[0]+action+autoplayHtmlStrings[1]+txt}
function startAutoplay(){setAutoplayTimer();if(autoplayButton){updateAutoplayButton('stop',autoplayText[1])}}
function stopAutoplay(){stopAutoplayTimer();if(autoplayButton){updateAutoplayButton('start',autoplayText[0])}}
function play(){if(autoplay&&!animating){startAutoplay();autoplayUserPaused=!1}}
function pause(){if(animating){stopAutoplay();autoplayUserPaused=!0}}
function toggleAutoplay(){if(animating){stopAutoplay();autoplayUserPaused=!0}else{startAutoplay();autoplayUserPaused=!1}}
function onVisibilityChange(){if(doc.hidden){if(animating){stopAutoplayTimer();autoplayVisibilityPaused=!0}}else if(autoplayVisibilityPaused){setAutoplayTimer();autoplayVisibilityPaused=!1}}
function mouseoverPause(){if(animating){stopAutoplayTimer();autoplayHoverPaused=!0}}
function mouseoutRestart(){if(autoplayHoverPaused){setAutoplayTimer();autoplayHoverPaused=!1}}
function onDocumentKeydown(e){e=e||win.event;switch(e.keyCode){case KEYS.LEFT:onControlsClick(e,-1);break;case KEYS.RIGHT:onControlsClick(e,1)}}
function onControlsKeydown(e){e=e||win.event;var code=e.keyCode;switch(code){case KEYS.LEFT:case KEYS.UP:case KEYS.PAGEUP:if(!prevButton.disabled){onControlsClick(e,-1)}
break;case KEYS.RIGHT:case KEYS.DOWN:case KEYS.PAGEDOWN:if(!nextButton.disabled){onControlsClick(e,1)}
break;case KEYS.HOME:goTo(0,e);break;case KEYS.END:goTo(slideCount-1,e);break}}
function setFocus(focus){focus.focus()}
function onNavKeydown(e){var curElement=doc.activeElement;if(!hasAttr(curElement,'data-nav')){return}
e=e||win.event;var code=e.keyCode,navIndex=[].indexOf.call(navItems,curElement),len=visibleNavIndexes.length,current=visibleNavIndexes.indexOf(navIndex);if(options.navContainer){len=slideCount;current=navIndex}
function getNavIndex(num){return options.navContainer?num:visibleNavIndexes[num]}
switch(code){case KEYS.LEFT:case KEYS.PAGEUP:if(current>0){setFocus(navItems[getNavIndex(current-1)])}
break;case KEYS.UP:case KEYS.HOME:if(current>0){setFocus(navItems[getNavIndex(0)])}
break;case KEYS.RIGHT:case KEYS.PAGEDOWN:if(current<len-1){setFocus(navItems[getNavIndex(current+1)])}
break;case KEYS.DOWN:case KEYS.END:if(current<len-1){setFocus(navItems[getNavIndex(len-1)])}
break;case KEYS.ENTER:case KEYS.SPACE:navClicked=navIndex;goTo(navIndex,e);break}}
function ie10Scroll(){doTransform(0,container.scrollLeft());indexCached=index}
function getTarget(e){return e.target||e.srcElement}
function isTouchEvent(e){return e.type.indexOf('touch')>=0}
function preventDefaultBehavior(e){if(e.preventDefault){e.preventDefault()}else{e.returnValue=!1}}
function onTouchOrMouseStart(e){if(!running){e=e||win.event;var ev;if(isTouchEvent(e)){ev=e.changedTouches[0];events.emit('touchStart',info(e))}else{ev=e;if(['img','a'].indexOf(getLowerCaseNodeName(getTarget(ev)))>=0){preventDefaultBehavior(ev)}
events.emit('dragStart',info(e))}
startX=parseInt(ev.clientX);startY=parseInt(ev.clientY);translateInit=parseFloat(container.style[transformAttr].replace(transformPrefix,'').replace(transformPostfix,''))}}
function onTouchOrMouseMove(e){if(!running&&startX!==null){e=e||win.event;var ev=isTouchEvent(e)?e.changedTouches[0]:e;disX=parseInt(ev.clientX)-startX;disY=parseInt(ev.clientY)-startY;if(moveDirectionExpected==='?'){moveDirectionExpected=getTouchDirection(toDegree(disY,disX),swipeAngle)===options.axis}
if(moveDirectionExpected&&(Math.abs(disX)>5||Math.abs(disY)>5)){if(isTouchEvent(e)){events.emit('touchMove',info(e))}else{if(!isDragEvent){isDragEvent=!0}
events.emit('dragMove',info(e))}
if(!touchedOrDraged){touchedOrDraged=!0}
var x=translateInit;if(horizontal){if(fixedWidth){x+=disX;x+='px'}else{var percentageX=TRANSFORM?disX*items*100/(vpInner*slideCountNew):disX*100/vpInner;x+=percentageX;x+='%'}}else{x+=disY;x+='px'}
if(TRANSFORM){setDurations(0)}
container.style[transformAttr]=transformPrefix+x+transformPostfix}}}
function onTouchOrMouseEnd(e){if(swipeAngle){moveDirectionExpected='?'}
if(!running){if(touchedOrDraged){touchedOrDraged=!1;e=e||win.event;var ev;if(isTouchEvent(e)){ev=e.changedTouches[0];events.emit('touchEnd',info(e))}else{ev=e;events.emit('dragEnd',info(e))}
disX=parseInt(ev.clientX)-startX;disY=parseInt(ev.clientY)-startY;startX=startY=null;var sliderMoved=Boolean(horizontal?disX:disY);if(horizontal){var indexMoved=-disX*items/vpInner;indexMoved=disX>0?Math.floor(indexMoved):Math.ceil(indexMoved);index+=indexMoved}else{var moved=-(translateInit+disY);if(moved<=0){index=indexMin}else if(moved>=slideOffsetTops[slideOffsetTops.length-1]){index=indexMax}else{var i=0;do{i++;index=disY<0?i+1:i}while(i<slideCountNew&&moved>=slideOffsetTops[i+1]);}}
render(e,sliderMoved);if(isDragEvent){isDragEvent=!1;var target=getTarget(e);addEvents(target,{'click':function preventClick(e){preventDefaultBehavior(e);removeEvents(target,{'click':preventClick})}})}}else{startX=startY=null}}}
function updateContentWrapperHeight(){innerWrapper.style.height=slideOffsetTops[index+items]-slideOffsetTops[index]+'px'}
function getVisibleNavIndex(){visibleNavIndexes=[];var absIndexMin=index%slideCount%items;while(absIndexMin<slideCount){if(!loop&&absIndexMin+items>slideCount){absIndexMin=slideCount-items}
visibleNavIndexes.push(absIndexMin);absIndexMin+=items}
if(loop&&visibleNavIndexes.length*items<slideCount||!loop&&visibleNavIndexes[0]>0){visibleNavIndexes.unshift(0)}}
function updateNavVisibility(){if(!nav||navAsThumbnails){return}
getVisibleNavIndex();if(visibleNavIndexes!==visibleNavIndexesCached){forEachNodeList(navItems,function(el,i){if(visibleNavIndexes.indexOf(i)<0){hideElement(el)}else{showElement(el)}});visibleNavIndexesCached=visibleNavIndexes}}
function info(e){return{container:container,slideItems:slideItems,navContainer:navContainer,navItems:navItems,controlsContainer:controlsContainer,hasControls:hasControls,prevButton:prevButton,nextButton:nextButton,items:items,slideBy:slideBy,cloneCount:cloneCount,slideCount:slideCount,slideCountNew:slideCountNew,index:index,indexCached:indexCached,navCurrentIndex:navCurrentIndex,navCurrentIndexCached:navCurrentIndexCached,visibleNavIndexes:visibleNavIndexes,visibleNavIndexesCached:visibleNavIndexesCached,sheet:sheet,event:e||{},}}
return{getInfo:info,events:events,goTo:goTo,play:play,pause:pause,isOn:isOn,updateSliderHeight:updateInnerWrapperHeight,rebuild:function(){return tns(options)},destroy:function(){removeEvents(win,{'resize':onResize});removeEvents(doc,docmentKeydownEvent);sheet.disabled=!0;if(loop){for(var j=cloneCount;j--;){if(carousel){slideItems[0].remove()}
slideItems[slideItems.length-1].remove()}}
var slideClasses=['tns-item',slideActiveClass];if(!carousel){slideClasses=slideClasses.concat('tns-normal',animateIn)}
for(var i=slideCount;i--;){var slide=slideItems[i];if(slide.id.indexOf(slideId+'-item')>=0){slide.id=''}
slideClasses.forEach(function(cl){removeClass(slide,cl)})}
removeAttrs(slideItems,['style','aria-hidden','tabindex']);slideItems=slideId=slideCount=slideCountNew=cloneCount=null;if(controls){removeEvents(controlsContainer,controlsEvents);if(options.controlsContainer){removeAttrs(controlsContainer,['aria-label','tabindex']);removeAttrs(controlsContainer.children,['aria-controls','aria-disabled','tabindex'])}
controlsContainer=prevButton=nextButton=null}
if(nav){removeEvents(navContainer,navEvents);if(options.navContainer){removeAttrs(navContainer,['aria-label']);removeAttrs(navItems,['aria-selected','aria-controls','tabindex'])}
navContainer=navItems=null}
if(autoplay){clearInterval(autoplayTimer);if(autoplayButton){removeEvents(autoplayButton,{'click':toggleAutoplay})}
removeEvents(container,hoverEvents);removeEvents(container,visibilityEvent);if(options.autoplayButton){removeAttrs(autoplayButton,['data-action'])}}
container.id=containerIdCached||'';container.className=container.className.replace(classContainer,'');removeElementStyles(container);if(carousel&&TRANSITIONEND){var eve={};eve[TRANSITIONEND]=onTransitionEnd;removeEvents(container,eve)}
removeEvents(container,touchEvents);removeEvents(container,dragEvents);containerParent.insertBefore(container,outerWrapper);outerWrapper.remove();outerWrapper=innerWrapper=container=index=indexCached=items=slideBy=navCurrentIndex=navCurrentIndexCached=hasControls=visibleNavIndexes=visibleNavIndexesCached=this.getInfo=this.events=this.goTo=this.play=this.pause=this.destroy=null;this.isOn=isOn=!1}}};return tns})();let productSlider=new tns({container:'.product-slider-trigger',items:4,slideBy:'page',mouseDrag:!0,loop:!1,autoplayHoverPause:!0,responsive:!0,responsive:{0:{controls:!1,items:1},387:{controls:!0,items:2},645:{items:3},740:{items:4}}}),inspirationSlider=new tns({container:'.inspiration-slider-trigger',items:4,slideBy:'page',mouseDrag:!0,loop:!1,controls:!1,nav:!0,autoplayHoverPause:!0,responsive:!0,responsive:{0:{items:1},387:{items:2},645:{items:3},740:{items:4}}})