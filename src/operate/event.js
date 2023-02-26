import updateMap from './updateMap';
import openNpcinfo from './openNpcinfo';
import {addHeroinfo as updateHeroinfo}from '../init/addContent';

let isget1=true;
let isget2=true;
function sufferEvent(hero,map,mvalue,maps){
    let flag=false;
    if(mvalue<5010&&mvalue>5000&&mvalue!=5008){
        flag=true;
        return flag;
    }
    if(hero.floor==2&&mvalue==4){
        flag=true;
        map[2][6]=map[2][7]=map[2][8]=map[3][7]=map[4][6]=map[4][7]=map[4][8]=1;
		map[3][8]=50;
		map[3][5]=5;
        updateMap(hero,map);
        let message=['史莱姆国王:哈哈没想到吧，真觉得我们史莱姆家族好欺负!!(点击任意键继续)'];
        openNpcinfo(message,0);
        return flag;
    }
    if(mvalue==18){
        flag=true,
		map[8][9]=30009;
		updateMap(hero,map);
        return flag;
	}
    if(hero.floor==2&&mvalue==50){
        flag=true;
        hero.attackMonster(mvalue);
		let isAttack=hero.attackMonster(mvalue);
		if(isAttack){
			updateHeroinfo(hero);
		}else{
			return flag;
		}
        map[1][6]=map[1][7]=20002;
        map[1][8]=20004;
        map[1][9]=20006;
        map[2][9]=map[3][9]=map[4][9]=22;
        map[3][5]=1;
        map[3][7]=1;
        map[3][8]=15;
        updateMap(hero,map);
        return flag;
    }
    if(mvalue==10001){
        flag=true;
        hero.meetNpc(mvalue);
		map[1][1]=30006;
		map[1][4]=1;
		updateMap(hero,map);
        return flag;
    }
    if(mvalue==10008){
        flag=true;
		hero.meetNpc(mvalue);
		map[1][3]=1;
		map[1][5]=30005;
		updateMap(hero,map);
        return flag;
	}
    if(hero.floor==17){
		if(containMonster(map)){
            if(isget1){
                flag=true;
                map[4][0]=map[5][0]=map[6][0]=20006;
                map[4][4]=300;
                updateMap(hero,map);
                const message=['亡灵:这层骷髅族都是挑战魔塔死去的亡灵，我们都不想再战斗，你缺还追杀都这，不可饶恕!!(点击任意键继续)'];
                openNpcinfo(message,0);
                isget1=false;
            }
		}
		if(containMonster1(map)){
            if(isget2){
                flag=true;
                map[6][9]=20008;
                updateMap(hero,map);
                isget2=false;
            }
		}
        return flag;
    }
    if(mvalue==5008){
        flag=true;
        hero.attackMonster(mvalue);
		let isAttack=hero.attackMonster(mvalue);
		if(isAttack){
			updateHeroinfo(hero);
		}else{
			return flag;
		}
		map[3][4]=map[3][5]=map[3][6]=map[4][4]=map[4][6]=map[5][4]=map[5][5]=map[5][6]=1;
		map[4][5]=17;
		updateMap(hero,map);
        return flag;
	}
    if(mvalue==17){
        flag=true;
		hero.floor=20;
        map=maps[hero.floor-1]
		updateMap(hero,map);
        updateHeroinfo(hero);
        return flag;
	}
    if(mvalue==330){
        flag=true;
        hero.attackMonster(mvalue);
		let isAttack=hero.attackMonster(mvalue);
		if(isAttack){
			updateHeroinfo(hero);
		}else{
			return flag;
		}
		map[1][9]=21;
        map[3][9]=15;
        map[4][9]=1;
		updateMap(hero,map);
        let message=['没想到能被你打伤，但是s计走为上策，你永远也别想打败我，哈哈哈！！！'];
        openNpcinfo(message,0);
        return flag;
    }
    if(mvalue==999){
        flag=true;
        map[7][5]=1;
        map[6][5]=15;
        let message=['魔王:哟,还真追上来了，我在前面准备了大量惊喜登着你(点击继续)'];
        openNpcinfo(message,0);
        return flag;
    }
    if(mvalue==998){
        flag=true;
        let message=['敬请期待(点击继续)'];
        openNpcinfo(message,0);
        return flag;
    }
    if(mvalue==8&&hero.floor==20){
        flag=true;
		hero.floor=1;
        map=maps[hero.floor-1]
		updateMap(hero,map);
        updateHeroinfo(hero);
    }
}
function containMonster(map){   //判断该层地图中还有没有20 40
	for(let i=0;i<map.length;i++){
		for(let j=0;j<map[i].length;j++){
			let mvalue=map[i][j];
			if(mvalue==40||mvalue==20){
                return false;
			}
		}
	}
	return true;
}
function containMonster1(map){   //判断第二层地图中还有没有对应怪物
	for(let i=0;i<map.length;i++){
		for(let j=0;j<map[i].length;j++){
			let mvalue=map[i][j];
			if(mvalue==250){
				return false;
			}
		}
	}
	return true;
}
export  default sufferEvent;