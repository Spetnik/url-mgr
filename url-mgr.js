const matcher = /^(([a-zA-Z-]+):\/*?)([a-zA-Z.@-]+)(:([0-9]{2,}))?(\/?[a-zA-Z0-9._~:/?#[\]%@!$&'()*+,;=-]*?)??(\?([a-zA-Z0-9._~:/?#[\]%@!$&'()*+,;=-]*))?$/;

exports.Url = function(url){

	const queryObject = {};
	const queryProxy = new Proxy(queryObject, {
		get: (target, key) => {
			return target[key];
		},
		set: (target, key, value) => {
			if(value){
				target[key] = value.toString();
			}else{
				delete target[key];
			}
		},
		deleteProperty: (target, key) => {
			delete target[key];
		},
		enumerate: (target) => {
			return Object.assign({}, target);
		},
		ownKeys: (target) => {
			return Reflect.ownKeys(target);
		},
		has: (target, key) => {
			return key in target;
		},
		getOwnPropertyDescriptor: (target, key) => {
			let value = target[key];
			return value ? {
				value: value,
				writable: true,
				enumerable: true,
				configurable: true,
			} : undefined;
		},
	});

	const parseQuery = (queryString) => {
		for(let key in queryObject){
			delete queryObject[key];
		}

		if(typeof queryString !== 'undefined'){
			queryString.split('&').forEach(function(x){
				if(!x || x === ''){
					return;
				}
				let q = x.match(/(.+?)=(.*)/); //Need to use this instead of .split() in case the value contains an "="
				queryObject[q[1]] = q[2];
			});
		}

		return queryObject;
	};

	const stringifyQuery = (query) => {
		let a = [];
		for(let q in query){
			a.push(q + '=' + (query[q] || ''));
		}
		return a.join('&');
	};
    
	const defPorts = {
		'http': '80',
		'https': '443'
	};
    
	let protocol, domain, port, path, query;
    
	const parse = function(url){
		let matches = url.match(matcher);
		protocol = matches[2];
		domain = matches[3];
		port = typeof matches[5] === 'undefined' ? defPorts[protocol] : matches[5];
		path = typeof matches[6] === 'undefined' ? '/' : matches[6];
		parseQuery(matches[8]);
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
			get: function(){return queryProxy;}
		},
		'queryString': {
			get: function(){return stringifyQuery(queryObject);},
			set: function(value){parseQuery(value);},
			enumerable: true
		},
		'url': {
			get: function(){
				let queryString = query.compile();
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
