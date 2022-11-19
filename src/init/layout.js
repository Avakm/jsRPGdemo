import initmap from './initMap';
import  * as addContent from './addContent';

const game=document.getElementsByClassName('game');
//创建顶部区域
function createTop(hero,map){
    const top=document.createElement('div');
    top.classList.add('top');
    game[0].append(top);
    initmap(hero,map);
}
//创建信息区域
function createContent(hero){
    const top=document.getElementsByClassName('top');
    const content=document.createElement('div');
    content.classList.add('content');
    content.style.height=11+'rem';
    content.style.width=2.1+'rem';
    top[0].append(content);
    addContent.addHeroinfo(hero);
}

//创建提示区域
function createAlert(){
    const alert=document.createElement('div');
    alert.classList.add('alert');
    game[0].append(alert);
}
//创建npc对话区
function createNpcinfo(){
    const npc=document.createElement('div');
    npc.classList.add('npc');
    game[0].append(npc);
}
//创建装备情报区
function createEquipinfo(){
    const equipInfo=document.createElement('div');
    equipInfo.classList.add('equipinfo');
    game[0].append(equipInfo);
    addContent.addEquipinfo();
}
//创建怪物信息
function createBookinfo() {
    const bookInfo=document.createElement('div');
    bookInfo.classList.add('bookInfo');
    game[0].append(bookInfo);
}
//创建商店信息
function createShopinfo() {
    const shopInfo=document.createElement('div');
    shopInfo.classList.add('shopInfo');
    game[0].append(shopInfo);
}
//创建菜单按钮
function createMenu(){
    const menu=document.createElement('div');
    menu.classList.add('menu');
    game[0].append(menu);
    addContent.addMenuContent();
}
//创建装备列表区
function createEquipment(hero){
    const equip=document.createElement('div');
    equip.classList.add('equip');
    game[0].append(equip);
    addContent.addEquipList(hero);
}
//创建更多说明
function createHelpinfo(){
    const div=document.createElement('div');
    div.classList.add('helpinfo');
    div.innerHTML='<div>游戏规则:</div>';
    div.innerHTML+='<p>1.英雄的攻击力>怪物的防御力才能进行攻击</p>';
    div.innerHTML+='<p>2.如果英雄攻击怪物，生命值将小于0，则无法攻击</p>';
    div.innerHTML+='<p>3.英雄受到的伤害=怪物的功击力-英雄的防御力(若怪物的攻击力<英雄的防御力，英雄受到的伤害为0)</p>';
    div.innerHTML+='<p>4.某些装备隐藏在特殊地方，需触发特殊事件才能获得</p>';
    div.innerHTML+='<p>5.npc的对话可能包含一些关键信息</p>';
    game[0].append(div);
}
//创建操作区域
function createOptions(){
    const optionList=document.createElement('div');
    optionList.classList.add('optionList');
    //菜单
    const caidan=document.createElement('div');
    caidan.classList.add('caidan');
    optionList.append(caidan)
    //操作按钮
    const option=document.createElement('div');
    option.classList.add('option');
    optionList.append(option);
    //操作说明
    const message=document.createElement('div');
    message.classList.add('message');
    optionList.append(message);

    game[0].append(optionList);
    addContent.addButton();
    addContent.addMenu();
    addContent.addMessage();
    //打开装备信息
    const messageItem=document.querySelectorAll('.messageItem');
    const equipInfo=document.querySelector('.equipinfo');
    equipInfo.style.display='none';
    messageItem[1].addEventListener('click',()=>{
         if(equipInfo.style.display==='none'){
             equipInfo.style.display='flex';
         }else{
             equipInfo.style.display='none';
         }
    })
    const bookInfo=document.querySelector('.bookInfo');
    bookInfo.style.display='none';
    //打开怪物信息
    messageItem[0].addEventListener('click',()=>{
         if(bookInfo.style.display==='none'){
             bookInfo.style.display='flex';
         }else{
             bookInfo.style.display='none';
         }
    })
    //打开帮助
    const help=document.querySelector('.help');
    const helpinfo=document.querySelector('.helpinfo');
    help.addEventListener('click',()=>{
        if(helpinfo.style.display==='none'){
            helpinfo.style.display='flex';
        }else{
            helpinfo.style.display='none';
        }
    })
}
export{
    createTop,
    createContent,
    createAlert,
    createEquipinfo,
    createBookinfo,
    createShopinfo,
    createMenu,
    createEquipment,
    createOptions,
    createNpcinfo,
    createHelpinfo
}