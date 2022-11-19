import equipmentList from '../data/equipment';
//増加内容
const buttonList=[
    {
        class:'up',
        icon:'↑'
    },
    {
        class:'left',
        icon:'←',
    },
    {
        class:'right',
        icon:'→'
    },
    {
        class:'down',
        icon:'↓',
    }
];
const imgUrl=[
    require('../img/EnemyBook.png'),
    require('../img/weeponList.png'),
    '帮助'
];
const menuItemList=[
    '返回游戏',
    '载入游戏',
    '保存游戏',
    '返回主题'
]
function addHeroinfo(hero){
    let text=[
        `楼层:${hero.floor}`,
        `血量:${hero.blood}`,
        `攻击力:${hero.ATN}`,
        `防御力:${hero.DEF}`,
        `金币:${hero.gold}`
    ];
    let keyList=[
        `黄钥匙:${hero.keyList.yellowKey}`,
        `蓝钥匙:${hero.keyList.blueKey}`,
        `红钥匙:${hero.keyList.redKey}`,
        `绿钥匙:${hero.keyList.greenKey}`
    ]
    const content=document.querySelector('.content');
    content.innerHTML='';
    for(let i=0;i<6;i++){
        let item=document.createElement('div');
        if(i==5){
            for(let j=0;j<4;j++){
                let keyitem=document.createElement('div');
                keyitem.classList.add('keyitem');
                keyitem.innerHTML=keyList[j];
                item.append(keyitem)
            }
        }else{
            item.innerHTML=text[i];
            item.classList.add('infoitem');
        }
        content.append(item);
    }
}
//増加装备列表
function addEquipList(hero){
    const equipList=document.querySelector('.equip');
    equipList.innerHTML='';
    for(let i of hero.equipList){
        let img=new Image();
        img.classList.add('equipimg');
        img.src=require(`../img/${i}.png`);
        equipList.append(img);
    }
}
//増加装备信息
function addEquipinfo(){
    const equipInfo=document.querySelector('.equipinfo');
    equipmentList.map((item,index)=>{
        const div=document.createElement('div');
        let img=new Image();
        img.classList.add('equipimg');
        img.src=require(`../img/${30000+index+1}.png`);
        div.append(img);
        div.innerHTML+=`<div>${item.info}</div>`;
        equipInfo.append(div);
    })
    const div=document.createElement('div');
    div.innerHTML='再次点击关闭'
    equipInfo.append(div);
}
//増加操作按钮
function addButton(){
    const option=document.querySelector('.option');
    for(let i=0;i<4;i++){
        const btn=document.createElement('button');
        btn.classList.add(buttonList[i].class);
        btn.innerHTML=buttonList[i].icon;
        option.append(btn);
    }
}

function addMenu(){
    const caidan=document.querySelector('.caidan');
    const btn=document.createElement('button');
    btn.classList.add('caidanbtn');
    btn.innerHTML='菜单';
    caidan.append(btn);
}
//菜单信息
function addMenuContent(){
    const game=document.querySelector('.game');
    const div=document.createElement('div');
    div.classList.add('menuContent');
    div.style.display='none';
    for(let i=0;i<4;i++){
        const btn=document.createElement('button');
        btn.classList.add('menuItem');
        btn.innerHTML=menuItemList[i];
        div.append(btn);
    }
    game.append(div);
}
//右侧信息栏
function addMessage(){
    const message=document.querySelector('.message');
    for(let i=0;i<3;i++){
        const div=document.createElement('div');
        if(i!=2){
        const img=new Image();
        img.src=imgUrl[i];
        div.classList.add('messageItem');
        div.append(img);
        }else{
        div.classList.add('help');
        div.innerHTML=imgUrl[i];
        }
        message.append(div);
    }
}
//加入存储信息
function addStoreList(){
    const storePage=document.querySelector('.storePage');
    storePage.innerHTML='';
    //创建返回
    const back=document.createElement('div');
    back.classList.add('back');
    back.innerHTML='<返回';
    storePage.append(back);
    //创建存档选择区域
    const div=document.createElement('div');
    div.classList.add('optionStore');
    let btn1=document.createElement('button');
    btn1.innerHTML='确定';
    btn1.classList.add('optionItem');
    div.append(btn1);
    let btn2=document.createElement('button');
    btn2.innerHTML='删除';
    btn2.classList.add('optionItem');
    div.append(btn2);
    storePage.append(div);
    const storeList=JSON.parse(localStorage.getItem('storeList'));
    if(storeList){
        storeList.map((item,index)=>{
            if(item){
                const div=document.createElement('div');
                div.classList.add('storeItem');
                div.innerHTML+=`<div>存档${index+1}</div>`;
                div.innerHTML+=`<div>第${storeList[index].info.floor}层</div>`;
                div.innerHTML+=`<div>${storeList[index].info.date}</div>`;
                if(index==0){
                    div.style.border="5px solid #EECE4C"
                }
                storePage.append(div);
            }
        })
    }else{
        const div=document.createElement('div');
        div.innerHTML='空';
        div.classList.add('nostore')
        storePage.append(div);
    }
    
}
//添加欢迎信息
function addWelcome() {
    const screen=document.querySelector('.screen');
    const shade=document.createElement('div');
    shade.classList.add('shade');
    screen.append(shade);
    const div=document.createElement('div');
    div.classList.add('welcome');
    div.innerHTML='<p>欢迎来到本游戏！！！</p>';
    div.innerHTML+='<p>点击任意继续</p>'
    shade.append(div);   
}
//添加界面音乐
function addScreenbgm(){
    const app=document.querySelector('#app');
    const shade=document.querySelector('.shade');
    let bgm=new Audio();
    bgm.classList.add('screenbgm');
    bgm.src=require('../bgm/bgm1.mp3');
    bgm.loop=true;
    app.append(bgm);
    shade.onclick=()=>{
        shade.style.display='none';
        bgm.play();
    }
  
}
//添加游戏音乐
function addGamebgm(){
    const app=document.querySelector('#app');
    const choiceItem=document.querySelectorAll('.choiceItem');
    let bgm=new Audio();
    bgm.classList.add('gamebgm');
    bgm.src=require('../bgm/bgm2.mp3');
    bgm.loop=true;
    bgm.volume=0.3;
    app.append(bgm);
    choiceItem[0].onclick=()=>{
        bgm.play();
    }
}
//添加声效
function addSound(){
    const soundList=[
        'attack','click','footersound','footer2sound','gather','opendoor','destory'
    ]
    soundList.map((item)=>{
        let sound=new Audio();
        sound.classList.add(item);
        sound.src=require(`../bgm/${item}.mp3`);
        app.append(sound);
    })
}
export {
    addHeroinfo,
    addEquipList,
    addEquipinfo,
    addButton,
    addMenu,
    addMessage,
    addMenuContent,
    addStoreList,
    addScreenbgm,
    addWelcome,
    addGamebgm,
    addSound
}