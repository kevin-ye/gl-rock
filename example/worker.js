/**
 * Created by eric on 23/05/16.
 */

var RockObj = require('./rock_obj.js');
var createRock = require('./rock.js');
var randomArray = require('random-array');

module.exports = function (self) {

    var count = 5;
    var rockObj;

    self.addEventListener('message',function (msg){


        console.log(" worker got message ", msg.data);

        if(count > 4) {

            rockObj = new RockObj();
            rockObj.varyStrength = 1.5;

            rockObj.varyArray(rockObj.scale, 0, 0.4, SCALE_MIN, SCALE_MAX);
            rockObj.varyArray(rockObj.scale, 1, 0.4, SCALE_MIN, SCALE_MAX);
            rockObj.varyArray(rockObj.scale, 2, 0.4, SCALE_MIN, SCALE_MAX);

            count = 0;
        }

        // always use an unique seed.
        rockObj.seed = Math.round(randomArray(0, 1000000).oned(1)[0]);

        rockObj.varyNoise();rockObj.varyColor(); rockObj.varyMesh();

        var rock = new createRock(rockObj );

        ++count;

        rockObj.varyStrength = 1.0;

        self.postMessage(rock.positions);
    });
};

/*
self.onmessage = function (msg) {
    console.log(" worker got message ", msg.data);
    self.postMessage("done!");

};

function fibo (n) {
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}*/