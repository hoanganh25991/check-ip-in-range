//check ping
//by fping to all ip  in range
//then arp -an to summary what is going on
/**
 * for basic task like format string
 * @type {[type]}
 */
var util = require('util');
/**
 * Find out macAdd in range of [active devices]
 * @param  {[type]} activeDeviceInfo [description]
 * @param  {[type]} macAdd           [description]
 * @return {[type]}                  [description]
 */
var checkMacAdd = function(activeDeviceInfo, macAdd){
	//console.log(activeDeviceInfo, macAdd);

	var info = false;

	var i = 0,
		hasMacAdd = false;

	while(!hasMacAdd && i < activeDeviceInfo.length){
		var row = activeDeviceInfo[i];
		
		var hasMacAdd = row.includes(macAdd);

		if(hasMacAdd){
			var arr = row.split(/\s+/); //? (192.168.1.76) at 64:eb:8c:2b:22:44 [ether] on wlan0
			// arr.splice(0);			//0		1			2	3				4		5	6
			info = {
				ip: arr[1].replace(/\(|\)/g, ''),
				mac: arr[3]
			};
		}

		i++;
	}

	return info;
};
/**
 * export function for this module
 * @param  {[type]} macAdd [description]
 * @return {[type]}        [description]
 */
var checkMacAddInNetwork = function(macAdd){
	var info = false;
	var exec = require('child_process').exec;
	
	// exec('arp -an', puts);
	var x2;
	var x1 = exec("fping -q -b 40 -i 10 -t 50 -r 1 -g 192.168.1.0/24", function(){
		x2 = exec('arp -an', function(error, stdout, stderr){
			if(error){
				//console.log('arp -an get error');
				return;
			}
			//console.log('this is the content of stdout');
			//console.log(stdout);
			var activeDeviceInfo = stdout.split('\n');

			//console.log(activeDeviceInfo.length);

			var tmp = [];

			activeDeviceInfo.forEach(function(row){
				var completeCheck = !row.includes('incomplete') && row;
				if(completeCheck){
					tmp.push(row);
				}
			});

			//console.log(tmp.length);

			// //console.log(tmp);

			info = checkMacAdd(tmp, macAdd);

			//console.log(info);
		});
	});

	this.onFinished = function(callback){
		return this.on('finished', callback);
	};

	this.on = function(status, callback){
		var currentSupport = ['finished'];
		
		if(currentSupport.indexOf(status) < 0){
			console.log(util.format('On <%s>: Event not supported', status));
			return;
		}
		
		x1.on('close', function(){
			x2.on('close', function(){
				console.log(util.format('On <%s>: '), status, info);
				callback(info);
				return;
			});
		});
	};

	return this;
}

module.exports = checkMacAddInNetwork;