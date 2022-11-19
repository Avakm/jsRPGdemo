import openStorePage from './openStorePage.js'
import save from './save.js';
import {closeGamebgm,playClick,playScreenbgm} from './optionBgm.js';
//打开菜单
function openMenu(hero,map){
    playClick();
    const screen=document.querySelector('.screen');
    const game=document.querySelector('.game');
    const storePage=document.querySelector('.storePage');
    const mennuItem=document.querySelectorAll('.menuItem');
    const menuContent=document.querySelector('.menuContent');

        menuContent.style.display='flex';
        //返回游戏
        mennuItem[0].addEventListener('click',()=>{
            playClick();
            menuContent.style.display='none';
        })
        //读取存档
        mennuItem[1].addEventListener('click',()=>{
            game.style.display='none';
            storePage.style.display='block';
            openStorePage('.game');
        })
        //存档
        mennuItem[2].onclick=()=>{
            game.style.display='none';
            save(hero,map);
            openStorePage('.game');
            storePage.style.display='block';
        }
        //返回主题
        mennuItem[3].addEventListener('click',()=>{
            playClick();
            menuContent.style.display='none';
            game.style.display='none';
            screen.style.display='flex';
            closeGamebgm();
            playScreenbgm();
        })

}

export default openMenu;
