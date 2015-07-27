$(document).ready(function() {
	setUp();
	var $gearSearch = $("#gear-search"),
	gearOptions = {
		//data: ["Adventure Racing","Archery","Aviation","Biking","Canoeing","Kayaking","Caving","Climbing","Mountaineering","Coasteering","Conservation","Diving","Fire-Walking","Gliding","Go-Karting","Horse-Riding","Paintball","Rafting","Sailing","Skiing","Surfing","Survival","Water-Skiing","Yachting"],
		url: "resources/tags.json",
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
	
	var $otherSearch = $("#other-search"),
	otherOptions = {
		data: ["Adventure Racing","Archery","Aviation","Biking","Canoeing","Kayaking","Caving","Climbing","Mountaineering","Coasteering","Conservation","Diving","Fire-Walking","Gliding","Go-Karting","Horse-Riding","Paintball","Rafting","Sailing","Skiing","Surfing","Survival","Water-Skiing","Yachting"],
		//url: "resources/tags.json",
		//getValue: "name",
		list: {
			maxNumberOfElements: 5,
			showAnimation: {type:"slide"},
			hideAnimation: {type:"slide"},
			onClickEvent: function() {createTag("other-search");}
		},
		highlightPhrase: true,
		cssClasses: ""
	}
	
	

	$otherSearch.easyAutocomplete(otherOptions);
	$otherSearch.keydown(function (e){
		if(e.keyCode == 13){createTag("other-search");}
	})
});

//------------------------------------------------------------------------------------------
function setUp() {
	$("#gear-search-wrapper").prepend("<input id='gear-search' class='form-control tag-search' placeholder='Add gear!' /><a onclick='createTag(\"gear-search\")'><button type='submit' class='btn tag-search-button'><i class='glyphicon glyphicon-plus'></i></button></a>");
	$("#other-search-wrapper").prepend("<input id='other-search' class='form-control tag-search' placeholder='Add other!' /><a onclick='createTag(\"other-search\")'><button type='submit' class='btn tag-search-button'><i class='glyphicon glyphicon-plus'></i></button></a>");
}

function createTag(input) {
	//input = "gear-search";
	$input = $("#"+input);
	$input.css("border", "");
	$unvalidated = $input.val(),
	$validated = $input.val().replace(/[^a-z0-9 + -]/gi, '');
	if($validated === $unvalidated) {
		a = $input.val(),
		x = a.replace(/\+/g, "_"),
		y = x.replace(/\s+/g, '-'),
		z = 0;//link to tag gained from json object
		if (a) {
			if($( "#"+y ).length==0){
				$("#"+input+"-holder").append("<li id='"+y+"'>"+a+"</li>");
				$( "#"+y ).hide().fadeIn();
				$( "#"+y ).append("<a onclick='removeTag(\""+y+"\")'<button type='submit' class='btn' id='tag-close-button'><span class='glyphicon glyphicon-remove remove-Tag'></span></button>");
			}
		}
		$input.val("")
	}
	else {
		//alert("Invalid tag.");
		$input.css("border", "1px solid red");
	}
}

function removeTag(y) {
	$("#"+y)
		.fadeOut()
		.delay()
		.queue(function(){$( "#"+y ).remove()})
}
