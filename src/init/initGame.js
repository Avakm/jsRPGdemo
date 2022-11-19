import {addScreenbgm,addGamebgm,addWelcome,addSound} from './addContent';
const itemList=[
    '新的游戏',
    '载入游戏',
    '退出游戏'
]

const initGame=async ()=>{
    const app=document.getElementById('app');
    const screen=document.createElement('div');
    screen.classList.add('screen');
    
    screen.style.backgroundImage=`url(${require('../img/bg.jpg')})`;

    for(let i=0;i<3;i++){
        const div=document.createElement('button');
        div.innerHTML=itemList[i];
        div.classList.add('choiceItem');
        screen.append(div);
    }

    app.append(screen);
    const footer=document.createElement('div');
    footer.innerHTML='魔塔@2.0';
    footer.classList.add('footer');
    screen.append(footer);
    addWelcome();
    addScreenbgm();
    addGamebgm();
    addSound();
}
export default initGame;