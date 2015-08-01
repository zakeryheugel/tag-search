$(document).ready(function() {
	setUp();
	var $gearSearch = $("#gear-search"),
	gearOptions = {
		//data: ["Adventure Racing","Archery","Aviation","Biking","Canoeing","Kayaking","Caving","Climbing","Mountaineering","Coasteering","Conservation","Diving","Fire-Walking","Gliding","Go-Karting","Horse-Riding","Paintball","Rafting","Sailing","Skiing","Surfing","Survival","Water-Skiing","Yachting"],
		url: "http://wry.ninja/stylesheets/tags.json",
		getValue: "name",
		list: {
			maxNumberOfElements: 5,
			showAnimation: {type:"slide"},
			hideAnimation: {type:"slide"},
			onClickEvent: function() {createTag("gear-search");}
		},
		highlightPhrase: true,
		cssClasses: ""
	}
	
	

	$gearSearch.easyAutocomplete(gearOptions);
	$gearSearch.keydown(function (e){
		if(e.keyCode == 13){createTag("gear-search");}
	})
	
	var $activitiesSearch = $("#activities-search"),
	activitiesOptions = {
		data: ["Adventure Racing","Archery","Aviation","Biking","Canoeing","Kayaking","Caving","Climbing","Mountaineering","Coasteering","Conservation","Diving","Fire-Walking","Gliding","Go-Karting","Horse-Riding","Paintball","Rafting","Sailing","Skiing","Surfing","Survival","Water-Skiing","Yachting"],
		//url: "resources/tags.json",
		//getValue: "name",
		list: {
			maxNumberOfElements: 5,
			showAnimation: {type:"slide"},
			hideAnimation: {type:"slide"},
			onClickEvent: function() {createTag("activities-search");}
		},
		highlightPhrase: true,
		cssClasses: ""
	}
	
	

	$activitiesSearch.easyAutocomplete(activitiesOptions);
	$activitiesSearch.keydown(function (e){
		if(e.keyCode == 13){createTag("activities-search");}
	})
	
});

//------------------------------------------------------------------------------------------
function setUp() {
	$("#gear-search-wrapper").prepend("<input id='gear-search' class='form-control tag-search' placeholder='Add gear' /><a onclick='createTag(\"gear-search\")'><button type='submit' class='btn btn-success tag-search-button'><i class='glyphicon glyphicon-plus'></i></button></a>");
	$("#activities-search-wrapper").prepend("<input id='activities-search' class='form-control tag-search' placeholder='Add activities' /><a onclick='createTag(\"activities-search\")'><button type='submit' class='btn btn-success tag-search-button'><i class='glyphicon glyphicon-plus'></i></button></a>");
}

function createTag(input) {
	$input = $("#"+input);
	$input.css("border", "");
	
	$("#gear-search-wrapper").popover("destroy");
	
	$unvalidated = $input.val(),
	$validated = $input.val().replace(/[^a-z0-9 + -]/gi, '');
	if($validated === $unvalidated) {
		a = $input.val(),
		b = a.charAt(0).toUpperCase() + a.slice(1),
		x = a.replace(/\+/g, "_").toLowerCase(),
		y = input + x.replace(/\s+/g, '-');
		if (a) {
			if($( "#"+y ).length==0){
				$("#"+input+"-holder").append("<li id='"+y+"'>"+b+"</li>");
				$( "#"+y ).hide().fadeIn();
				$( "#"+y ).append("<a onclick='removeTag(\""+y+"\")'><button type='submit' class='btn btn-danger tag-close-button'><span class='glyphicon glyphicon-remove remove-Tag'></span></button>");
			}
			else {
				$input.css("border", "1px solid red");
				showPopover(input,"Tag already exists.");
			}
		}
		$input.val("")
	}
	else {
		//alert("Invalid tag.");
		$input.css("border", "1px solid red");
		showPopover(input,"Invalid Characters.");
	}
}

	function showPopover(field,message) {
		$field = $("#"+field+"-wrapper")
		$field.attr("data-toggle", "popover");
		$field.attr("data-content", message);
		$field.popover({placement:'right'});
		$field.popover("show");
		$field
			.delay(3000)
			.queue(function(){$field.popover("destroy");});
	}

function removeTag(y) {
	$("#"+y)
		.fadeOut()
		.delay()
		.queue(function(){$( "#"+y ).remove()});
}

function displayTag(tag, location) {
	$location = $("#"+location);

		a = tag
		x = a.replace(/\+/g, "_").toLowerCase(),
		y = location + x.replace(/\s+/g, '-'),
		z = "http://lmgtfy.com?q="+a.replace(/\s+/g, '\+');
		if (a) {
			if($( "#"+y ).length==0){
				$location.append("<li id='"+y+"' class='display-tag'><a class='tag-link-out' href='"+z+"' target='_blank'>"+a+"</a></li>");
				$( "#"+y ).hide().fadeIn();
			}
		}
}

