let x=null
let y=null
let r=null
const width=650;
const height = 650;
const distanceDoteLine=40;
const lenDoteLine=20
const arrowSize=30;
function get_color_red(i,el){
    document.querySelectorAll(".point_"+el).forEach(x=>x.style.color="black");
    const id=i+el;
    document.getElementById(id).style.cssText=
        "color: red";
}

function clear_form(){
    document.querySelectorAll(".point_x").forEach(x=>x.style.color="black");
    document.getElementById("y").value="";
    document.getElementById("r").value="";
    x=null
    let fail=document.getElementById("fail");
    fail.innerHTML="";
    draw(0)
}
function choice_x_value(value){
    get_color_red(value,"x");
    x=value
}
function send(event){

    let startTime=performance.now();
    let s="";

    y=document.getElementById("y").value;
    y=y.replace(",",".");
    r=document.getElementById("r").value;

    if (x==null||x==""){
        s+="<br> Выберете X"

    }
    if (y==""){
        s=s+"<br> Неверный ввод Y";

    }if (r=="" || isNaN(r)){
        s=s+"<br> Выберете R";

    }    if (s!=""){

        let fail=document.getElementById("fail");
        fail.innerHTML=s}else{


        let fail=document.getElementById("fail");
        fail.innerHTML=s

        let request=$.ajax({
            type:"POST",
            url:"../Controller/ControllerServlet",
            data:{r:r,x:x,y:y}});

    }



}
function drawGraphic(radius,ctx){


    ctx.beginPath();
    ctx.lineWidth=10;
    ctx.moveTo(width/2,height/2 - distanceDoteLine * radius)
    ctx.lineTo(width/2,height/2)
    ctx.lineTo(width/2+radius*2*distanceDoteLine,height/2)
    ctx.lineTo(width/2,height/2 + radius*2*distanceDoteLine)
    ctx.lineTo(width/2-radius*2*distanceDoteLine,height/2 + radius*2*distanceDoteLine)
    ctx.lineTo(width/2 - radius*2*distanceDoteLine,height/2)
    ctx.stroke()

    ctx.arc(width/2,height/2,radius*distanceDoteLine,Math.PI,-Math.PI/2)
    ctx.stroke()


}
function drawLinesXY(ctx){
    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2,height);
    ctx.stroke()
    ctx.moveTo(0,height/2);
    ctx.lineTo(width,height/2)
    ctx.stroke()
    ctx.moveTo(width/2 - arrowSize,arrowSize);
    ctx.lineTo(width/2,0);
    ctx.stroke();
    ctx.moveTo(width/2 + arrowSize,arrowSize)
    ctx.lineTo(width/2,0)
    ctx.stroke()
    ctx.moveTo(width-arrowSize,height/2 - arrowSize)
    ctx.lineTo(width,height/2)
    ctx.moveTo(width-arrowSize,height/2 + arrowSize)
    ctx.lineTo(width,height/2)
    ctx.stroke();
    ctx.font="bold 40px sans-serif"
    ctx.fillText("x",19*width/20,height/2 + arrowSize)
    ctx.fillText("y",width/2,height/20)
    for (let i=-7; i<=7 ; i++){
        drawLineXNumbers(i,ctx)
    }
    for (let i=-7;i<0;i++){
        drawLineYNumbers(i,ctx)
    }
    for (let i=1;i<=7;i++){
        drawLineYNumbers(i,ctx)
    }
}
function drawLineXNumbers(number, ctx){
    ctx.moveTo(width/2+number*distanceDoteLine,height/2+lenDoteLine/2);
    ctx.lineTo(width/2+number*distanceDoteLine,height/2 -lenDoteLine/2);
    ctx.stroke()
    ctx.font="bold 11pt sans-serif"
    ctx.fillText((number/2).toString(),width/2+number*distanceDoteLine,height/2 + 3*lenDoteLine/4)
}
function drawLineYNumbers(number, ctx){
    ctx.moveTo(width/2 +lenDoteLine/2,height/2-number*distanceDoteLine);
    ctx.lineTo(width/2 -lenDoteLine/2,height/2-number*distanceDoteLine);
    ctx.stroke()
    ctx.font="bold 11pt sans-serif"
    ctx.fillText((number/2).toString(),width/2 + 3*lenDoteLine/4,height/2-number*distanceDoteLine)
}

function draw(radius){
    drawAll(radius);
    drawAll(radius) //костыль :)
}
function drawAll(radius){
    let canvas = document.getElementById("canvas");
    let ctx= canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.lineWidth=1;
    drawLinesXY(ctx);if(radius!==""){
        drawGraphic(radius,ctx)}}

function checkPoint(event){
    if (r===0 || r===null || r===""){
        let fail=document.getElementById("fail");
        fail.innerHTML="Выберете R";

    }else {
        let fail=document.getElementById("fail");
        fail.innerHTML="";

        let x = (event.clientX - width / 2) / 2 / distanceDoteLine
        let y = -(event.clientY - height / 2) / 2 / distanceDoteLine
        let request = $.ajax({
            type: "POST",
            url: "../Controller/ControllerServlet",
            data: {r: r, x: x, y: y}
        });
        drawPoint(x,y,"blue")


    }


}
function drawPoint(x,y,color){
    let canvas = document.getElementById("canvas");
    let ctx= canvas.getContext("2d");
    ctx.beginPath();
    let XCanvas = x*distanceDoteLine*2+width/2
    let YCanvas=height/2 - y * distanceDoteLine * 2;
    ctx.fillStyle=color;
    ctx.arc(XCanvas,YCanvas,5,0,2*Math.PI)

    ctx.fill()

}