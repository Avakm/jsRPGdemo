import monsterList from '../data/monster';
//更新怪物书籍信息

function  updateBookinfo(hero,newmap) {
    const bookInfo=document.querySelector('.bookInfo');
    bookInfo.innerHTML='';
    const s=new Set();
    for(let i=0;i<newmap.length;i++){
        for(let j=0;j<newmap[i].length;j++){
            s.add(newmap[i][j])
        }
    }
    let map=[...s];
    for(let i=0;i<map.length;i++){
        if(map[i]===200){
            const div=document.createElement('div');
            const img=new Image();
            img.classList.add('monsterimg');
            img.src=require(`../img/200.png`);
            div.append(img);
            div.innerHTML+=`<div>攻击力:???</div>`;
            div.innerHTML+=`<div>防御力:???</div>`;
            div.innerHTML+=`<div>伤害:${hero.special.immune?40:400}</div>`;
            div.innerHTML+=`<div>金币:500</div>`;
            bookInfo.append(div);
        }
        if(map[i]===4||map[i]===7||map[i]===9||map[i]===10||map[i]===20||map[i]===25||map[i]===27||map[i]===30||map[i]===38||map[i]===40||map[i]===42||map[i]===48||map[i]===50||map[i]===52||map[i]===60||map[i]===80||map[i]===90||map[i]===96||map[i]===100||map[i]===110||map[i]===140||map[i]===160||map[i]===190||map[i]===220||map[i]===250||map[i]===280||map[i]===300||map[i]===330||map[i]===5008){
            monsterList.map((item)=>{
                if(item.id===map[i]){
                    const div=document.createElement('div');
                    const img=new Image();
                    img.classList.add('monsterimg');
                    img.src=require(`../img/${item.id}.png`);
                    div.append(img);
                    div.innerHTML+=`<div>攻击力:${item.ATN}</div>`;
                    div.innerHTML+=`<div>防御力:${item.DEF}</div>`;
                    div.innerHTML+=`<div>伤害:${item.ATN-hero.DEF>=0?item.ATN-hero.DEF:0}</div>`;
                    div.innerHTML+=`<div>金币:${item.gold}</div>`;
                    bookInfo.append(div);
                }
            })
        }
    }
}

export default updateBookinfo;