/*
 * easy-autocomplete
 * jQuery plugin for autocompletion
 * 
 * @author Łukasz Pawełczak (http://github.com/pawelczak)
 * @version 1.1.3
 * Copyright MIT License: https://github.com/pawelczak/easy-autocomplete/blob/master/LICENSE.txt
 */
var EasyAutocomplete=function(t){return t.Configuration=function(t){function n(){function n(t,e){var i=t||{};for(var r in t)void 0!==e[r]&&null!==e[r]&&("object"!=typeof e[r]||e[r]instanceof Array?i[r]=e[r]:n(t[r],e[r]));return i}o=n(o,t)}function e(){if("list-required"!==o.url&&"function"!=typeof o.url){var t=o.url;o.url=function(){return t}}if(void 0!==o.ajaxSettings.url&&"function"!=typeof o.ajaxSettings.url){var t=o.ajaxSettings.url;o.ajaxSettings.url=function(){return t}}if("string"==typeof o.listLocation){var n=o.listLocation;o.listLocation=function(t){return t[n]}}if("string"==typeof o.getValue){var e=o.getValue;o.getValue=function(t){return t[e]}}}function i(){o.ajaxSettings=void 0!==t.ajaxSettings&&"object"==typeof t.ajaxSettings?t.ajaxSettings:{}}function r(t){return void 0!==o[t]&&null!==o[t]?!0:!1}var o={data:"list-required",url:"list-required",dataType:"json",listLocation:function(t){return t},getValue:function(t){return t},autocompleteOff:!0,placeholder:!1,ajaxCallback:function(){},matchResponseProperty:!1,list:{sort:{enabled:!0,method:function(t,n){return t=o.getValue(t),n=o.getValue(n),n>t?-1:t>n?1:0}},maxNumberOfElements:6,match:{enabled:!0,caseSensitive:!1,method:function(t,n){return t=o.getValue(t),n=o.getValue(n),t===n?!0:!1}},showAnimation:{type:"normal",time:400,callback:function(){}},hideAnimation:{type:"normal",time:400,callback:function(){}},onClickEvent:function(){},onLoadEvent:function(){},onMouseOverEvent:function(){},onMouseOutEvent:function(){},onEnterEvent:function(){}},highlightPhrase:!0,cssClasses:""};n(),i(),e(),this.get=function(t){return o[t]},this.equals=function(t,n){return r(t)&&o[t]===n?!0:!1},this.checkDataUrlProperties=function(){return"list-required"===o.url&&"list-required"===o.data?!1:!0},this.checkRequiredProperties=function(){for(var t in o)if("required"===o[t])return!1;return!0}},t}(EasyAutocomplete||{});
var EasyAutocomplete=function(t){return t.Constans=function(){var t={CONTAINER_CLASS:"easy-autocomplete-container",CONTAINER_ID:"eac-container-",WRAPPER_CSS_CLASS:"easy-autocomplete"};this.getValue=function(e){return t[e]}},t}(EasyAutocomplete||{});
var EasyAutocomplete=function(e){return e.proccess=function(e,t,r){function s(t,r){var s=[],n="";if(e.get("list").match.enabled)for(var o=0,a=t.length;a>o;o+=1)n=e.get("getValue")(t[o]),e.get("list").match.caseSensitive||("string"==typeof n&&(n=n.toLowerCase()),r=r.toLowerCase()),n.search(r)>-1&&s.push(t[o]);else s=t;return s}function n(t){return t.length>e.get("list").maxNumberOfElements&&(t=t.slice(0,e.get("list").maxNumberOfElements)),t}function o(t){return e.get("list").sort.enabled&&t.sort(e.get("list").sort.method),t}var a=r;return t=s(t,a),t=n(t),t=o(t)},e}(EasyAutocomplete||{});
var EasyAutocomplete=function(e){return e.main=function(t,n){function i(){a(),l()}function a(){function e(){var e=$("<div>"),n=d.getValue("WRAPPER_CSS_CLASS");g.get("cssClasses")&&(n+=" "+g.get("cssClasses")),e.addClass(n),p.wrap(e),t()}function t(){var e=p.outerWidth();p.parent().css("width",e)}function n(){p.unwrap()}function i(){var e=$("<div>").addClass(d.getValue("CONTAINER_CLASS"));e.attr("id",o()).prepend($("<ul>")),function(){e.on("show",function(){switch(g.get("list").showAnimation.type){case"slide":var t=g.get("list").showAnimation.time,n=g.get("list").showAnimation.callback;e.find("ul").slideDown(t,n);break;case"fade":var t=g.get("list").showAnimation.time,n=g.get("list").showAnimation.callback;e.find("ul").fadeIn(t),n;break;default:e.find("ul").show()}}).on("hide",function(){switch(g.get("list").hideAnimation.type){case"slide":var t=g.get("list").hideAnimation.time,n=g.get("list").hideAnimation.callback;e.find("ul").slideUp(t,n);break;case"fade":var t=g.get("list").hideAnimation.time,n=g.get("list").hideAnimation.callback;e.find("ul").fadeOut(t,n);break;default:e.find("ul").hide()}}).on("selectElement",function(){e.find("ul li").removeClass("selected"),e.find("ul li:nth-child("+(y+1)+")").addClass("selected")}).on("loadElements",function(t,n,i){var a="",o=($("<ul>"),e.find("ul"));o.empty().detach();for(var u=0,s=n.length;s>u;u+=1)a=$("<li><div class='eac-item'></div></li>"),function(){var e=u,t=g.get("getValue")(n[e]);a.find(" > div").on("click",function(){p.val(t),r(e),g.get("list").onClickEvent()}).mouseover(function(){y=e,r(e),g.get("list").onMouseOverEvent()}).mouseout(function(){g.get("list").onMouseOutEvent()}).html(l(t,i),n[e])}(),o.append(a);e.empty(),e.append(o),g.get("list").onLoadEvent()})}(),p.after(e)}function a(){p.next("."+d.getValue("CONTAINER_CLASS")).remove()}function l(e,t){return g.get("highlightPhrase")&&""!==t?u(e,t):e}function u(e,t){return(e+"").replace(new RegExp("("+t+")","gi"),"<b>$1</b>")}p.parent().hasClass(d.getValue("WRAPPER_CSS_CLASS"))&&(a(),n()),e(),i(),m=$("#"+o()),g.get("placeholder")&&p.attr("placeholder",g.get("placeholder"))}function o(){var e=p.attr("id");if(void 0===e||null===e){do e=d.getValue("CONTAINER_ID")+Math.rand(1e4);while(0===$("#"+e).length)}else e=d.getValue("CONTAINER_ID")+e;return e}function l(){function e(){v("autocompleteOff",!0)&&l(),t(),n(),i(),a(),o()}function t(){p.off("keyup").keyup(function(e){function t(){function e(e){var t=[];return $(e).find(g.get("xmlElementName")).each(function(){t.push(this)}),t}function t(){var e=new Object,t=g.get("ajaxSettings")||{};for(set in t)e[set]=t[set];return e}function n(e,t){return g.get("matchResponseProperty")!==!1||"string"==typeof g.get("matchResponseProperty")?t[g.get("matchResponseProperty")]==e?!0:!1:!0}var i=p.val();"list-required"!==g.get("data")&&(C=h(g,g.get("data"),p.val()),c(C,i),u());var a=t();(void 0===a.url||""===a.url)&&(a.url=g.get("url")),(void 0===a.dataType||""===a.dataType)&&(a.dataType=g.get("dataType")),void 0!==a.url&&"list-required"!==a.url&&(a.url=a.url(i),$.ajax(a).done(function(t){C=g.get("listLocation")(t),"XML"===g.get("dataType").toUpperCase()&&(C=e(C));var a=C.length;0!==a&&(n(i,t)&&(C=h(g,C,p.val()),c(C,i),u()),g.get("ajaxCallback")())}).fail(function(){}).always(function(){}))}switch(e.keyCode){case 27:s(),f();break;case 38:e.preventDefault(),C.length>0&&y>0&&(y-=1,p.val(g.get("getValue")(C[y])),r(y));break;case 40:e.preventDefault(),C.length>0&&y<C.length-1&&(y+=1,p.val(g.get("getValue")(C[y])),r(y));break;default:(e.keyCode>40||8===e.keyCode)&&t()}})}function n(){p.on("keydown",function(e){e=e||window.event;var t=e.keyCode;return 38===t?(suppressKeypress=!0,!1):void 0}).keydown(function(e){13===e.keyCode&&y>-1&&(p.val(g.get("getValue")(C[y])),y=-1,s(),g.get("list").onClickEvent(),e.preventDefault())})}function i(){p.off("keypress")}function a(){p.focus(function(){""!==p.val()&&C.length>0&&(y=-1,u())})}function o(){p.blur(function(){setTimeout(function(){y=-1,s()},250)})}function l(){p.attr("autocomplete","off")}e()}function u(){m.trigger("show"),r(y)}function s(){m.trigger("hide")}function r(e){m.trigger("selectElement",e)}function c(e,t){m.trigger("loadElements",[e,t])}function f(){p.trigger("blur")}var d=new e.Constans,g=new e.Configuration(n),h=e.proccess,v=g.equals,p=t,m="",C=[],y=-1;this.getConstants=function(){return d},this.getConfiguration=function(){return g},this.getContainer=function(){return m},this.init=function(){i()}},e}(EasyAutocomplete||{});
$.fn.easyAutocomplete=function(options){new EasyAutocomplete.main(this, options).init();};
