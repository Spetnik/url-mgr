const matcher = /^(([a-zA-Z-]+)\:\/*?)([a-zA-Z.@-]+)(\:([0-9]{2,}))?(\/?[a-zA-Z0-9._~:/?#\[\]%@!$&'\(\)*+,;=-]+?)??(\?([a-zA-Z0-9._~:/?#\[\]%@!$&'\(\)*+,;=-]+))?$/;

exports.Url = function(url){
    var thisUrl = this;

    function Query(query, url){
        var thisQuery = this;
        var queryObject = {};
        query.split("&").forEach(function(x){
            if(x == null || x == '')
                return;
            var q = x.split('=');
            queryObject[q[0]] = q[1];
                        
            Object.defineProperty(thisQuery, q[0], {
                get: function(){return queryObject[q[0]];},
                set: function(value){
                    queryObject[q[0]] = value;
                }
            });
        });
        
        Object.defineProperty(thisQuery, 'compile', {
            value: function(){
                var a = [];
                for(q in queryObject){
                    a.push(q + "=" + (queryObject[q] || ""));
                }
                return a.join("&");
            },
            writable: false
        });
        
        this.constructor.prototype.inspect = function(depth, opts){
            var o = Object.assign({}, queryObject);
            for(i in o){
                o[i] = decodeURIComponent(o[i]);
            }
            return o;
        };
    }
    
    var defPorts = {
        'http': '80',
        'https': '443'
    };
    
    var matches = url.match(matcher);
    var protocol = matches[2];
    var domain = matches[3];
    var port = typeof matches[5] == "undefined" ? (defPorts[protocol]) : matches[5];
    var path = matches[6];
    var query = new Query(matches[8]);
        
    Object.defineProperties(this, {
        'protocol': {
            get: function(){return protocol;},
            set: function(value){protocol = value;}            
        },
        'domain': {
            get: function(){return domain;},
            set: function(value){domain = value;}            
        },
        'port': {
            get: function(){return port;},
            set: function(value){port = value;}            
        },
        'path': {
            get: function(){return path;},
            set: function(value){path = value;}            
        },
        'query': {
            get: function(){return query;}
        },
        'url': {
            get: function(){
                var queryString = query.compile();
                return protocol + "://" + domain + (port == defPorts[protocol] ? '' : ":" + port) + path + (queryString.length >= 0 ? "?" + queryString : "");
            }
        }        
    });
    
    this.constructor.prototype.inspect = function(depth, opts){
        return {
            protocol: protocol,
            domain: domain,
            port: port,
            path: path,
            query: query,
            url: this.url
        };
    };
}
exports.Url.prototype.toString = function(){return this.url;};
