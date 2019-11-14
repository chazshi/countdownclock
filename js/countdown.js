var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

// 倒计时时间，天忽略，只有时分秒
const endTime = new Date(2019,11,11,11,47,52);
var curShowTimeSeconds = 0;

window.onload = function(){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    

    // console.log(curShowTimeSeconds)
    function daojishi(){
        curShowTimeSeconds = getCurrentShowTimeSeconds();
        render( context );
        if(curShowTimeSeconds < 0) {
            int = window.clearInterval(int);
        }
    }
    var int=window.setInterval(()=>daojishi(), 1000);
    

}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 );
    // console.log(ret)
    return ret >= 0 ? ret : 0;
}

function render( cxt ){
    cxt.clearRect(0, 0, canvas.width, canvas.height);

    // console.log("curShowTimeSeconds: " + curShowTimeSeconds)
    var hours = parseInt(curShowTimeSeconds / 60 / 60 % 24);
    var minutes = parseInt(curShowTimeSeconds / 60 % 60);
    var seconds = curShowTimeSeconds % 60;
    console.log("hours: " + hours)
    console.log("minutes: " + minutes)
    console.log("seconds: " + seconds)


    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
}

function renderDigit( x , y , num , cxt ){

    // console.log("num: " + digit[num].length)

    cxt.fillStyle = "rgb(0,0,0)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                //cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
                cxt.moveTo(x-RADIUS+j*2*(RADIUS+1)+(RADIUS+1),y-RADIUS+i*2*(RADIUS+1)+(RADIUS+1));
                cxt.lineTo(x+RADIUS+j*2*(RADIUS+1)+(RADIUS+1),y-RADIUS+i*2*(RADIUS+1)+(RADIUS+1));
                cxt.lineTo(x+RADIUS+j*2*(RADIUS+1)+(RADIUS+1),y+RADIUS+i*2*(RADIUS+1)+(RADIUS+1));
                cxt.lineTo(x-RADIUS+j*2*(RADIUS+1)+(RADIUS+1),y+RADIUS+i*2*(RADIUS+1)+(RADIUS+1));
                cxt.lineTo(x-RADIUS+j*2*(RADIUS+1)+(RADIUS+1),y-RADIUS+i*2*(RADIUS+1)+(RADIUS+1));
                cxt.closePath();

                cxt.fill();
            }
}

