import {playClick} from './optionBgm'

//退出游戏.....
function exitGame(){
    playClick();
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
        window.location.href="about:blank";
    }else if(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1){
        window.opener=null;window.open('about:blank','_self','').close();
    }else {
        window.opener = null;
        window.open("about:blank", "_self");
        window.close();
    }
}

export default exitGame