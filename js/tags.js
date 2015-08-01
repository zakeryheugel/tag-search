$(document).ready(function() {
	setUp();
	var $gearSearch = $("#gear-search"),
	gearOptions = {
		//data: ["Adventure Racing","Archery","Aviation","Biking","Canoeing","Kayaking","Caving","Climbing","Mountaineering","Coasteering","Conservation","Diving","Fire-Walking","Gliding","Go-Karting","Horse-Riding","Paintball","Rafting","Sailing","Skiing","Surfing","Survival","Water-Skiing","Yachting"],
		url: "http://wry.ninja:9601/api/gear",
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
		y = input + x.replace(/\s+/g, '-'),
		z = "http://lmgtfy.com?q="+a.replace(/\s+/g, '\+');//link to tag gained from json object
		if (a) {
			if($( "#"+y ).length==0){
				$("#"+input+"-holder").append("<li id='"+y+"'><a class='tag-link-out' href='"+z+"' target='_blank'>"+b+"</a></li>");
				$( "#"+y ).hide().fadeIn();
				$( "#"+y ).append("<a onclick='removeTag(\""+y+"\")'<button type='submit' class='btn btn-danger tag-close-button'><span class='glyphicon glyphicon-remove remove-Tag'></span></button>");
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

function invalidTag(a) {
	message = "Invalid Tag.";
	$("#"+a).prepend("<div class='tags-error-message'><div></div>")
}
