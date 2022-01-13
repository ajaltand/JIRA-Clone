// ANIMATION ON MOUSEOVER ADN MOUSEOUT IN LEFT-NAV

const leftNav = document.getElementById("left-nav");

const leftNavText1 = document.querySelectorAll("#left-nav-text")[0]
const leftNavText2 = document.querySelectorAll("#left-nav-text")[1]
const leftNavText3 = document.querySelectorAll("#left-nav-text")[2]


leftNav.addEventListener("mouseenter", function(e){
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

leftNav.addEventListener("mouseleave", function(e){
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

