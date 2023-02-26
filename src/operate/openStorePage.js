import Hero from '../data/hero';
import init from '../init/init';
import {addStoreList as updateStoreList} from '../init/addContent';
import heroMove from './heroMove';
import {playClick} from './optionBgm';
//选择
let index=0;
function openStorePage(lastElm){
    playClick();
    const screen=document.querySelector('.screen');
    const storePage=document.querySelector('.storePage');
    screen.style.display='none';
    storePage.style.display='block';
    selectStore(lastElm);//选择
    loadOption();//加载
    deleteOption(lastElm);//删除
}
function loadOption(){
    const optionStore=document.querySelectorAll('.optionItem');
    optionStore[0].addEventListener('click',()=>{
        playClick();
        loadStore();
    })
}
function deleteOption(lastElm){
    const optionStore=document.querySelectorAll('.optionItem');
    optionStore[1].onclick=()=>{
        playClick();
        deleteStore(lastElm);
    }
}
//读取存档
function loadStore(){
    let storeList=JSON.parse(localStorage.getItem('storeList'));
    const storePage=document.querySelector('.storePage');
    let map=storeList[index].data.map;
    let hero=storeList[index].data.hero;
    let newHero=new Hero();
    hero = {
        ...hero,
        attackMonster:newHero.attackMonster,
        getGoods:newHero.getGoods,
        openDoor:newHero.openDoor,
        meetNpc:newHero.meetNpc,
        getEquipment:newHero.getEquipment,
        meetWall:newHero.meetWall,
        openShop:newHero.openShop
    }
    console.log(hero.meetWall)
    const game=document.querySelector('.game');
    game.innerHTML='';
    init(hero,map.map);
    storePage.style.display='none';
    game.style.display='block';
    heroMove(hero,map.map);
    //打开菜单
    const menu=document.querySelector('.caidanbtn');
    menu.addEventListener('click',()=>{
        import(/* webpackPrefetch:true */'./openMenu').then(({default:openMenu})=>{
            openMenu(hero,map);
        })
    })

}

function deleteStore(lastElm){
    let storeList=JSON.parse(localStorage.getItem('storeList'));
    storeList.splice(index,1);
    localStorage.setItem('storeList',JSON.stringify(storeList));
    index=0;
    updateStoreList();
    loadOption();
    deleteOption(lastElm);
    selectStore(lastElm);
}

function selectStore(lastElm){
    const storePage=document.querySelector('.storePage');
    const lastElement=document.querySelector(`${lastElm}`);
    const back=document.querySelector('.back');
    back.onclick=()=>{
        playClick();
        storePage.style.display='none';
        if(`${lastElm}`==='.game'){
            lastElement.style.display='block';
            return;
        }else{
            lastElement.style.display='flex';
            return;
        }
    }
    const storeItem=document.querySelectorAll('.storeItem');
    for(let i=0;i<storeItem.length;i++){
            storeItem[i].addEventListener('click',function(){
                playClick();
                index=i;
                for(let i=0;i<storeItem.length;i++){
                    storeItem[i].style.border="none";
                    this.style.border="5px solid #EECE4C";
                }
            })
    }
}
export default openStorePage;