import init from '../init/init';
import heroMove from './heroMove';
import Hero from '../data/hero';
import Map from '../data/map';
import {playGamebgm} from './optionBgm';
import {closeScreenbgm,playClick} from './optionBgm';

//开启新的游戏
function newGame(){
    playClick();
    const screen=document.querySelector('.screen');
    const game=document.querySelector('.game');
    if(game){
        game.innerHTML='';
    }
    const newhero=new Hero();
    const newmap=new Map();
    init(newhero,newmap.map);
    const newgame=document.querySelector('.game');
    const menu=document.querySelector('.caidanbtn');
    screen.style.display='none';
    newgame.style.display='block';
    heroMove(newhero,newmap.map);
    //打开菜单
    menu.addEventListener('click',async()=>{
        const {default:openMenu}=await import(/* webpackPrefetch:true */'./openMenu.js')
        openMenu(newhero,newmap);
    })
    closeScreenbgm();
    playGamebgm();
}

export default newGame;