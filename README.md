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
Returns a Query object containing key-value pairs for each querystring variable
```
console.log(url.query.stripes); //Prints 'broad'
console.log(url.query);         //Prints {"stripes": "broad", "stars": "bright"}
```

#### url (read-only)
Returns the URL string based on current values
```
console.log(url.url);           //Prints 'http://example.com/some/path?stripes=broad&stars=bright'
url.domain = 'www.example.com';
url.query.stripes = 'red%20and%20white';
url.port = '8080';
console.log(url.url);           //Prints 'http://www.example.com:8080/some/path?stripes=red%20and%20white&stars=bright'
```

### Methods
#### toString()
Returns the URL string based on current values  
*Identical to the **url** property*
```
console.log(url.toString());           //Prints 'http://example.com/some/path?stripes=broad&stars=bright'
url.domain = 'www.example.com';
url.query.stripes = 'red%20and%20white';
url.port = '8080';
console.log(url.toString());           //Prints 'http://www.example.com:8080/some/path?stripes=red%20and%20white&stars=bright'
```