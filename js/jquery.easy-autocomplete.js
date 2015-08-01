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
<<<<<<< HEAD
var EasyAutocomplete = (function(scope){
=======
var EasyAutocomplete = (function(scope){//options defaults
>>>>>>> origin/master

	scope.Configuration = function Configuration(options) {
		var defaults = {
			data: "list-required",
			url: "list-required",
			dataType: "json",

			listLocation: function(data) {
				return data;
			},

<<<<<<< HEAD
			xmlElementName: "",
=======
			//xmlElementName: "",
>>>>>>> origin/master

			getValue: function(element) {
				return element;
			},

			autocompleteOff: true,

			placeholder: false,

			ajaxCallback: function() {},

			matchResponseProperty: false,


			list: {
				sort: {
<<<<<<< HEAD
					enabled: false,
=======
					enabled: true,
>>>>>>> origin/master
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
<<<<<<< HEAD
					enabled: false,
=======
					enabled: true,
>>>>>>> origin/master
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
<<<<<<< HEAD
					type: "normal",
=======
					type: "normal",//normal|slide|fade
>>>>>>> origin/master
					time: 400,
					callback: function() {}
				},

<<<<<<< HEAD
				topBar: function(phrase) {
				},

				bottomBar: function(phrase) {
				},

				/* Events */
				
				onClickEvent: function() {var l = $("#provider-file").val();createTag(l);},
				onLoadEvent: function() {},
				onMouseOverEvent: function() {},
				onMouseOutEvent: function() {},	

=======
				/* Events */
				
				onClickEvent: function() {},//when an item is clicked
				onLoadEvent: function() {},//when items are displayed
				onMouseOverEvent: function() {},
				onMouseOutEvent: function() {},	
				onEnterEvent: function() {},
>>>>>>> origin/master
			},

			highlightPhrase: true,

<<<<<<< HEAD
			theme: "",

			cssClasses: ""

		};

		prepareDefaults();

=======
			cssClasses: ""//additional css classes to be added to wrapper div

		};

>>>>>>> origin/master
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
<<<<<<< HEAD
					logger.error("Option " + propertyName + " must be defined");
=======
>>>>>>> origin/master
					return false;
				}
			}
			return true;
		};
<<<<<<< HEAD
		function prepareDefaults() {

			if (options.dataType === "xml") {
				
				if (!options.getValue) {

					options.getValue = function(element) {
						return $(element).text();
					};
				}

				
				if (!options.list) {

					options.list = {};
				} 

				if (!options.list.sort) {
					options.list.sort = {};
				}


				options.list.sort.method = function(a, b) {
					a = options.getValue(a);
					b = options.getValue(b);
					if (a < b) {
						return -1;
					}
					if (a > b) {
						return 1;
					}
					return 0;
				};

				if (!options.list.match) {
					options.list.match = {};
				}

				options.list.match.method = function(a, b) {
					a = options.getValue(a);
					b = options.getValue(b);

					if (a === b){
						return true;
					}  
					return false;
				};

			}
		}
=======
>>>>>>> origin/master

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

<<<<<<< HEAD

/*
 * EasyAutocomplete - Logger 
 */
var EasyAutocomplete = (function(scope){
	
	scope.Logger = function Logger() {
		var logger = {};

		this.error = function(message) {
			console.log("ERROR: " + message);
		}

		this.warning = function(message) {
			console.log("WARNING: " + message);
		}
	};

	return scope;

})(EasyAutocomplete || {});
	

/*
 * EasyAutocomplete - Constans
 */
var EasyAutocomplete = (function(scope){	
=======
/*
 * EasyAutocomplete - Constans
 */
var EasyAutocomplete = (function(scope){//class and id handles
>>>>>>> origin/master
	
	scope.Constans = function Constans() {
		var constants = {
			CONTAINER_CLASS: "easy-autocomplete-container",
<<<<<<< HEAD
			CONTAINER_ID: "eac-container-",
=======
			CONTAINER_ID: "eac-container-",//will have numbers added after it
>>>>>>> origin/master

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
<<<<<<< HEAD
var EasyAutocomplete = (function(scope) {
=======
var EasyAutocomplete = (function(scope) {//process data
>>>>>>> origin/master

	scope.proccess = function proccessData(config, list, phrase) {

		var inputPhrase = phrase;//TODO REFACTOR

		list = findMatch(list, inputPhrase);
		list = reduceElementsInList(list);
		list = sort(list);

		return list;


<<<<<<< HEAD
		function findMatch(list, phrase) {
			var preparedList = [],
				value = "";

			if (config.get("list").match.enabled) {

				for(var i = 0, length = list.length; i < length; i += 1) {

					value = config.get("getValue")(list[i]);
					
					if (!config.get("list").match.caseSensitive) {
=======
		function findMatch(list, phrase) {//create list with any matches found
			var preparedList = [],
				value = "";

			if (config.get("list").match.enabled) {//check for matches, if there are matches, they are the new list; if not, then the whole list 

				for(var i = 0, length = list.length; i < length; i += 1) {//look for matches in list, add them to list

					value = config.get("getValue")(list[i]);
					
					if (!config.get("list").match.caseSensitive) {//if caseSensitive is off, convert to lowercase
>>>>>>> origin/master

						if (typeof value === "string") {
							value = value.toLowerCase();	
						}
						
						phrase = phrase.toLowerCase();
					}
<<<<<<< HEAD
					if (value.search(phrase) > -1) {
=======
					if (value.search(phrase) > -1) {//if phrase is found in an item, push that item to preparedList
>>>>>>> origin/master
						preparedList.push(list[i]);
					}
					
				}

			} else {
				preparedList = list;
			}

			return preparedList;
		}

<<<<<<< HEAD
		function reduceElementsInList(list) {
=======
		function reduceElementsInList(list) {//trim list to maxNumberOfElements
>>>>>>> origin/master
			if (list.length > config.get("list").maxNumberOfElements) {
				list = list.slice(0, config.get("list").maxNumberOfElements);
			}

			return list;
		}

<<<<<<< HEAD
		function sort(list) {
=======
		function sort(list) {//sort it
>>>>>>> origin/master
			if (config.get("list").sort.enabled) {
				list.sort(config.get("list").sort.method);
			}

			return list;
		}
		
	};

	return scope;



})(EasyAutocomplete || {});

<<<<<<< HEAD

/*
 * EasyAutocomplete - Template 
 *
 * 
 *
 */
var EasyAutocomplete = (function(scope){

	scope.Template = function Template(options) {


		var genericTemplates = {
			basic: {
				type: "basic",
				method: function(element) { return element; }
			},
			description: {
				type: "description",
				fields: {
					description: "description"
				},
				method: function(element) {	return element + " - description"; },
				cssClass: "eac-description"
			},
			iconLeft: {
				type: "iconLeft",
				fields: {
					icon: ""
				},
				method: function(element) {
					return element;
				},
				cssClass: "eac-icon-left"
			},
			iconRight: {
				type: "iconRight",
				fields: {
					iconSrc: ""
				},
				method: function(element) {
					return element;
				},
				cssClass: "eac-icon-right"
			},
			custom: {
				type: "custom",
				method: function() {}
			}
		},



		/*
		 * Converts method with {{text}} to function
		 */
		convertTemplateToMethod = function(template) {


			var _fields = template.fields;

			if (template.type === "description") {

				var buildMethod = function(elementValue, element) {
					return elementValue + " - <span>" + element[_fields.description] + "</span>";
				};


				return buildMethod;

			}

			if (template.type === "iconRight") {

				var buildMethod = "";

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" ;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" ;
					};
				}

				return buildMethod;
			}


			if (template.type === "iconLeft") {

				var buildMethod = "";

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" + elementValue ;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" + elementValue;
					};
				}

				return buildMethod;
			}


			if (template.type === "custom") {

				return template.method;
			}

			return genericTemplates.basic.method;

		}


		prepareBuildMethod = function(options) {
			if (!options || !options.type) {

				return genericTemplates.basic.method;
			}

			if (options.type && genericTemplates[options.type]) {

				return convertTemplateToMethod(options);
			} else {

				return genericTemplates.basic.method;
			}

		},

		templateClass = function(options) {
			var emptyStringFunction = function() {return "";};

			if (!options || !options.type) {

				return emptyStringFunction;
			}

			if (options.type && genericTemplates[options.type]) {
				return (function (){ 
					var _cssClass = genericTemplates[options.type].cssClass;
					return function() { return _cssClass;}
				})();
			} else {
				return emptyStringFunction;
			}
		};


		this.getTemplateClass = templateClass(options);

		this.build = prepareBuildMethod(options);


	}

	return scope;

})(EasyAutocomplete || {});


=======
>>>>>>> origin/master
/*
 * EasyAutocomplete - jQuery plugin for autocompletion
 *
 */
<<<<<<< HEAD
var EasyAutocomplete = (function(scope) {

	
	scope.main = function Core($input, options) {
				
		var module = {
				name: "EasyAutocomplete"
			};

		var consts = new scope.Constans(),
			config = new scope.Configuration(options),
			logger = new scope.Logger(),
			template = new scope.Template(options.template),
			proccessResponseData = scope.proccess,
			checkParam = config.equals,

=======
var EasyAutocomplete = (function(scope) {//CORE
	
	scope.main = function Core($input, options) {
		var consts = new scope.Constans(),
			config = new scope.Configuration(options),
			proccessResponseData = scope.proccess,
			checkParam = config.equals,
>>>>>>> origin/master
			$field = $input, 
			$container = "",
			elementsList = [],
			selectedElement = -1;
<<<<<<< HEAD

		this.getConstants = function() {
			return consts;
		};

		this.getConfiguration = function() {
			return config;
		};

		this.getContainer = function() {
			return $container;
		};

		this.build = function() {
			prepareField();
		};

		this.init = function() {
			init();
		};
		function init() {


			if (!config.checkDataUrlProperties()) {
				logger.error("One of options variables 'data' or 'url' must be defined.");
				return;
			}

			if (!config.checkRequiredProperties()) {
				logger.error("Will not work without mentioned properties.");
				return;
			}


			prepareField();
			bindEvents();	

		}
		function prepareField() {

				
			if ($field.parent().hasClass(consts.getValue("WRAPPER_CSS_CLASS"))) {
=======
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
>>>>>>> origin/master
				removeContainer();
				removeWrapper();
			} 
			
			createWrapper();
			createContainer();	

			$container = $("#" + getContainerId());
<<<<<<< HEAD
			if (config.get("placeholder")) {
=======
			
			if (config.get("placeholder")) {//if placeholder exists, put it in $field
>>>>>>> origin/master
				$field.attr("placeholder", config.get("placeholder"));
			}


<<<<<<< HEAD
			function createWrapper() {
				var $wrapper = $("<div>"),
					classes = consts.getValue("WRAPPER_CSS_CLASS");

			
				if (config.get("theme")) {
					classes += " eac-" + config.get("theme");
				}

				if (config.get("cssClasses")) {
					classes += " " + config.get("cssClasses");
				}

				if (template.getTemplateClass() !== "") {
					classes += " " + template.getTemplateClass();
				}
				

				$wrapper
					.addClass(classes);
=======
			function createWrapper() {//creates wrapper div around the input, and runs adjustWrapperWidth()
				var $wrapper = $("<div>"),
					classes = consts.getValue("WRAPPER_CSS_CLASS");

				if (config.get("cssClasses")) {//if cssClasses is not empty, add them to classes
					classes += " " + config.get("cssClasses");
				}

				$wrapper.addClass(classes);
>>>>>>> origin/master
				$field.wrap($wrapper);


				adjustWrapperWidth();

			}

<<<<<<< HEAD
			function adjustWrapperWidth() {
=======
			function adjustWrapperWidth() {//adjusts width of wrapper to width of field
>>>>>>> origin/master
				var fieldWidth = $field.outerWidth();

				$field.parent().css("width", fieldWidth);				
			}

<<<<<<< HEAD
			function removeWrapper() {
				$field.unwrap();
			}

			function createContainer() {
=======
			function removeWrapper() {//removes wrapper div
				$field.unwrap();
			}

			function createContainer() {//creates container and displays results
>>>>>>> origin/master
				var $elements_container = $("<div>").addClass(consts.getValue("CONTAINER_CLASS"));

				$elements_container
						.attr("id", getContainerId())
						.prepend($("<ul>"));


<<<<<<< HEAD
				(function() {

					$elements_container
						/* List show animation */
						.on("show", function() {
=======
				(function() {//define results, animate and display results
					$elements_container
						.on("show", function() {//cases for show animation revisit
>>>>>>> origin/master

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
<<<<<<< HEAD
						/* List hide animation */
						.on("hide", function() {
=======
						.on("hide", function() {//cases for hide animation revisit
>>>>>>> origin/master

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
<<<<<<< HEAD
						.on("selectElement", function(event, selected) {
							$elements_container.find("ul li").removeClass("selected");
							$elements_container.find("ul li:nth-child(" + (selectedElement + 1) + ")").addClass("selected");
						})
						.on("loadElements", function(event, list, phrase) {
			

							var $item = "",
								$list = $("<ul>"),
								$listContainer = $elements_container.find("ul");

							$listContainer
								.empty()
								.detach();


							for(var i = 0, length = list.length; i < length; i += 1) {
								$item = $("<li><div class='eac-item'></div></li>");
								

								(function() {
=======
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
>>>>>>> origin/master
									var j = i,
										elementsValue = config.get("getValue")(list[j]);

									$item.find(" > div")
<<<<<<< HEAD
										.on("click", function() {
=======
										.on("click", function() {//onclick
>>>>>>> origin/master

											$field.val(elementsValue);
											selectElement(j);

<<<<<<< HEAD
											config.get("list").onClickEvent();
										})
										.mouseover(function() {
=======
											config.get("list").onClickEvent();//call the onClickEvent defined in options
										})
										.mouseover(function() {//onmouseover
>>>>>>> origin/master

											selectedElement = j;
											selectElement(j);	

<<<<<<< HEAD
											config.get("list").onMouseOverEvent();
										})
										.mouseout(function() {
											config.get("list").onMouseOutEvent();
										})
										.html(template.build(highlight(elementsValue, phrase), list[j]));
=======
											config.get("list").onMouseOverEvent();//call the onMouseOverEvent defined in options
										})
										.mouseout(function() {//onmouseout
											config.get("list").onMouseOutEvent();//call the onMouseOutEvent defined in options
										})
										.html(highlight(elementsValue, phrase), list[j]);
>>>>>>> origin/master
								})();

								$listContainer.append($item);
								
							}

<<<<<<< HEAD
							$elements_container.empty();

							$elements_container.append(config.get("list").topBar(phrase));

							$elements_container.append($listContainer);

							$elements_container.append(config.get("list").bottomBar(phrase));


							config.get("list").onLoadEvent();
						});

				})();

				$field.after($elements_container);
			}

			function removeContainer() {
				$field.next("." + consts.getValue("CONTAINER_CLASS")).remove();
			}

			function highlight(string, phrase) {
=======
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
>>>>>>> origin/master

				if(config.get("highlightPhrase") && phrase !== "") {
					return highlightPhrase(string, phrase);	
				} else {
					return string;
				}
					
			}

<<<<<<< HEAD
			function highlightPhrase(string, phrase) {
=======
			function highlightPhrase(string, phrase) {//replaces phrase with a bold version
>>>>>>> origin/master
				return (string + "").replace(new RegExp("(" + phrase + ")", "gi") , "<b>$1</b>");
			}



		}
<<<<<<< HEAD
		function getContainerId() {
=======
		function getContainerId() {//gets the container id, if it does not exist, do random calculation until one is found.
>>>>>>> origin/master
			
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
<<<<<<< HEAD
		function bindEvents() {
=======
		function bindEvents() {//binds keys for moving around the results. revisit to add enter key functionality
>>>>>>> origin/master

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

<<<<<<< HEAD
			function bindKeyup() {
=======
			function bindKeyup() {//on up arrow
>>>>>>> origin/master
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
<<<<<<< HEAD
								.fail(function() {
									logger.warning("Fail to load response data");
								})
								.always(function() {

								});
=======
								.fail(function() {})
								.always(function() {});
>>>>>>> origin/master
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

<<<<<<< HEAD
			function bindKeydown() {
=======
			function bindKeydown() {//on down arrow
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
						config.get("list").onClickEvent();//call the onClickEvent defined in options
>>>>>>> origin/master

						event.preventDefault();
					}
				});
			}

<<<<<<< HEAD
			function bindKeypress() {
=======
			function bindKeypress() {//prevents all other keypresses from doing anything
>>>>>>> origin/master
				$field
				.off("keypress");
			}

<<<<<<< HEAD
			function bindFocus() {
=======
			function bindFocus() {//if field is not empty, and results are found, show them and select none
>>>>>>> origin/master
				$field.focus(function() {

					if ($field.val() !== "" && elementsList.length > 0) {
						
						selectedElement = -1;
						showContainer();	
					}
									
				});
			}

<<<<<<< HEAD
			function bindBlur() {
=======
			function bindBlur() {//hide the results
>>>>>>> origin/master
				$field.blur(function() {
					setTimeout(function() { 
						
						selectedElement = -1;
						hideContainer();
					}, 250);
				});
			}

<<<<<<< HEAD
			function removeAutocomplete() {
=======
			function removeAutocomplete() {//remove Autocomplete
>>>>>>> origin/master
				$field.attr("autocomplete","off");
			}

		}
<<<<<<< HEAD

		function showContainer() {
			$container.trigger("show");
			selectElement(selectedElement);
		}

		function hideContainer() {
			$container.trigger("hide");
		}

		function selectElement(index) {
			
			$container.trigger("selectElement", index);
		}

		function loadElements(list, phrase) {
			$container.trigger("loadElements", [list, phrase]);
		}

		function loseFieldFocus() {
			$field.trigger("blur");
		}


	};

	return scope;

=======
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
>>>>>>> origin/master
})(EasyAutocomplete || {});


$.fn.easyAutocomplete = function(options) {
	new EasyAutocomplete.main(this, options).init();
};

<<<<<<< HEAD
=======
//config.get("list").onClickEvent();//call the onClickEvent defined in options
>>>>>>> origin/master
