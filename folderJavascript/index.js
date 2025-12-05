// fundamental of js
// arrays and objects
// function return
// async js coding


const arr = [1,2,3,4,4,5,6];
arr.forEach(function(val){
    console.log(val + " Dheeraj Sonkar")
})

const newarray = arr.map(function(val){
    return val * 2;
})
console.log(newarray) 

const Array = arr.filter(function(val){
    if(val >=3) return true;
    else return false;
})
console.log(Array)

const findarray = arr.find(function(val){
    if (val ===4) return val;
})
console.log(findarray)


const obj = {
    name: "Dheeraj Sonkar",
    age: 24
}
// Object.freeze(obj);
obj.age = 22;
console.log(obj)

function abcd(){
    return "Dheeraj Sonkar"
}
console.log(abcd()) 