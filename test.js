var urlMgr = require('./url-mgr');

var url = new urlMgr.Url('http://example.com/?name=bob');

console.log('1. Query object:', url.query);
console.log(`2. URL path: ${url.path}`);

url.query.name = 'saam';
url.query.age = '21';

console.log('3. Query object:', url.query);

console.log(`4. Query "name": ${url.query.name}`);
console.log(`5. Query "age": ${url.query.age}`);

let i = 0;
for(let key in url.query){
	console.log(`6-${i++}. Query item "${key}": ${url.query[key]}`);
}