//打开音乐
function playScreenbgm(){
    const screenbgm=document.querySelector('.screenbgm');
    screenbgm.load();
    screenbgm.play();
}
function playGamebgm(){
    const gamebgm=document.querySelector('.gamebgm');
    gamebgm.load();
    gamebgm.play();
}
//播放点击音效
function playClick(){
    const clicksound=document.querySelector('.click');
    clicksound.play();
}
//播放走路音效
function playFooter(){
    const footer=document.querySelector('.footersound');
    footer.play();
}
//播放捡东西音效
function playGather(){
    const gather=document.querySelector('.gather');
    gather.play();
}
//播放开门音效
function playOpendoor(){
    const opendoor=document.querySelector('.opendoor');
    opendoor.play();
}
//播放攻击音效
function playAttack(){
    const attack=document.querySelector('.attack');
    attack.play();
}
function playDestory(){
    const destory=document.querySelector('.destory');
    destory.play();
}
//关闭音乐
function closeScreenbgm(){
    const screenbgm=document.querySelector('.screenbgm');
    screenbgm.pause();
}
function closeGamebgm(){
    const gamebgm=document.querySelector('.gamebgm');
    gamebgm.pause();
}

export {
    closeGamebgm,
    closeScreenbgm,
    playGamebgm,
    playScreenbgm,
    playClick,
    playFooter,
    playGather,
    playOpendoor,
    playAttack,
    playDestory
}