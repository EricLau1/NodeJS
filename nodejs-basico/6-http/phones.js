module.exports = () => {
    var ddd = Math.floor(Math.random() * 99);
    ddd = (ddd < 10)? `0${ddd}`: ddd;
    const num = "" + Math.floor(Math.random() * 999999999);
    //console.log('generate number: ' + num);
    const format = num.slice(0, 5) + "-" + num.slice(5, num.length);
    return `(${ddd}) ${format}`;   
}