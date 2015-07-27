/*
 * easy-autocomplete
 * jQuery plugin for autocompletion
 * 
 * @author Łukasz Pawełczak (http://github.com/pawelczak)
 * @version 1.1.3
 * Copyright MIT License: https://github.com/pawelczak/easy-autocomplete/blob/master/LICENSE.txt
 */

/*
 * EasyAutocomplete - Configuration 
 */
var EasyAutocomplete = (function(scope){//options defaults

	scope.Configuration = function Configuration(options) {
		var defaults = {
			data: "list-required",
			url: "list-required",
			dataType: "json",

			listLocation: function(data) {
				return data;
			},

			//xmlElementName: "",

			getValue: function(element) {
				return element;
			},

			autocompleteOff: true,

			placeholder: false,

			ajaxCallback: function() {},

			matchResponseProperty: false,


			list: {
				sort: {
					enabled: true,
					method: function(a, b) {
						a = defaults.getValue(a);
						b = defaults.getValue(b);
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				},

				maxNumberOfElements: 6,

				match: {
					enabled: true,
					caseSensitive: false,
					method: function(a, b) {
						a = defaults.getValue(a);
						b = defaults.getValue(b);

						if (a === b){
							return true;
						}  
						return false;
					}
				},

				showAnimation: {
					type: "normal", //normal|slide|fade
					time: 400,
					callback: function() {}
				},

				hideAnimation: {
					type: "normal",//normal|slide|fade
					time: 400,
					callback: function() {}
				},

				/* Events */
				
				onClickEvent: function() {},//when an item is clicked
				onLoadEvent: function() {},//when items are displayed
				onMouseOverEvent: function() {},
				onMouseOutEvent: function() {},	
				onEnterEvent: function() {},
			},

			highlightPhrase: true,

			cssClasses: ""//additional css classes to be added to wrapper div

		};

		mergeOptions();

		addAjaxSettings();

		processAfterMerge();
		

		this.get = function(propertyName) {
			return defaults[propertyName];
		};

		this.equals = function(name, value) {
			if (isAssigned(name)) {
				if (defaults[name] === value) {
					return true;
				}
			} 
			
			return false;
		};

		this.checkDataUrlProperties = function() {
			if (defaults.url === "list-required" && defaults.data === "list-required") {
				return false;
			}
			return true;
		};
		this.checkRequiredProperties = function() {
			for (var propertyName in defaults) {
				if (defaults[propertyName] === "required") {
					return false;
				}
			}
			return true;
		};

		function mergeOptions() {

			defaults = mergeObjects(defaults, options);

			function mergeObjects(source, target) {
				var mergedObject = source || {};

				for (var propertyName in source) {
					if (target[propertyName] !== undefined && target[propertyName] !== null) {

						if (typeof target[propertyName] !== "object" || 
								target[propertyName] instanceof Array) {
							mergedObject[propertyName] = target[propertyName];		
						} else {
							mergeObjects(source[propertyName], target[propertyName]);
						}
					}
				}
				
				return mergedObject;
			}
		}	


		function processAfterMerge() {

			if (defaults.url !== "list-required" && typeof defaults.url !== "function") {
				var defaultUrl = defaults.url;
				defaults.url = function() {
					return defaultUrl;
				};
			}

			if (defaults.ajaxSettings.url !== undefined && typeof defaults.ajaxSettings.url !== "function") {
				var defaultUrl = defaults.ajaxSettings.url;
				defaults.ajaxSettings.url = function() {
					return defaultUrl;
				};
			}

			if (typeof defaults.listLocation === "string") {
				var defaultlistLocation = defaults.listLocation;
				defaults.listLocation = function(data) {
					return data[defaultlistLocation];
				};
			}

			if (typeof defaults.getValue === "string") {
				var defaultsGetValue = defaults.getValue;
				defaults.getValue = function(element) {
					return element[defaultsGetValue];
				};
			}

		}

		function addAjaxSettings() {

			if (options.ajaxSettings !== undefined && typeof options.ajaxSettings === "object") {
				defaults.ajaxSettings = options.ajaxSettings;
			} else {
				defaults.ajaxSettings = {};	
			}
			
		}

		function isAssigned(name) {
			if (defaults[name] !== undefined && defaults[name] !== null) {
				return true;
			} else {
				return false;
			}
		}
	};

	return scope;

})(EasyAutocomplete || {});

/*
 * EasyAutocomplete - Constans
 */
var EasyAutocomplete = (function(scope){//class and id handles
	
	scope.Constans = function Constans() {
		var constants = {
			CONTAINER_CLASS: "easy-autocomplete-container",
			CONTAINER_ID: "eac-container-",//will have numbers added after it

			WRAPPER_CSS_CLASS: "easy-autocomplete"
		};

		this.getValue = function(propertyName) {
			return constants[propertyName];
		};

	};

	return scope;

})(EasyAutocomplete || {});

/*
 * EasyAutocomplete - Data proccess module
 *
 * Process list to display:
 * - sort 
 * - decrease number to specific number
 * - show only matching list
 *
 */
var EasyAutocomplete = (function(scope) {//process data

	scope.proccess = function proccessData(config, list, phrase) {

		var inputPhrase = phrase;//TODO REFACTOR

		list = findMatch(list, inputPhrase);
		list = reduceElementsInList(list);
		list = sort(list);

		return list;


		function findMatch(list, phrase) {//create list with any matches found
			var preparedList = [],
				value = "";

			if (config.get("list").match.enabled) {//check for matches, if there are matches, they are the new list; if not, then the whole list 

				for(var i = 0, length = list.length; i < length; i += 1) {//look for matches in list, add them to list

					value = config.get("getValue")(list[i]);
					
					if (!config.get("list").match.caseSensitive) {//if caseSensitive is off, convert to lowercase

						if (typeof value === "string") {
							value = value.toLowerCase();	
						}
						
						phrase = phrase.toLowerCase();
					}
					if (value.search(phrase) > -1) {//if phrase is found in an item, push that item to preparedList
						preparedList.push(list[i]);
					}
					
				}

			} else {
				preparedList = list;
			}

			return preparedList;
		}

		function reduceElementsInList(list) {//trim list to maxNumberOfElements
			if (list.length > config.get("list").maxNumberOfElements) {
				list = list.slice(0, config.get("list").maxNumberOfElements);
			}

			return list;
		}

		function sort(list) {//sort it
			if (config.get("list").sort.enabled) {
				list.sort(config.get("list").sort.method);
			}

			return list;
		}
		
	};

	return scope;



})(EasyAutocomplete || {});

/*
 * EasyAutocomplete - jQuery plugin for autocompletion
 *
 */
var EasyAutocomplete = (function(scope) {//CORE
	
	scope.main = function Core($input, options) {
		var consts = new scope.Constans(),
			config = new scope.Configuration(options),
			proccessResponseData = scope.proccess,
			checkParam = config.equals,
			$field = $input, 
			$container = "",
			elementsList = [],
			selectedElement = -1;
		this.getConstants = function() {return consts;};
		this.getConfiguration = function() {return config;};
		this.getContainer = function() {return $container;};
		this.init = function() {init();};
		function init() {
			prepareField();
			bindEvents();	
		}
		function prepareField() {//displays results
				
			if ($field.parent().hasClass(consts.getValue("WRAPPER_CSS_CLASS"))) {//if element has container and wrapper generated by this script, remove
				removeContainer();
				removeWrapper();
			} 
			
			createWrapper();
			createContainer();	

			$container = $("#" + getContainerId());
			
			if (config.get("placeholder")) {//if placeholder exists, put it in $field
				$field.attr("placeholder", config.get("placeholder"));
			}


			function createWrapper() {//creates wrapper div around the input, and runs adjustWrapperWidth()
				var $wrapper = $("<div>"),
					classes = consts.getValue("WRAPPER_CSS_CLASS");

				if (config.get("cssClasses")) {//if cssClasses is not empty, add them to classes
					classes += " " + config.get("cssClasses");
				}

				$wrapper.addClass(classes);
				$field.wrap($wrapper);


				adjustWrapperWidth();

			}

			function adjustWrapperWidth() {//adjusts width of wrapper to width of field
				var fieldWidth = $field.outerWidth();

				$field.parent().css("width", fieldWidth);				
			}

			function removeWrapper() {//removes wrapper div
				$field.unwrap();
			}

			function createContainer() {//creates container and displays results
				var $elements_container = $("<div>").addClass(consts.getValue("CONTAINER_CLASS"));

				$elements_container
						.attr("id", getContainerId())
						.prepend($("<ul>"));


				(function() {//define results, animate and display results
					$elements_container
						.on("show", function() {//cases for show animation revisit

							switch(config.get("list").showAnimation.type) {

								case "slide":
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").slideDown(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").fadeIn(animationTime), callback;
								break;

								default:
									$elements_container.find("ul").show();
								break;
							}
							
						})
						.on("hide", function() {//cases for hide animation revisit

							switch(config.get("list").hideAnimation.type) {

								case "slide":
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").slideUp(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").fadeOut(animationTime, callback);
								break;

								default:
									$elements_container.find("ul").hide();
								break;
							}
						})
						.on("selectElement", function(event, selected) {//when a list item is selected, add the selected class to it
							$elements_container.find("ul li").removeClass("selected");//remove selected class from all list items
							$elements_container.find("ul li:nth-child(" + (selectedElement + 1) + ")").addClass("selected");//add selected class to the appropriate item
						})
						.on("loadElements", function(event, list, phrase) {//define and display results

						var $item = "",
								$list = $("<ul>"),
								$listContainer = $elements_container.find("ul");

							$listContainer.empty().detach();//clear results


							for(var i = 0, length = list.length; i < length; i += 1) {//define results, add event handlers
								$item = $("<li><div class='eac-item'></div></li>");
								

								(function() {//event handler
									var j = i,
										elementsValue = config.get("getValue")(list[j]);

									$item.find(" > div")
										.on("click", function() {//onclick

											$field.val(elementsValue);
											selectElement(j);

											config.get("list").onClickEvent();//call the onClickEvent defined in options
										})
										.mouseover(function() {//onmouseover

											selectedElement = j;
											selectElement(j);	

											config.get("list").onMouseOverEvent();//call the onMouseOverEvent defined in options
										})
										.mouseout(function() {//onmouseout
											config.get("list").onMouseOutEvent();//call the onMouseOutEvent defined in options
										})
										.html(highlight(elementsValue, phrase), list[j]);
								})();

								$listContainer.append($item);
								
							}

							$elements_container.empty();//visually clear the results

							$elements_container.append($listContainer);//display the results

							config.get("list").onLoadEvent();//call the onLoadEvent defined in options (empty by default)
						});
				})();

				$field.after($elements_container);//inserts results after the input field
			}

			function removeContainer() {//removes container after input field
				$field.next("." + consts.getValue("CONTAINER_CLASS")).remove();
			}

			function highlight(string, phrase) {//check if any phrases match, if they do: highlightPhrase()

				if(config.get("highlightPhrase") && phrase !== "") {
					return highlightPhrase(string, phrase);	
				} else {
					return string;
				}
					
			}

			function highlightPhrase(string, phrase) {//replaces phrase with a bold version
				return (string + "").replace(new RegExp("(" + phrase + ")", "gi") , "<b>$1</b>");
			}



		}
		function getContainerId() {//gets the container id, if it does not exist, do random calculation until one is found.
			
			var elementId = $field.attr("id");

			if (elementId === undefined || elementId === null) {
				
				do {
					elementId = consts.getValue("CONTAINER_ID") + Math.rand(10000);	
				} while($("#" + elementId).length === 0);

			} else {
				elementId = consts.getValue("CONTAINER_ID") + elementId;
			}

			return elementId;
		}
		function bindEvents() {//binds keys for moving around the results. revisit to add enter key functionality

			bindAllEvents();
			

			function bindAllEvents() {
				if (checkParam("autocompleteOff", true)) {
					removeAutocomplete();
				}

				bindKeyup();
				bindKeydown();
				bindKeypress();
				bindFocus();
				bindBlur();
			}

			function bindKeyup() {//on up arrow
				$field
				.off("keyup")
				.keyup(function(event) {

					switch(event.keyCode) {

						case 27:

							hideContainer();
							loseFieldFocus();
						break;

						case 38:

							event.preventDefault();

							if(elementsList.length > 0 && selectedElement > 0) {

								selectedElement -= 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);

							}						
						break;

						case 40:

							event.preventDefault();

							if(elementsList.length > 0 && selectedElement < elementsList.length - 1) {

								selectedElement += 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);
								
							}

						break;

						default:

							if (event.keyCode > 40 || event.keyCode === 8) {
								loadData();	
							}
							

						break;
					}
				

					function loadData() {

						var inputPhrase = $field.val();

						if (config.get("data") !== "list-required") {
							
							elementsList = proccessResponseData(config, config.get("data"), $field.val());

							loadElements(elementsList, inputPhrase);

							showContainer();

						}

						var settings = createAjaxSettings();

						if (settings.url === undefined || settings.url === "") {
							settings.url = config.get("url");
						}

						if (settings.dataType === undefined || settings.dataType === "") {
							settings.dataType = config.get("dataType");
						}


						if (settings.url !== undefined && settings.url !== "list-required") {

							settings.url = settings.url(inputPhrase);

							$.ajax(settings) 
								.done(function(data) {

									elementsList = config.get("listLocation")(data);

									
									if(config.get("dataType").toUpperCase() === "XML") {
										elementsList = convertXmlToList(elementsList);
									}

									var length = elementsList.length;

									if (length === 0) {
										return;
									}
									

									if (checkInputPhraseMatchResponse(inputPhrase, data)) {

										elementsList = proccessResponseData(config, elementsList, $field.val());

										loadElements(elementsList, inputPhrase);	
										
										showContainer();
									}


									config.get("ajaxCallback")();

								})
								.fail(function() {})
								.always(function() {});
						}

						function convertXmlToList(list) {
							var simpleList = [];

							$(list).find(config.get("xmlElementName")).each(function() {
								simpleList.push(this);
							});

							return simpleList;
						}

						function createAjaxSettings() {

							var settings = new Object(),
								ajaxSettings = config.get("ajaxSettings") || {};

							for (set in ajaxSettings) {
								settings[set] = ajaxSettings[set];
							}

							return settings;
						}

						function checkInputPhraseMatchResponse(inputPhrase, data) {

							if (config.get("matchResponseProperty") !== false || typeof config.get("matchResponseProperty") === "string") {

								if (data[config.get("matchResponseProperty")] == inputPhrase) {
									return true;
								} else {
									return false;
								}

							} else {
								return true;
							}

						}


					}


				});
			}

			function bindKeydown() {//on down arrow
				$field
					.on("keydown", function(evt) {
	        		    evt = evt || window.event;
	        		    var keyCode = evt.keyCode;
	        		    if (keyCode === 38) {
	        		        suppressKeypress = true; 
	        		        return false;
	        		    }
		        	})
					.keydown(function(event) {

					if (event.keyCode === 13 && selectedElement > -1) {

						$field.val(config.get("getValue")(elementsList[selectedElement]));
						selectedElement = -1;
						hideContainer();
						config.get("list").onClickEvent();//call the onClickEvent defined in options

						event.preventDefault();
					}
				});
			}

			function bindKeypress() {//prevents all other keypresses from doing anything
				$field
				.off("keypress");
			}

			function bindFocus() {//if field is not empty, and results are found, show them and select none
				$field.focus(function() {

					if ($field.val() !== "" && elementsList.length > 0) {
						
						selectedElement = -1;
						showContainer();	
					}
									
				});
			}

			function bindBlur() {//hide the results
				$field.blur(function() {
					setTimeout(function() { 
						
						selectedElement = -1;
						hideContainer();
					}, 250);
				});
			}

			function removeAutocomplete() {//remove Autocomplete
				$field.attr("autocomplete","off");
			}

		}
		function showContainer() {//shows results
			$container.trigger("show");
			selectElement(selectedElement);
		}
		function hideContainer() {//hides results
			$container.trigger("hide");
		}
		function selectElement(index) {//selects the appropriate element
			
			$container.trigger("selectElement", index);
		}
		function loadElements(list, phrase) {//loads results
			$container.trigger("loadElements", [list, phrase]);
		}
		function loseFieldFocus() {//hides results
			$field.trigger("blur");
		}
	};

	return scope;
})(EasyAutocomplete || {});


$.fn.easyAutocomplete = function(options) {
	new EasyAutocomplete.main(this, options).init();
};

//config.get("list").onClickEvent();//call the onClickEvent defined in options