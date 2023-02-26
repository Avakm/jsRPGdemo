import monsterList from './monster.js';
import goodsList from './goods.js';
import equipmentList from './equipment.js';
import openAlert from '../operate/alert.js';
import openNpcinfo from '../operate/openNpcinfo.js';
import {addHeroinfo as updateHeroinfo}from '../init/addContent.js';
import {playGather,playOpendoor,playAttack,playDestory} from '../operate/optionBgm.js';
import npcList from './npc.js';


export default class Hero{
    constructor(){
        this.name='',  //名字
        this.blood=1000, //血量
        this.ATN=20,    //攻击力
        this.DEF=0,    //防御力
        this.shopindex=1;
        this.gold=0,   //金币
        this.equipList=[],   //装备列表
        this.floor=1,  //所处楼层
        this.heroPoint={},//英雄所处位置
        this.keyList={
            yellowKey:0,
            blueKey:0,
            redKey:0,
            greenKey:0
        },
        //特殊能力
        this.special={
            water:false,
            fire:false,
            cobwall:false,
            stonewall:false,
            immune:false
        }
    }
     //攻击怪物
    attackMonster(mvalue){
        playAttack();
        let message;
        let isTrue=false;
        monsterList.map((item)=>{
            if(item.id==mvalue){
                if(this.ATN>=item.DEF){
                    isTrue=true;
                    if(item.ATN<this.DEF){
                        this.blood=this.blood;
                        message=`生命值减少了0,金币+${item.gold}`;
                    }else{
                        if(this.blood-(item.ATN-this.DEF)>0){
                            this.blood-=(item.ATN-this.DEF);
                            message= `生命值减少了${item.ATN-this.DEF},金币+${item.gold}`;
                        }else{
                            message= `生命值过低，无法挑战`;
                            isTrue=false;
                        }
                    }
                    this.gold+=item.gold;
                }else{
                    message='攻击力不足';
                }
            }
        })
        openAlert(message);
        return isTrue;
    }
    //获得物品
    getGoods(mvalue){
        playGather();
        goodsList.map(item=>{
            if(item.id==mvalue){
                if(item.type==='blood'){
                    this.blood+=item.data;
                }
                else if(item.type==='ATN'){
                    this.ATN+=item.data
                }
                else if(item.type==='DEF'){
                    this.DEF+=item.data
                }
                else{
                    if(item.id==20002){
                        this.keyList.yellowKey+=item.data;
                    }
                    else if(item.id==20004){
                        this.keyList.blueKey+=item.data;
                    }else if(item.id==20006){
                        this.keyList.redKey+=item.data;
                    }
                    else{
                        this.keyList.greenKey+=item.data;
                    }
                }
                openAlert(item.message);
            }
        })
    }
    //开门
    openDoor(mvalue){
        playOpendoor();
        let message=null;
        let isOpen=false;
        if(mvalue==20001){
            if(this.keyList.yellowKey==0){
                message='黄钥匙数量不足';
            }else{
            this.keyList.yellowKey-=1;
            isOpen=true;
            }
        }
        else if(mvalue==20003){
            if(this.keyList.blueKey==0){
                message='蓝钥匙数量不足';
            }else{
            this.keyList.blueKey-=1;
            isOpen=true;
            }
        }
        else if(mvalue==20005){
            if(this.keyList.redKey==0){
                message='红钥匙数量不足';
            }else{
            this.keyList.redKey-=1;
            isOpen=true;
            }
        }
        else{
            if(this.keyList.greenKey==0){
                message='绿钥匙数量不足';
            }else{
            this.keyList.greenKey-=1;
            isOpen=true;
            }
        }
        openAlert(message);
        return isOpen;
    }
    //遇到NPC
    meetNpc(mvalue){
        npcList.map(item=>{
            //判断npc的id
            if(item.id==mvalue){
                //在多个楼层都有的npc
                if(item.id==10002){
                    item.messageList.map(item=>{
                        //判断所在楼层
                        if(item.floor==this.floor){
                            let index=0;
                            openNpcinfo(item.message,index);
                        }
                    })
                }else{
                    let index=0;
                    openNpcinfo(item.message,index);
                }
            }
        })
    }
    //遇到装备
    getEquipment(mvalue){
        equipmentList.map((item)=>{
            if(mvalue==item.id){
                if(item.type==='ATN'){
                    this.ATN+=item.data
                }
                else if(item.type==='DEF'){
                    this.DEF+=item.data
                }else if(item.type==='special'){
                    if(item.id==30005){
                        this.special.water=true;
                    }
                    if(item.id==30007){
                        this.special.fire=true;
                    }
                    else if(item.id==30010){
                        this.special.immune=true;
                    }
                    else if(item.id==30011){
                        this.special.cobwall=true;
                    }
                    else if(item==30012){
                        this.special.stonewall=true
                    }
                }
                this.equipList.push(item.id);
                openAlert(item.message);
            }
        })
    }
    //遇到墙
    meetWall(mvalue){
        let destroy;//true代表不能通过
        if(mvalue==0){
			if(this.special.water==false){
				destroy=true;
			}else{
                destroy=false;
            }
		}
		else if(mvalue==2){
			if(this.special.fire==false){
				destroy=false;
			}else{
                destroy=true;
            }
		}
		else if(mvalue==3){
			if(this.special.stonewall==false){
				destroy=true;
			}else{
                destroy=false;
                playDestory();
            }
		}else if(mvalue==5){
			if(this.special.cobwall==false){
				destroy=true;
			}else{
                destroy=false;
                playDestory();
            }
		}
        return destroy;
    }
    //遇到商店
    openShop(){
        const shopinfo=document.querySelector('.shopInfo');
        shopinfo.innerHTML='';
        shopinfo.innerHTML=`<div>你好,你想得到什么(需要${this.shopindex*100}金币,花费的金币会随购买次数増加)</div>`;
        shopinfo.innerHTML+='<div style="width:100%;"><button class="shopitem" style="width:100%;margin-top:20px;">生命值+400</button></div>';
        shopinfo.innerHTML+='<div style="width:100%;"><button class="shopitem" style="width:100%;margin-top:20px;">攻击力+20</button></div>';
        shopinfo.innerHTML+='<div style="width:100%;"><button class="shopitem" style="width:100%;margin-top:20px;">防御力+10</button></div>';
        shopinfo.innerHTML+='<div style="width:100%;"><button class="shopitem" style="width:100%;margin-top:20px;">蓝钥匙+1</button></div>';
        shopinfo.innerHTML+='<div style="width:100%;"><button class="shopitem" style="width:100%;margin-top:20px;">退出购买！</button></div>';
        shopinfo.style.display='flex';
        const shopItem=document.querySelectorAll('.shopitem');
        shopItem[0].onclick=()=>{
            if(this.gold<this.shopindex*100){
                shopinfo.style.display='none';
                openAlert('金币不足')
            }else{ 
                this.blood+=400;
                this.gold-=this.shopindex*100;
                this.shopindex+=1;
                updateHeroinfo(this);
            }
        }
        shopItem[1].onclick=()=>{
            if(this.gold<this.shopindex*100){
                shopinfo.style.display='none';
                openAlert('金币不足')
            }else{
                this.ATN+=20;
                this.gold-=this.shopindex*100;
                this.shopindex+=1;
                updateHeroinfo(this);
                shopinfo.style.display='none';
            }
        }
        shopItem[2].onclick=()=>{
            if(this.gold<this.shopindex*100){
                shopinfo.style.display='none';
                openAlert('金币不足')
            }else{
                this.DEF+=10;
                this.gold-=this.shopindex*100;
                this.shopindex+=1;
                updateHeroinfo(this);
                shopinfo.style.display='none';
            }
        }
        shopItem[3].onclick=()=>{
            if(this.gold<this.shopindex*100){
                shopinfo.style.display='none';
                openAlert('金币不足')
            }else{
                this.keyList.blueKey+=1;
                this.gold-=this.shopindex*100;
                this.shopindex+=1;
                updateHeroinfo(this);
                shopinfo.style.display='none';
            }
        }
        shopItem[4].onclick=()=>{
            shopinfo.style.display='none';
        }
    }

}