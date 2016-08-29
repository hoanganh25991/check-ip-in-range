var checkAdd = require('./check-ip-in-range.js');

// checkAdd('64:eb:8c:2b:22:44').onFinished(function(info){
// 	console.log(info);
// });
// 
checkAdd('64:eb:8c:2b:22:44').on('finished', function(info){
	console.log(info);
});

checkAdd('64:eb:8c:2b:22:44').on('abc', function(info){
	console.log(info);
});



