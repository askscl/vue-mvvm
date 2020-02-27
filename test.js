let obj = {};
let song = '发如雪';
obj.singer = '周杰化';

Object.defineProperty(obj,'music', {
    configurable: true,
    enumerable: true,
    get(){
        return song;
    },
    set(val) {
        song = val;
    }
});

console.log(obj);

delete obj.music;

console.log(obj);

obj.music = '听妈妈的话';
console.log(obj);

for(let key in obj){
    console.log(key);
}

console.log(obj.music);
obj.music = '夜曲';
console.log(obj.music);
