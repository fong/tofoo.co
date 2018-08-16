var initial = 125;

var title = "<h2>Hi, I'm Eugene. I'm currently studying computer systems, at UoA.</h2>\
<p>In my spare time, I do freelance graphic design.</p>\
<p>I also enjoy electronics, 3d printing, and coding.</p>";

var urls = ["graphic design", "electronics", "3d printing", "coding"];

var string = "";

var scrollY;
var delay;
var counter = -1;

var i = 0;
var x = 0;
var opacity = 0;
var menu = document.getElementById("menu");
var menu_state = 0;
var links = document.getElementsByClassName("menu-child");
var menu_w = 48;
var menu_h = 52;
var menu_position = 0;

var menuTimeout;

var titleID = document.getElementById("title");
var id = 0;

var frames = setInterval(refresh, 16.67);

function mouseOver(img){
    img.setAttribute("style", "z-index: 1");
}

function mouseOut(img){
    img.setAttribute("style", "z-index: 0");
}

function openMenu(){
    if (menu_state){
        menu_state = 0;
        clearTimeout(menuTimeout);
    } else {
        menu_state = 1;
        menuTimeout = setTimeout(closeMenu, 5000);
    }
}

function refresh(){
    pageInit();
    topVisible();
    menuToggle();
    counter++;
}

function pageInit(){
    if (i < title.length){
        delay = Math.floor((Math.random() * 4) + 1);
        if ((counter % delay == 0) && (counter > initial)){
            if (title.charCodeAt(i) != 60) {
                string += title[i];
                i++;
                delay = Math.floor((Math.random() * 4) + 1);
            } else {
                x = title.indexOf(">", i);
                string += title.slice(i, x+1);
                console.log(string);
                i = x+1;
            }
        }
    }

    if (id < 4 && i >= title.length){
        if (counter % 12 == 0){
            URLsequence(id);
            titleID.innerHTML = string;
            id++;
        }
    }

    if (id < 4){titleID.innerHTML = string;}
}

function topVisible(){
    scrollY = window.pageYOffset;

    if (scrollY < window.innerHeight/4){
        document.getElementById("goTop").setAttribute("style", "visibility: hidden");
        opacity = 0.0;    
    } else if ((scrollY >= window.innerHeight/4) && (scrollY < window.innerHeight*3/4)){
        document.getElementById("goTop").setAttribute("style", "visibility: visible");
        opacity = (scrollY-window.innerHeight/4)/window.innerHeight*3/4;
    } else {
        document.getElementById("goTop").setAttribute("style", "visibility: visible");
        opacity = 1.0;
    }

    document.getElementById("goTop").style.opacity = opacity;
}

function menuToggle(){
    if (menu_state){
        if (menu_position == 0){
            menu.style.backgroundColor = "rgba(220,0,0,1)";
            menu_position++;
        } else if ((menu_position > 0) && (menu_position <= 3)){
            menu.style.backgroundColor = "rgba(255,0,0,0.9)";
            menu_w += 40;
            menu.style.width = menu_w + "px";
            menu_position++;
            console.log("w:" + menu_w);
        } else if ((menu_position > 3) && (menu_position < 9)){
            menu_h += 40;
            menu.style.height = menu_h + "px";
            menu_position++;
            console.log("h:" + menu_h);
        } else if (menu_position == 9) {
            links = document.getElementsByClassName("menu-child");
            for (var c = 0; c < links.length; c++){
                links[c].style.display = "block";
            }
        }

    } else if (!menu_state){
        if (menu_position == 0){

        }else if ((menu_position > 0) && (menu_position <= 3)){
            menu.style.backgroundColor = "rgba(255,0,0,0.8)";
            menu_w -= 40;
            menu.style.width = menu_w + "px";
            menu_position--;
            console.log("w:" + menu_w);
        } else if ((menu_position >= 3) && (menu_position < 9)){
            menu.style.backgroundColor = "rgba(255,0,0,0.9)";
            menu_h -= 40;
            menu.style.height = menu_h + "px";
            menu_position--;
            console.log("h:" + menu_h);
        } else if (menu_position == 9) {
            links = document.getElementsByClassName("menu-child");
            for (var c = 0; c < links.length; c++){
                links[c].style.display = "none";
            }
            menu_position--;
        }
    }
}

function closeMenu(){
    menu_state = 0;
}

function menuScroll(ID){
    menuToggle();
    scrollToID(ID);
}

function scrollToID(id){
    document.getElementById(id).scrollIntoView();
}

function URLsequence(urlID){
    //addURL(urls[urlID]);
    var link;
    switch (urls[urlID]){
        case "graphic design":
            link = "graphics";
            break;
        case "electronics":
            link = "electronics";
            break;
        case "3d printing":
            link = "3d";
            break;
        case "coding":
            link = "coding";
            break;
    }

    x = string.indexOf(urls[urlID]);

    string = string.slice(0, x) + '<a onclick="scrollToID(' + "'" + link + "'" + ')' + '"' + '>' +
        string.slice(x, x+urls[urlID].length) + "</a>" + string.slice(x+urls[urlID].length);
}
