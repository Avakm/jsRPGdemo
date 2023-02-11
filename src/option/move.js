import updateMap from './updateMap';
import openAlert from './alert';
import {addHeroinfo as updateHeroinfo}from '../init/addContent';
import {addEquipList as updateEquipinfo} from '../init/addContent';
import event from './event';

//英雄坐标
const heronextPoint={};
//向上移动
function toUp(hero,maps){
	const map=maps[hero.floor-1];
    heronextPoint.x=hero.heroPoint.x;
	heronextPoint.y=hero.heroPoint.y-1;
	if((heronextPoint.x<0||heronextPoint.x>10)||(heronextPoint.y<0||heronextPoint.y>10)){
		return;
	}
	const mvalue=map[heronextPoint.y][heronextPoint.x];
	heroMove(mvalue,hero,maps);
}
//向下移动
function toDown(hero,maps){
	const map=maps[hero.floor-1];
    heronextPoint.x=hero.heroPoint.x;
	heronextPoint.y=hero.heroPoint.y+1;
	if((heronextPoint.x<0||heronextPoint.x>10)||(heronextPoint.y<0||heronextPoint.y>10)){
		return;
	}
	const mvalue=map[heronextPoint.y][heronextPoint.x];
	heroMove(mvalue,hero,maps);
}
//向右移动
function toRight(hero,maps){
	const map=maps[hero.floor-1];
    heronextPoint.x=hero.heroPoint.x+1;
	heronextPoint.y=hero.heroPoint.y;
	if((heronextPoint.x<0||heronextPoint.x>10)||(heronextPoint.y<0||heronextPoint.y>10)){
		return;
	}
	const mvalue=map[heronextPoint.y][heronextPoint.x];
	heroMove(mvalue,hero,maps);
}

//向左移动
function toLeft(hero,maps){
	const map=maps[hero.floor-1];
    heronextPoint.x=hero.heroPoint.x-1;
	heronextPoint.y=hero.heroPoint.y;
	if((heronextPoint.x<0||heronextPoint.x>10)||(heronextPoint.y<0||heronextPoint.y>10)){
		return;
	}
	const mvalue=map[heronextPoint.y][heronextPoint.x];
	heroMove(mvalue,hero,maps);
}

function heroMove(mvalue,hero,maps){
	let map=maps[hero.floor-1];
	//是否遇到特殊事件
	event(hero,map,mvalue);
	let flag=event(hero,map,mvalue,maps);
	if(flag){
		return;
	}
	if(mvalue==29){
		return;
	}
	//遇到怪物
	if(mvalue==4||mvalue==7||mvalue==9||mvalue==10||mvalue==20||mvalue==25||mvalue==27||mvalue==30||mvalue==38||mvalue==40||mvalue==42||mvalue==48||mvalue==52||mvalue==60||mvalue==80||mvalue==90||mvalue==96||mvalue==100||mvalue==110||mvalue==140||mvalue==160||mvalue==190||mvalue==220||mvalue==250||mvalue==280||mvalue==300){
		hero.attackMonster(mvalue);
		let isAttack=hero.attackMonster(mvalue);
		if(isAttack){
			updateHeroinfo(hero);
		}else{
			return;
		}
	}
	//遇到物品
	if(mvalue==6||mvalue==12||mvalue==22||mvalue==23||mvalue==20002||mvalue==20004||mvalue==20006||mvalue==20008||mvalue==50001||mvalue==50002||mvalue==50003||mvalue==50004){
		hero.getGoods(mvalue);
		updateHeroinfo(hero);
	}
	//遇到装备
	if(mvalue==30001||mvalue==30002||mvalue==30003||mvalue==30004||mvalue==30005||mvalue==30006||mvalue==30007||mvalue==30008||mvalue==30009||mvalue==30010||mvalue==30011||mvalue==30012||mvalue==30013||mvalue==30005){
		hero.getEquipment(mvalue);
		updateHeroinfo(hero);
		updateEquipinfo(hero);
	}
	//遇到Npc
	if(mvalue==21||mvalue==10001||mvalue==10002||mvalue==10003||mvalue==10004||mvalue==10005||mvalue==10008||mvalue==10009){
		hero.meetNpc(mvalue);
		return;
	}
	//开门
	if(mvalue==20001||mvalue==20003||mvalue==20005||mvalue==20007){
		let isOpen=hero.openDoor(mvalue);
		if(isOpen){
			updateHeroinfo(hero);
		}else{
			return;
		}
	}
	if(mvalue==40001||mvalue==40002||mvalue==40003){
		hero.openShop();
		updateHeroinfo(hero);
		return;
	}
	//上楼
    if(mvalue==24){
        hero.floor+=1;
        map=maps[hero.floor-1];
        updateMap(hero,map);
		updateHeroinfo(hero);
        return;
    }
	//下楼
	if(mvalue==8){
        hero.floor-=1;
        map=maps[hero.floor-1];
        updateMap(hero,map);
		updateHeroinfo(hero);
        return;
    }
	if(mvalue==0||mvalue==2||mvalue==3||mvalue==5){
		hero.meetWall(mvalue);
		let isTrue=hero.meetWall(mvalue);
		if(isTrue){
			return;
		}
	}
	if(mvalue==200){
		if(hero.special.immune==false){
			hero.blood-=400;
			openAlert('生命值减少了400,金币+500');
		}else{
			hero.blood-=40;
			openAlert('生命值减少了40,金币+500');
		}
		hero.glod+=500;
		updateHeroinfo(hero);
	}
		
	//更新地图
	map[hero.heroPoint.y][hero.heroPoint.x]=1;
	map[heronextPoint.y][heronextPoint.x]=15;
	//更新英雄的位置
	hero.heroPoint.x=heronextPoint.x;
	hero.heroPoint.y=heronextPoint.y;
    updateMap(hero,map);
}


export{
    toUp,
    toDown,
    toRight,
    toLeft
}