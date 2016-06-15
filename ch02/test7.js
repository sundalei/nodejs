var a = {a : 'b', c : 'd'};

Object.prototype.d = 'e';

for(var i in a) {
  if(a.hasOwnProperty(i)) {
    console.log(i);
  }
}

console.log(Object.keys(a));
