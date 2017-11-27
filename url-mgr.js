const matcher = /^(([a-zA-Z-]+):\/*?)([a-zA-Z.@-]+)(:([0-9]{2,}))?(\/?[a-zA-Z0-9._~:/?#[\]%@!$&'()*+,;=-]+?)??(\?([a-zA-Z0-9._~:/?#[\]%@!$&'()*+,;=-]+))?$/;

exports.Url = function(url){

	function Query(query, url){
		var thisQuery = this;
		var queryObject = {};
        
		if(typeof query !== 'undefined'){
			query.split('&').forEach(function(x){
				if(x === null || x === '')
					return;
				var q = x.match(/(.+?)=(.*)/); //Need to use this instead of .split() in case the value contains an "="
				queryObject[q[1]] = q[2];

				Object.defineProperty(thisQuery, q[1], {
					get: function(){return queryObject[q[1]];},
					set: function(value){
						queryObject[q[1]] = value;
					},
					enumerable: true
				});
			});
		}
        
		Object.defineProperties(thisQuery, {
			'compile': {
				value: function(){
					var a = [];
					for(let q in queryObject){
						a.push(q + '=' + (queryObject[q] || ''));
					}
					return a.join('&');
				},
				writable: false
			},
			'inspect': {
				value: function(depth, opts){
					var o = Object.assign({}, queryObject);
					for(let i in o){
						o[i] = decodeURIComponent(o[i]);
					}
					return o;
				},
				writable: false
			}
		});
	}
    
	var defPorts = {
		'http': '80',
		'https': '443'
	};
    
	var protocol;
	var domain;
	var port;
	var path;
	var query;
    
	var parse = function(url){
		var matches = url.match(matcher);
		protocol = matches[2];
		domain = matches[3];
		port = typeof matches[5] === 'undefined' ? defPorts[protocol] : matches[5];
		path = typeof matches[6] === 'undefined' ? '/' : matches[6];
		query = new Query(matches[8]);
	};
        
	Object.defineProperties(this, {
		'protocol': {
			get: function(){return protocol;},
			set: function(value){protocol = value;},
			enumerable: true
		},
		'domain': {
			get: function(){return domain;},
			set: function(value){domain = value;},
			enumerable: true
		},
		'port': {
			get: function(){return port;},
			set: function(value){port = value;},
			enumerable: true
		},
		'path': {
			get: function(){return path;},
			set: function(value){path = value;},
			enumerable: true
		},
		'query': {
			get: function(){return query;}
		},
		'queryString': {
			get: function(){return query.compile();},
			set: function(value){query = new Query(value);},
			enumerable: true
		},
		'url': {
			get: function(){
				var queryString = query.compile();
				return protocol + '://' + domain + (port === defPorts[protocol] ? '' : ':' + port) + path + (queryString.length > 0 ? '?' + queryString : '');
			},
			set: function(value){
				parse(value);
			},
			enumerable: true
		},
		'inspect': {
			value: function(depth, opts){
				return {
					protocol: protocol,
					domain: domain,
					port: port,
					path: path,
					query: query,
					queryString: query.compile(),
					url: this.url
				};
			},
			writable: false
		},
		'toString': {
			value: function(){return this.url;},
			writable: false
		}
	});
    
	parse(url);
};
