// ==UserScript==
// @id             ontheroad
// @name           IITC plugin: OnTheRoad
// @category       Layer
// @version        0.1.0.20160423.005
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://github.com/Hurqalia/ontheroad/raw/master/ontheroad.meta.js
// @downloadURL    https://github.com/Hurqalia/ontheroad/raw/master/ontheroad.user.js
// @installURL     https://github.com/Hurqalia/ontheroad/raw/master/ontheroad.user.js
// @description    [ontheroad-2016-04-23-005] OnTheRoad
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
	if(typeof window.plugin !== 'function') window.plugin = function() {};
	plugin_info.buildName = 'hurqalia22';
	plugin_info.dateTimeVersion = '20160423.005';
	plugin_info.pluginId = 'ontheroad';

	// PLUGIN START ////////////////////////////////////////////////////////

	// use own namespace for plugin
	window.plugin.ontheroad = function() {};
	window.plugin.ontheroad.layers		= {};
	window.plugin.ontheroad.layer_id	= 0;
	window.plugin.ontheroad.travel_selected	= 'drive';
	window.plugin.ontheroad.routes_layers	= {};
	window.plugin.ontheroad.config_request	= {};
	window.plugin.ontheroad.route_request	= {};
	window.plugin.ontheroad.routes_infos	= {};
	window.plugin.ontheroad.routes		= {};
	window.plugin.ontheroad.my_position	= {};
	window.plugin.ontheroad.KEY_STORAGE	= 'ontheroad-routes';
	window.plugin.ontheroad.isSmart		= undefined;
	window.plugin.ontheroad.isAndroid	= function() {
		if(typeof android !== 'undefined' && android) {
			return true;
		}
		return false;
	};
	window.plugin.ontheroad.FLAG_ARRIVAL = 'data:image/png;base64,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';
	window.plugin.ontheroad.ICON_SPRITE  = 'data:image/png;base64,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';
	window.plugin.ontheroad.ICON_TOOLBAR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQcDTshTdyT8AAAAipJREFUSMft1j2IVVcQwPHfeW5EolZaB7sNIVFXgx8oBBLU4u4JKSxMqpBOES20UWxMoZBg4RYWSQpJSCEp5z2LxSwIJqIoJCAoq42KSlyJEKKrRvdYeIQl8bnw3G3iDlwud2Y4/zMzZ+ZcZmVW/m+SpnLIOa/F0lLKyXa7fWnGwYODzdyUWj9i8yT119gXEY9eFdzquqPU2l+hf2IY97EbH05HxK2XZRlPsDsiNuFozdDymQZfwxxsyLlZj4Fn6nJ7psF76vtTWiNYi5ukE9MBntPNMDo6+kd/f/88rJ/kty8ihqcD3DeF/Ss0eA8/RcRQ97Zr+khLSQO4hPMR8aCXVIuIu/gcv2JXd+jHfbSOkc7hO5zCL73W+LlcwPZSyl8552U5D77zX5eJjfgE4zhTW3BFzvlQz+BSzMX7eAPrSE3Ogytzzkcndf2yutY3EbEG2/AYG3qtsXY7/sa39fNIHaOLsKRpmvmdTuceblT7QM75XWysa9/qGVxBC/ERLuKL2lpbKhR+xh18gNNYQFFK93ORpgD21cGxAHvxZSllLKWJqxHHx//luwOHJ6kORsTeXiN+Cz9ExNtN05zsdDoTL+mAoZzzanyG3+uFoteI38QalHp4TlHmk+5FxMMX+C/GMeyMiAs9D5CIuI+RnPOqZ/Url0nf43rOeQRb6421oj4HMIZ/XnVyPd/AWZytUW2qvTuP1pVSym8YTymN1VM8jLuz/1iz8vrJU4oxsZp0s0nTAAAAAElFTkSuQmCC';
	window.plugin.ontheroad.dialogBox = '<div id="ontheroadBox">' +
	'  <div id="otr-travel-tab" class="otr-block-box">' +
	'    <div class="otr-tab"><p class="otr-icon otr-icon-drive otr-icon-drive-on" data-travel="drive"></p></div>' +
	'    <div class="otr-tab"><p class="otr-icon otr-icon-transport" data-travel="transport"></p></div>' +
	'    <div class="otr-tab"><p class="otr-icon otr-icon-walk" data-travel="walk"></p></div>' +
	'    <div class="otr-tab"><p class="otr-icon otr-icon-bicycle" data-travel="bicycle"></p></div>' +
	'  </div>' +
	'  <div id="otr-travel-options" class="otr-travel-options otr-block-box"><p>' +
	'    <div id="otr-travel-options-drive" class="otr-travel-options">' +
	'      <strong>Avoid</strong><br />' +
	'      <input type="checkbox" name="otr-trp-opt-drive" value="highway" /> Highway<br />' +
	'      <input type="checkbox" name="otr-trp-opt-drive" value="tolls" /> Tolls<br />' +
	'      <input type="checkbox" name="otr-trp-opt-drive" value="ferries" /> Ferries<br />' +
	'    </div>' +
	'    <div id="otr-travel-options-transport" class="otr-travel-options">' +
	'      <div style="display:inline-block; width:45%;">' +
	'        <strong>Preferred</strong><br />' +
	'        <input type="checkbox" name="otr-trp-transport-bus" value="bus" /> Bus<br />' +
	'        <input type="checkbox" name="otr-trp-transport-subway" value="subway" /> Subway<br />' +
	'        <input type="checkbox" name="otr-trp-transport-train" value="train" /> Train<br />' +
	'        <input type="checkbox" name="otr-trp-transport-tram" value="tram" /> Tram / Light rall<br />' +
	'      </div>' +
	'      <div style="display:inline-block; width:45%; vertical-align:top;">' +
	'        <strong>Route</strong><br />' +
	'        <input type="radio" name="otr-trp-transport-route" value="bus" /> Best route<br />' +
	'        <input type="radio" name="otr-trp-transport-route" value="subway" /> Fewer transfers<br />' +
	'        <input type="radio" name="otr-trp-transport-route" value="train" /> Less walking<br />' +
	'      </div>' +
	'    </div>' +
	'    <div id="otr-travel-options-walk" class="otr-travel-options">' +
	'      <strong>Avoid</strong><br />' +
	'      <input type="radio" name="otr-trp-opt-walk" value="ferries" /> Ferries<br />' +
	'    </div>' +
	'    <div id="otr-travel-options-bicycle" class="otr-travel-options">' +
	'      <strong>Avoid</strong><br />' +
	'      <input type="radio" name="otr-trp-opt-bicycle" value="ferries" /> Ferries<br />' +
	'    </div>' +
	'  </p></div>' +
	'  <div class="otr-block-box">' +
	'	<div class="otr-sub-title">Route</div>' +
	'    <p>'+
	'      <div class="otr-label-way">Departure : </div><select id="otr-portal-from"></select>' +
	'    </p>' +
	'    <p>' +
	'      <div class="otr-label-way">Arrival : </div><select id="otr-portal-to"></select> '+
	'    </p>' +
	'    <p> ' +
	'      <button class="otr-add-waypoint">Add Waypoint</button> '+
	'      <div id="otr-list-waypoints">' +
	'      </div>' +
	'    </p></div>' +
	'  <div class="otr-block-box">' +
	'    <div class="otr-sub-title">Rendering</div>' +
	'    <p>'+
	'      <div class="otr-label-way">Road line color : </div><select id="otr-render-color">'+
	'      <option value="#FF0000">Red</option>' +
	'      <option value="#000000">Black</option>' +
	'      <option value="#0000FF">Blue</option>' +
	'      <option value="#04B404">Green</option>' +
	'      <option value="#FF8000">Orange</option>' +
	'      <option value="#7401DF">Purple</option>' +
	'      <option value="#FFFF00">Yellow</option>' +
	'      </select>' +
	'      &nbsp; size : <select id="otr-render-size"><option value="2">2pt</option><option value="4">4pt</option><option value="6">6pt</option></select>' +
	'     <button onclick="window.plugin.ontheroad.onRequest(); return false;" style="float:right;">Get route</button><div style="clear:both;"></div>' +
	'    </p>' +
	'  </div>' +
	'  <div class="otr-block-box"><div class="otr-sub-title">Remove Routes</div><p><div class="otr-label-way">Routes : </div><select id="otr-travel-remove"><option value="none">none</option></select><br /><button onclick="window.plugin.ontheroad.onRemove(); return false;" style="float:right;">Remove</button><div style="clear:both;"></div></p></div>' +
	'  <div><div class="otr-sub-title">Message</div><p><div id="otr-message-content"></div></p></div>' +
	'</div>';
 	window.plugin.ontheroad.infosBox = '<div id="ontheroadInfosBox">' +
	'    <div id="infosBoxTopBar">' +
	'      <div class="infosBoxHandle">...</div>' +
	'    </div>' +
	'    <div id="infosBoxTabs">' +
	'      <div class="otr-infos-tab otr-infos-tab-list">' +
	'        <a onclick="window.plugin.ontheroad.showRoutesList(\'\');">Route list</a>' +
	'      </div>' +
	'      <div class="otr-infos-tab otr-infos-tab-content">' +
	'        <a>Route details</a>' +
	'      </div>' +
	'      <div class="otr-infos-tab otr-infos-tab-export">' +
	'        <a onclick="window.plugin.ontheroad.exportRoute();" data-route-id="" id="route-exporter">Share</a>' +
	'      </div>' +
	'    </div>' +
	'    <div class="otr-infos-block">' +
	'      <div class="otr-infos-content-list">' +
	'      </div>' +
	'      <div class="otr-infos-content-details">' +
	'      </div>' +
	'    </div>' +
	'    <div id="infosBoxBottomBar" style="margin:5px; text-align:right; width:95%; position:absolute; bottom:0px;">'+
	'      <button class="otr-infos-button" onclick="window.plugin.ontheroad.closeRoutesInfo();">Close</button>' +
	'    </div>' +
	'    </div>';

	// update the localStorage datas
	window.plugin.ontheroad.saveStorage = function(datas) {
		localStorage[window.plugin.ontheroad.KEY_STORAGE] = JSON.stringify(datas);
	};

	// load the localStorage datas
	window.plugin.ontheroad.loadStorage = function() {
		if (localStorage[window.plugin.ontheroad.KEY_STORAGE]) {
			return JSON.parse(localStorage[window.plugin.ontheroad.KEY_STORAGE]);
		}
		return;
	};

	window.plugin.ontheroad.addRoadLayer = function(datas, save_route) {
		paths = google.maps.geometry.encoding.decodePath(datas.routes[0].overview_polyline);

		var route_infos    = '';
		var route_details  = '';
		var total_distance = 0;
		var total_duration = 0;
		for (var i = 0; i < datas.routes[0].legs.length; i++) {
			route_infos += '<div class="otr-infos-segment"><b>Route Segment: ' + (i+1) + '</b><br />' +
				'<div><b>From : </b>' + datas.routes[0].legs[i].start_address + '</div>' +
				'<div><b>To : </b>' + datas.routes[0].legs[i].end_address + '</div>' +
				'<div><b>Distance/Time : </b><b style="color:red;">' +
			datas.routes[0].legs[i].distance.text + ' / ' + datas.routes[0].legs[i].duration.text + '</b></div></div>';
			total_distance += datas.routes[0].legs[i].distance.value;
			total_duration += datas.routes[0].legs[i].duration.value;
			for (var s = 0; s < datas.routes[0].legs[i].steps.length; s++) {
				var step = datas.routes[0].legs[i].steps[s];
				route_details += '<div>' +
						 '<div>' + step.distance.text  + ' / ' + step.duration.text + '</div>' +
					 	 '<div>' + step.instructions + '</div>' +
						 '</div>';
			}
		}

    	window.plugin.ontheroad.routes_infos[window.plugin.ontheroad.config_request.uid] = {
	    	'title'    : window.plugin.ontheroad.config_request.label,
    		'summary'  : route_infos,
			'distance' : total_distance,
			'duration' : total_duration,
			'details'  : route_details
		};

		var rlayer = new L.LayerGroup();
		window.plugin.ontheroad.layer_id = rlayer.getLayerId(rlayer);
		window.plugin.ontheroad.layers[window.plugin.ontheroad.layer_id] = rlayer;

		$('#otr-travel-remove').append($('<option>', { value : window.plugin.ontheroad.layer_id, text : window.plugin.ontheroad.config_request.label }));

		window.plugin.ontheroad.routes[window.plugin.ontheroad.config_request.uid] = {
			label : window.plugin.ontheroad.config_request.label,
			request : window.plugin.ontheroad.route_request,
			line : window.plugin.ontheroad.config_request.line
		};
		if (save_route) {
			window.plugin.ontheroad.saveStorage(window.plugin.ontheroad.routes);
		}
		window.plugin.ontheroad.routes_layers[window.plugin.ontheroad.layer_id] = window.plugin.ontheroad.config_request.uid;
		window.plugin.ontheroad.setRoutesList();

		$.each(paths, function(cid, coords) {
			if (paths[cid+1]) {
				pathline = L.geodesicPolyline([[coords.lat(),coords.lng()],[paths[cid+1].lat(),paths[cid+1].lng()]],
								window.plugin.ontheroad.config_request.line
				);
				rlayer.addLayer(pathline);
			}
		});

		rlayer.addLayer(window.plugin.ontheroad.addArrivalMark());
		window.addLayerGroup(window.plugin.ontheroad.config_request.label, rlayer, true);
		$('#otr-message-content').html('Route search is complete.');
		if (window.plugin.ontheroad.isSmart) {
			window.show('map');
		}
	};

	window.plugin.ontheroad.addArrivalMark = function () {
	       var marker = L.marker(window.plugin.ontheroad.route_request.destination, {
				title: window.plugin.ontheroad.config_request.uid,
				icon: L.icon({
					iconUrl: window.plugin.ontheroad.FLAG_ARRIVAL,
					iconAnchor: [33,40],
					iconSize: [30,40]
				})
		});

		marker.on('click', function(e) {
			window.plugin.ontheroad.openRouteInfo(e.target.options.title);
		}, this);
		return marker;
	};

	window.plugin.ontheroad.exportRoute = function() {
		var rid = $('#route-exporter').attr('data-route-id');
		if (rid === '') {
			return;
		}

		var url_params = window.plugin.ontheroad.routes[rid].request.origin.lat + ',' +
			window.plugin.ontheroad.routes[rid].request.origin.lng;

		if (window.plugin.ontheroad.routes[rid].request.waypoints.length > 0) {
			$.each(window.plugin.ontheroad.routes[rid].request.waypoints, function(wid, wroute) {
				url_params += '/' + wroute.location.lat + ',' + wroute.location.lng;
			});
		}

		url_params += '/' + window.plugin.ontheroad.routes[rid].request.destination.lat + ',' +
			window.plugin.ontheroad.routes[rid].request.destination.lng;

		var gmap_url = 'https://www.google.com/maps/dir/' + url_params;

		if (typeof android !== 'undefined' && android && android.intentPosLink) {
			return; // currently not available
		} else {
			window.open(gmap_url, '_blank');
		}
	};

	window.plugin.ontheroad.setRoutesList = function() {
		$('.otr-infos-content-list').empty();
		$.each(window.plugin.ontheroad.routes_infos, function(rid, route) {
			$('.otr-infos-content-list').append("<p id='route_"+ rid +"'><a onclick=\"window.plugin.ontheroad.showRouteInfo('" + rid + "');\"> " + route.title + "</a></p>");
		});
	};

	window.plugin.ontheroad.showRoutesList = function(tid) {
		if (! $('.otr-infos-content-list').is(':visible')) {
			window.plugin.ontheroad.hideRouteInfo();
			$('.otr-infos-content-list').show();
			$('.otr-infos-tab-content > a').addClass('disabled');
			if (! window.plugin.ontheroad.isSmart) {
				$('.otr-infos-tab-export > a').addClass('disabled');
			}
		}
		if (tid !== '') {
			setTimeout(function() {
				window.plugin.ontheroad.showRouteInfo(tid);
			}, 50);
		}
	};

	window.plugin.ontheroad.hideRoutesList = function() {
		if ($('.otr-infos-content-list').is(':visible')) {
			$('.otr-infos-content-list').hide();
			$('.otr-infos-tab-content > a').removeClass('disabled');
			if (!window.plugin.ontheroad.isSmart) {
				$('.otr-infos-tab-export > a').removeClass('disabled');
			}
		}
	};

	window.plugin.ontheroad.showRouteInfo = function(rid) {
		$('.otr-infos-content-details').empty();
		$('.otr-infos-content-details').append(window.plugin.ontheroad.routes_infos[rid].summary);
		$('.otr-infos-content-details').append(window.plugin.ontheroad.routes_infos[rid].details);
		window.plugin.ontheroad.hideRoutesList();
		$('.otr-infos-content-details').show();
		if (! window.plugin.ontheroad.isSmart) {
			$('#route-exporter').attr('data-route-id', rid);
		}
	};

	window.plugin.ontheroad.openRouteInfo = function(tid) {
		window.plugin.ontheroad.showRoutesList(tid);
		window.plugin.ontheroad.hideRouteInfo();
		if (window.plugin.ontheroad.isSmart) {
			window.show("plugin-ontheroad");
			runHooks("paneChanged", "plugin-ontheroad");
		} else {
			if (! $('#ontheroadInfosBox').is(':visible')) {
				$('#ontheroadInfosBox').show();
			}
		}
	};

	window.plugin.ontheroad.hideRouteInfo = function() {
		$('.otr-infos-content-details').empty();
		$('.otr-infos-content-details').hide();
		$('#route-exporter').attr('data-route-id', '');
	};

	window.plugin.ontheroad.closeRoutesInfo = function() {
		$('#ontheroadInfosBox').hide();
	};

	window.plugin.ontheroad.getRoute = function(save_route) {
		directionsService = new window.google.maps.DirectionsService();
		directionsService.route( window.plugin.ontheroad.route_request,
			function(response, status) {
	  			if (status === window.google.maps.DirectionsStatus.OK) {
       					window.plugin.ontheroad.addRoadLayer(response, save_route);
	  			} else {
	  				$('#otr-message-content').html('Directions request failed due to ' + status);
	    				console.log('Directions request failed due to ' + status);
	  			}
			}
		);
	};

	window.plugin.ontheroad.initRequestDatas = function() {
		window.plugin.ontheroad.route_request = {
			origin : '',
			destination : '',
			waypoints : [],
			provideRouteAlternatives: false,
			travelMode: google.maps.TravelMode.DRIVING,
			//drivingOptions: {},
			transitOptions: [],
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false,
		};
	};

	window.plugin.ontheroad.portalLatLng = function(pid) {
		var point_location = window.plugin.bookmarks.bkmrksObj.portals.idOthers.bkmrk;
		if (pid === 'id1000000000001') {
			point_location = window.plugin.ontheroad.my_position;
		}
		return {
			lat: parseFloat(point_location[pid].latlng.split(',')[0]),
			lng: parseFloat(point_location[pid].latlng.split(',')[1]),
		};
	};

	// prepare data to get direction
	window.plugin.ontheroad.onRequest = function() {

		var portal_from = $('#otr-portal-from').val();
		var portal_to   = $('#otr-portal-to').val();
		if (portal_from == portal_to) {
			$('#otr-message-content').html('Departure and arrival must be different.');
			return false;
		}

		var opt_drive_avoid         = {};
		var opt_transport_preferred = {};
		var opt_transport_route     = '';
		var opt_walk_avoid          = '';
		var opt_bicycle_avoid       = '';

		window.plugin.ontheroad.initRequestDatas();
		window.plugin.ontheroad.route_request.origin      = window.plugin.ontheroad.portalLatLng( portal_from );
		window.plugin.ontheroad.route_request.destination = window.plugin.ontheroad.portalLatLng( portal_to );
		window.plugin.ontheroad.config_request.travel     = 'D';

		if (window.plugin.ontheroad.travel_selected === 'drive') {
			window.plugin.ontheroad.route_request.travelMode = google.maps.TravelMode.DRIVING;
			if ($('input[name="otr-trp-opt-drive"]').is(':checked') ) {
				window.plugin.ontheroad.route_request.avoidHighways = true;
			}
			if ($('input[name="otr-trp-opt-tolls"]').is(':checked') ) {
				window.plugin.ontheroad.route_request.avoidTolls = true;
			}
		} else if (window.plugin.ontheroad.travel_selected === 'transport') {
			window.plugin.ontheroad.route_request.travelMode = google.maps.TravelMode.TRANSIT;
			window.plugin.ontheroad.config_request.travel    = 'T';
			var travelmodes = [];
			if ($('input[name="otr-trp-transport-bus"]').is(':checked') ) {
				travelmodes.push(google.maps.TransitMode.BUS);
			}
			if ($('input[name="otr-trp-transport-subway"]').is(':checked') ) {
				travelmodes.push(google.maps.TransitMode.SUBWAY);
			}
			if ($('input[name="otr-trp-transport-train"]').is(':checked') ) {
				travelmodes.push(google.maps.TransitMode.TRAIN);
			}
			if ($('input[name="otr-trp-transport-tram"]').is(':checked') ) {
				// google.maps.TransitMode.RAIL / google.maps.TransitMode.TRAM
				travelmodes.push(google.maps.TransitMode.RAIL);
			}
			if (travelmodes.lenght > 0) {
				window.plugin.ontheroad.route_request.transitOptions = travelmodes;
			}
		} else if (window.plugin.ontheroad.travel_selected === 'walk') {
			window.plugin.ontheroad.config_request.travel = 'W';
			window.plugin.ontheroad.route_request.travelMode = google.maps.TravelMode.WALKING;
		} else if (window.plugin.ontheroad.travel_selected === 'bicycle') {
			window.plugin.ontheroad.config_request.travel = 'B';
			window.plugin.ontheroad.route_request.travelMode = google.maps.TravelMode.BICYCLING;
		}

		window.plugin.ontheroad.config_request.uid = window.plugin.ontheroad.uniqid();
		if (typeof window.plugin.ontheroad.routes[window.plugin.ontheroad.config_request.uid] !== 'undefined') {
			$('#otr-message-content').html('Route already exists.');
			return false;
		}

		var otr_waypoints = [];
		$.each($('.otr-waypoint-add'), function() {
			if ($(this).is(':checked')) {
				var pid = $(this).val();
				if (pid && (pid !== portal_from) && (pid !== portal_to)) {
					otr_waypoints.push( {location : window.plugin.ontheroad.portalLatLng(pid), stopover : false } );
				}
			}
		});
		if (otr_waypoints.length > 8 ) {
			$('#otr-message-content').html('8 waypoints max authorized.');
			return false;
		}
		if (otr_waypoints.length > 0) {
			window.plugin.ontheroad.route_request.waypoints = otr_waypoints;
			window.plugin.ontheroad.route_request.optimizeWaypoints = true;
		}

		var line_weight = ($('#otr-render-size').val())  ? $('#otr-render-size').val() : 2;
		var line_color  = ($('#otr-render-color').val()) ? $('#otr-render-color').val() : '#FF0000';
		window.plugin.ontheroad.config_request.line = { weight : line_weight , color : line_color, opacity : 1, clickable: false };

		var portal_from_name = $('#otr-portal-from option[value=' + portal_from + ']').text();
		var portal_to_name   = $('#otr-portal-to option[value=' + portal_to + ']').text();
		window.plugin.ontheroad.config_request.label = 'OTR (' + window.plugin.ontheroad.config_request.travel + ') - ' + portal_from_name.substring(0, 10) + ' -> ' + portal_to_name.substring(0, 10);

		window.plugin.ontheroad.getRoute(true);
	};

	window.plugin.ontheroad.uniqid = function() {
		return (new Date().getTime() + '' + Math.floor((Math.random()*10000)+1)).toString(16);
	};

	window.plugin.ontheroad.myOwnPosition = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					window.plugin.ontheroad.my_position = {
						id1000000000001 : {
							guid  : '10000000000000000000000000000001.01',
							label : 'My Position',
							latlng : position.coords.latitude + ',' + position.coords.longitude,
							lat : position.coords.latitude,
							lng : position.coords.longitude
						}
					};
					window.plugin.ontheroad.showDirectionOptions();
				},
				function(error) {
					var error_message = 'Cant get your position : ';
					switch(error.code) {
						case error.TIMEOUT:
							error_message += 'Timeout error.';
							break;
						case error.PERMISSION_DENIED:
							error_message += 'Permissions denied, authorize your browser to use it.';
							break;
						case error.POSITION_UNAVAILABLE:
							error_message += "Your position has not been found.";
							break;
						case error.UNKNOWN_ERROR:
							error_message += "Unknown error.";
							break;
						default:
							error_message += "Unknown error code.";
							break;
					}
					$('#otr-message-content').html(error_message);
					window.plugin.ontheroad.showDirectionOptions();
				},
				{ enableHighAccuracy : true }
			);
		} else {
			$('#otr-message-content').html('Browser does not support geolocation.');
			window.plugin.ontheroad.showDirectionOptions();
		}
	};
	window.plugin.ontheroad.onRemove = function() {
		$('#otr-message-content').html('');
		var remove_layer = $('#otr-travel-remove').val();
		if (remove_layer === 'none') {
			$('#otr-message-content').html('Select a road to remove it.');
			return false;
		}
		window.plugin.ontheroad.removeLayerGroup(window.plugin.ontheroad.layers[remove_layer]);
		delete window.plugin.ontheroad.layers[remove_layer];
		delete window.plugin.ontheroad.routes[window.plugin.ontheroad.routes_layers[remove_layer]];
		delete window.plugin.ontheroad.routes_infos[window.plugin.ontheroad.routes_layers[remove_layer]];
		delete window.plugin.ontheroad.routes_layers[remove_layer];
		window.plugin.ontheroad.saveStorage(window.plugin.ontheroad.routes);
		$('#otr-travel-remove option[value=' + remove_layer + ']').remove();
		window.plugin.ontheroad.setRoutesList();
	};

	window.plugin.ontheroad.removeLayerGroup = function(layerGroup) {
		if(!layerChooser._layers[layerGroup._leaflet_id]) throw('Layer was not found');
		var name = layerChooser._layers[layerGroup._leaflet_id].name;
		var enabled = isLayerGroupDisplayed(name);
		map.removeLayer(layerGroup);
		layerChooser.removeLayer(layerGroup);
		updateDisplayedLayerGroup(name, enabled);
	};

	// dialogs
	window.plugin.ontheroad.onDialog = function() {
		if (window.plugin.ontheroad.isSmart) {
			if (typeof window.plugin.bookmarks.bkmrksObj.portals.idOthers.bkmrk === 'undefined' || Object.keys(window.plugin.bookmarks.bkmrksObj.portals.idOthers.bkmrk).length < 1) {
				alert('At least 1 portal must be bookmarked to calculate a route');
                return false;
			}
		} else {
			if (typeof window.plugin.bookmarks.bkmrksObj.portals.idOthers.bkmrk === 'undefined' || Object.keys(window.plugin.bookmarks.bkmrksObj.portals.idOthers.bkmrk).length < 2) {
				alert('At least 2 portals must be bookmarked to calculate a route');
				return false;
			}
		}

		dialog({
		    html: window.plugin.ontheroad.dialogBox,
		    width:'400px',
		    dialogClass:'ui-dialog-ontheroad',
		    title:'On The Road',
		    buttons:{
		        'OK' : function() {
		            $(this).dialog('close');
		        }
		    }
		});

		$('#otr-message-content').html('');
		$('.otr-travel-options').hide();
		$('#otr-list-waypoints').hide();

		if (window.plugin.ontheroad.isSmart) {
			window.plugin.ontheroad.myOwnPosition();
		} else {
			var direction_options  = window.plugin.ontheroad.makeDirectionOptions();
			$('#otr-portal-from').append(direction_options.options);
			$('#otr-portal-to').append(direction_options.options);
			$('#otr-list-waypoints').append(direction_options.items);
		}

		$.each(window.plugin.ontheroad.routes_layers, function(i, route) {
		    	$('#otr-travel-remove').append($('<option>', { value :i, text : window.plugin.ontheroad.routes[window.plugin.ontheroad.routes_layers[i]].label }));
		});

		$('.otr-tab').click(function() {
			var tab_icon = $(this).find('p');
			var travel = $(tab_icon).attr('data-travel');
			if (window.plugin.ontheroad.travel_selected !== '') {
				$('.otr-icon.otr-icon-' + window.plugin.ontheroad.travel_selected).removeClass('otr-icon-' + window.plugin.ontheroad.travel_selected + '-on');
			}
			$(tab_icon).addClass('otr-icon-' + travel  +  '-on');
			window.plugin.ontheroad.travel_selected = travel;
			$('.otr-travel-options').hide();
			$('#otr-travel-options-' + travel).show();
			$('#otr-travel-options').show();
		});

		$('.otr-add-waypoint').click(function() {
			if ($('#otr-list-waypoints').is(':visible')) {
				$('#otr-list-waypoints').hide();
				$('.otr-add-waypoint').text('Add waypoints');
			} else {
				$('#otr-list-waypoints').show();
				$('.otr-add-waypoint').text('Hide');
			}
		});

    	};

	window.plugin.ontheroad.makeDirectionOptions = function() {
		var menu_options = '';
		var menu_items = '';
		if (Object.keys(window.plugin.ontheroad.my_position).length > 0) {
			menu_options += '<option value="id1000000000001">' + window.plugin.ontheroad.my_position.id1000000000001.label + '</option>';
		}
		$.each(window.plugin.bookmarks.bkmrksObj.portals.idOthers.bkmrk, function(bid, record) {
			menu_options += '<option value="' + bid + '">' + record.label + '</option>';
			menu_items += '<input type="checkbox" class="otr-waypoint-add" value="' + bid +'" /> '+ record.label + '&nbsp;/&nbsp;';
		});
		return { options : menu_options, items : menu_items};
	};

	window.plugin.ontheroad.showDirectionOptions = function() {
			var direction_options  = window.plugin.ontheroad.makeDirectionOptions();
			$('#otr-portal-from').append(direction_options.options);
			$('#otr-portal-to').append(direction_options.options);
			$('#otr-list-waypoints').append(direction_options.items);
	};

	window.plugin.ontheroad.onPaneChanged = function(pane) {
		if(pane == "plugin-ontheroad") {
			$('#ontheroadInfosBox').css("display", "");
		} else {
			$('#ontheroadInfosBox').css("display", "none");
		}
	};

	window.plugin.ontheroad.initBoxtabs = function() {

	};

	// init setup
	window.plugin.ontheroad.setup = function() {
		if (!window.plugin.bookmarks) {
			alert('Bookmarks plugin required');
			return false;
		}
		window.plugin.ontheroad.isSmart = window.isSmartphone();
		window.plugin.ontheroad.initCss();
		window.plugin.ontheroad.initDatas();
		window.plugin.ontheroad.initToolbar();

		if (window.plugin.ontheroad.isSmart) {
			window.plugin.ontheroad.initMobile();
		} else {
			window.plugin.ontheroad.initDesktop();
		}
		window.plugin.ontheroad.initBoxtabs();
	};

	window.plugin.ontheroad.initCss = function() {
		$('head').append('<style>.otr-block-box { border-bottom: 1px solid #20A8B1; } .otr-sub-title { color:#20A8B1; } .otr-label-way { width:100px; display:inline-block; } #otr-travel-tab { height:36px; background-color:#0e3d4e; } #otr-travel-tab > div.otr-tab { height:35px; width:20%; display:inline-block; margin:0px; } #otr-travel-tab > div.otr-tab:hover { background-color:#13858C; } .otr-icon { height:35px; width:35px; margin:auto; }</style>');
		$('head').append('<style>.otr-icon-drive { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat 0 -1px; } .otr-icon-drive-on, .otr-icon-drive:hover { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat 0 -36px; } .otr-icon-transport { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat -37px 0px; } .otr-icon-transport-on, .otr-icon-transport:hover { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat -37px -35px; } .otr-icon-walk { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat -70px 0px; } .otr-icon-walk-on, .otr-icon-walk:hover { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat -70px -35px; } .otr-icon-bicycle { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat -105px 0px; } .otr-icon-bicycle-on, .otr-icon-bicycle:hover { background: url(' + window.plugin.ontheroad.ICON_SPRITE + ') no-repeat -105px -35px; }</style>');
		$('head').append('<style>.otr-pane-ico { background-image: url(' + window.plugin.ontheroad.ICON_TOOLBAR + '); background-repeat: no-repeat; background-position: -2px;}</style>');
		$('head').append('<style>#infosBoxTabs { height:25px; } #infosBoxTabs div{ border-left: 1px solid #20A8B1;}  #infosBoxTabs div:first-child{ border-left: 0px;}.otr-infos-tab{ display:inline-block; width:30%; top:0px; text-align:center; padding:5px; } .otr-infos-content-list p{ padding:5px 10px 5px 10px;} </style>');
		$('head').append('<style>.otr-infos-content-list p { margin: 2px 0px 2px 5px; } .otr-infos-content-list p:hover { background-color: rgba(6, 140, 158, 0.65); }</style>');
		$('head').append('<style>.otr-infos-tab a.disabled { color: #5A4F1F; cursor: none; text-decoration: none;}</style>');
		if (window.plugin.ontheroad.isSmart) {
			$('head').append('<style>#ontheroadInfosBox{ position:absolute !important; width: 100% !important; height: 100% !important; top: 0 !important; left: 0 !important; margin: 0 !important; padding: 0 !important;border: 0 !important; background: transparent !important; overflow:auto !important;} .otr-infos-content-details { background-color:#fff; color:black; overflow-y: scroll; height:100%; } .otr-infos-segment { background-color:#ccc!important;  font-size:11pt!important; } .otr-infos-content-details > div { margin-left:0px; background-color:white; font-size:10pt; padding:2px; border-bottom: 1px solid #ccc; } </style>');
			$('head').append('<style>.leaflet-otr a { background-color: #fff; border-bottom: 1px solid #ccc; width: 30px; height: 30px; line-height: 30px; text-align: center; text-decoration: none; color: black; display: block; box-shadow: 0 1px 5px rgba(0,0,0,0.65); border-radius: 4px; margin-left:2px;} .leaflet-otr{width:30px;}</style>');
		} else {
			$('head').append('<style>#ontheroadInfosBox { min-height: 500px; min-height: 500px; position: absolute!important; z-index: 4001; width: 400px; background-color: rgba(8, 48, 78, 0.85); } #infosBoxTopBar { background-color: rgba(8, 48,78,.85); height: 15px !important; border-bottom: 1px solid #20A8B1; } .infosBoxHandle { color:white; font-weight:bold; text-align:center; height: 15px !important; cursor:move; } .otr-infos-content-details { height:425px; overflow-y: scroll; } .otr-infos-segment { background-color:#ccc!important;  font-size:11pt!important; } .otr-infos-content-details > div { margin-left:5px; background-color:white; font-size:10pt; padding:2px; border-bottom: 1px solid #ccc; } .otr-infos-button { padding: 2px; min-width: 40px; color: #FFCE00; border: 1px solid #FFCE00; background-color: rgba(8, 48, 78, 0.9); }</style>');
			$('head').append('<style>.leaflet-otr a { background-color: #fff; border-bottom: 1px solid #ccc; width: 26px; height: 26px; line-height: 26px; text-align: center; text-decoration: none; color: black; display: block; box-shadow: 0 1px 5px rgba(0,0,0,0.65); border-radius: 4px;} .leaflet-otr{width:26px;}</style>');
		}
	};

	window.plugin.ontheroad.reloadDatas = function(rid, options) {
		window.plugin.ontheroad.config_request.label = options.label;
		window.plugin.ontheroad.config_request.line  = options.line;
		window.plugin.ontheroad.config_request.uid   = rid;
		window.plugin.ontheroad.route_request        = options.request;
		window.plugin.ontheroad.getRoute(false);
	};

 	window.plugin.ontheroad.initDatas = function() {
 		var stored_datas = window.plugin.ontheroad.loadStorage();
 		if (typeof stored_datas === 'undefined' || stored_datas === '') {
 			return;
 		}
		var counter = 1;
		$.each(stored_datas, function(i, datas) {
			setTimeout(function() { window.plugin.ontheroad.reloadDatas(i, datas); }, counter);
			counter += 3000;
		});
 	};

	window.plugin.ontheroad.initToolbar = function() {
		L.Control.otrToolbar = L.Control.extend({
			options: {
				position : 'topleft'
			},
			onAdd: function() {
				var container = L.DomUtil.create('div', 'leaflet-otr');
				this._Button('Open OTR Panel', 'otr-pane-ico', 'otr-control-pane',  container, window.plugin.ontheroad.onDialog);
				return container;
			},
			_Button: function(title, classname, index, container, callback) {
				var link   = L.DomUtil.create('a', 'leaflet-bar-part otr-control-img ' + classname, container);
				link.href  = '#';
				link.title = title;
				link.id    = index;
				L.DomEvent
					.on(link, 'click', L.DomEvent.stopPropagation)
					.on(link, 'click', L.DomEvent.preventDefault)
					.on(link, 'click', callback)
					.on(link, 'dblclick', L.DomEvent.stopPropagation);
				return link;
			}
		});
		L.Map.mergeOptions({
			otrControl: true
		});
		L.Map.addInitHook(function () {
			this.otrControl = new L.Control.otrToolbar();
			this.addControl(this.otrControl);
		});
		L.control.otrcontrol = function () {
			return new L.Control.otrToolbar();
		};
		L.Map.mergeOptions({
			otrControl: false
		});
		map.addControl(L.control.otrcontrol());
	};

	window.plugin.ontheroad.initMobile = function() {
		console.log('**** OnTheRoad : Mobile loaded ****');
		$('body').append(window.plugin.ontheroad.infosBox);
		$('#infosBoxBottomBar').remove();
		$('#infosBoxTopBar').remove();
		$('.otr-infos-tab-export').remove();
		$('#ontheroadInfosBox').css("display", "none");
		$('#toolbox').append('<a href="#" onclick="window.plugin.ontheroad.onDialog();">OnTheRoad</a>');

		if(window.useAndroidPanes()) {
			android.addPane("plugin-ontheroad", "OnTheRoad", "ic_action_location_found");
		}
		window.addHook('paneChanged', window.plugin.ontheroad.onPaneChanged);
	};

	window.plugin.ontheroad.initDesktop = function() {
		console.log('**** OnTheRoad : Desktop loaded ****');
		$('#toolbox').append('<a href="#" onclick="window.plugin.ontheroad.onDialog();">OnTheRoad</a>');
		$('body').append(window.plugin.ontheroad.infosBox);
		$('#ontheroadInfosBox').draggable({ handle:'.infosBoxHandle', containment:'window' });
		$('#ontheroadInfosBox').css("display", "none");
		$('#ontheroadInfosBox').css({'top':100, 'left':200});
	};

	// runrun
	var setup =  window.plugin.ontheroad.setup;

	setup.info = plugin_info; //add the script info data to the function as a property
	if(!window.bootPlugins) window.bootPlugins = [];
	window.bootPlugins.push(setup);
	// if IITC has already booted, immediately run the 'setup' function
	if(window.iitcLoaded && typeof setup === 'function') {
		setup();
	}

    // PLUGIN END ////////////////////////////////////////////////////////
} // WRAPPER END ////////////////////////////////////////////////////////

var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
