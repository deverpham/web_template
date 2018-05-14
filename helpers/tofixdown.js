var toFixedDown = function(num, rn) {
	var array = num.toString().split('.');
  if(array.length == 1) {
  	return num;
  } else {
  	last = array[array.length-1];
    array[array.length-1] = array[array.length-1].slice(0,rn);
    return array.join('.');
  }
}
module.exports = toFixedDown;