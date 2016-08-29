//nothing work with SYNC???
// var exec = require('child_process').execSync;

//can get output by exec ASYNC
var exec = require('child_process').exec;

// exec('fping -q -b 40 -i 10 -t 50 -r 1 -g 192.168.1.0/24');
exec('arp -a', function(e, s, es){
	console.log(e);
	console.log(s);
	console.log(es);
});

// x.on('close', function(a){
// 	console.log(a);
// });