# No longer supported / necessary
## As early as Node.JS 6.3.0, there is native support for URL parsing.

[![NPM](https://nodei.co/npm/url-mgr.png)](https://npmjs.org/package/url-mgr)
# url-mgr
For node.js - Parses URLs (http and https) into a JavaScript object which can be edited and easily exported as a new URL

## Installation
```
npm install url-mgr
```

## Using url-mgr
### Initializing
```
var urlMgr = require('url-mgr');
var url = new urlMgr.Url('http://example.com/some/path?stripes=broad&stars=bright');
```

### Properties
#### domain
Gets or sets the domain portion of the URL
```
console.log(url.domain);        //Prints 'example.com'
```

#### path
Gets or sets the path portion of the URL
```
console.log(url.path);          //Prints '/some/path'
```

#### port
Gets or sets the URL's port  
*If not included in the URL, the port will default to 80 for HTTP and 443 for HTTPS*
```
console.log(url.port);          //Prints '80'
```

#### protocol
Gets or sets the URL's protocol
```
console.log(url.protocol);      //Prints 'http'
```

#### query
Returns a Query object containing key-value pairs for each query-string variable
```
console.log(url.query.stripes); //Prints 'broad'
console.log(url.query);         //Prints {"stripes": "broad", "stars": "bright"}
```
You can also enumerate the Query's key-value pairs using a for...in loop:
```
for(key in url.query){
   console.log(key + ': ' + url.query[key]);
}
//Output:
//stripes: broad
//stars: bright
```

#### queryString
Gets or sets the query-string
```
console.log(url.queryString);   //Prints 'stripes=broad&stars=bright'
url.queryString = "one=fish&red=blue"
console.log(url.query);         //Prints {"one": "fish", "red": "blue"}
console.log(url.queryString);   //Prints 'one=fish&red=blue'
console.log(url.toString());    //Prints 'http://example.com/some/path?one=fish&red=blue'
```

#### url
Gets the URL string based on current values or sets the URL to a new URL
```
console.log(url.url);           //Prints 'http://example.com/some/path?stripes=broad&stars=bright'
url.domain = 'www.example.com';
url.query.stripes = 'red%20and%20white';
url.port = '8080';
console.log(url.url);           //Prints 'http://www.example.com:8080/some/path?stripes=red%20and%20white&stars=bright'
url.url = 'http://www.example.net/?good=morning';
console.log(url.domain);        //Prints 'www.example.net'
console.log(url.query.good);    //Prints 'morning'
```

### Methods
#### toString()
Returns the URL string based on current values  
```
console.log(url.toString());           //Prints 'http://example.com/some/path?stripes=broad&stars=bright'
url.domain = 'www.example.com';
url.query.stripes = 'red%20and%20white';
url.port = '8080';
console.log(url.toString());           //Prints 'http://www.example.com:8080/some/path?stripes=red%20and%20white&stars=bright'
```
