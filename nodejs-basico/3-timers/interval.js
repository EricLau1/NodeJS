var interval = function (callback, time) {

    setTimeout(function (){
        callback();
        // função chamada recursivamente
        interval(callback, time);
    }, time);
};

interval(function (){
    console.log(new Date());
}, 1000);