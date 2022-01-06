

const leftNav = document.getElementById("left-nav");
const leftNavHover = document.querySelectorAll("#left-nav")[0];
const leftNavText1 = document.querySelectorAll("#left-nav-text")[0]
const leftNavText2 = document.querySelectorAll("#left-nav-text")[1]
const leftNavText3 = document.querySelectorAll("#left-nav-text")[2]


leftNavHover.addEventListener("mouseenter", function(e){
    let wdth = 60;
    hoverAnimation = setInterval( () => {
        if (wdth== 200){
            clearInterval(hoverAnimation)
        }
        else{
            wdth=wdth+5;
            leftNav.style.width=wdth+"px";
            leftNavText1.style.display="block";
            leftNavText2.style.display="block";
            leftNavText3.style.display="block";
        }
    },5)
})

leftNavHover.addEventListener("mouseleave", function(e){
    let wdth = 200;
    hoverAnimation = setInterval( () => {
        if (wdth== 60){
            clearInterval(hoverAnimation)
        }
        else{
            wdth=wdth-5;
            leftNav.style.width=wdth+"px";
            leftNavText1.style.display="none";
            leftNavText2.style.display="none";
            leftNavText3.style.display="none";
        }
    },5)
})

