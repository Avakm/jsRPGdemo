import fastClick from 'fastclick';
import 'lib-flexible';
import initGame from './init/initGame';
import initStore from './init/initStore';
import initMainpage from './init/initMainpage'
import exitGame from './operate/exitGame';
import 'reset-css';
import './css/border.css'
import './css/style.css';

fastClick.attach(document.body);
//初始化界面
initGame();
//初始化储存页面
initStore();
//初始化游戏界面
initMainpage();
const choiceItem=document.querySelectorAll('.choiceItem');
//界面选择
//1.新游戏
choiceItem[0].addEventListener('click',async()=>{
    const {default:newGame}=await import(/* webpackPrefetch:true */'./operate/newGame.js');
    newGame();
})
//2.读取存档
choiceItem[1].addEventListener('click',()=>{
    import(/* webpackPrefetch:true */'./operate/openStorePage').then(({default:openStorePage})=>{
        openStorePage('.screen'); 
    })
})
//3.退出游戏
choiceItem[2].addEventListener('click',()=>{
    exitGame();
})
