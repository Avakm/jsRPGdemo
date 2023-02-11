import * as move from './move';
import PF from 'pathfinding'
import {playFooter} from './optionBgm';
//英雄移动
function heroMove(hero,maps){
    //获取按钮
    const up=document.querySelector('.up');
    const right=document.querySelector('.right');
    const down=document.querySelector('.down');
    const left=document.querySelector('.left');

    //点击取域
    const positonDiv=document.querySelector('.positionDiv')

    let matrix;
    //点击移动
   positonDiv.addEventListener('click', debounce((e)=>{
        let {heroPoint,floor} = hero
		const toMap={
			x:null,
			y:null,
			obj:null
		}
		toMap.x=Math.ceil(11*((e.pageX-getOffsetLeft(positonDiv))/positonDiv.offsetWidth))-1  //x坐标
		toMap.y=Math.ceil(11*((e.pageY-getOffsetTop(positonDiv))/positonDiv.offsetHeight))-1 //y坐标
		toMap.obj=maps[floor-1][toMap.y][toMap.x]


        //生成含障碍点的距阵
        matrix=creatmatrix(hero,maps)
        for(let i=0;i<matrix.length;i++){
            for(let j=0;j<matrix[i].length;j++){
                if(matrix[i][j]===5&&hero.special.cobwall===false){
                        matrix[i][j]=1
                }
                else if(matrix[i][j]===3||matrix[i][j]===5001|matrix[i][j]===5002||matrix[i][j]===5003||matrix[i][j]===5004||matrix[i][j]===5005||matrix[i][j]===5006||matrix[i][j]===5007||matrix[i][j]===5009){
                        matrix[i][j]=1
                }
                else{
                    matrix[i][j]=0
                }
            }
        }
        // PF.Grid.prototype.setWalkableAt = function(x, y, walkable=true) {
        //     this.nodes[y][x].walkable = walkable;
        // };
        const grid=new PF.Grid(matrix)
        //生成最短路径
        const finder=new PF.AStarFinder();
        const path=finder.findPath(heroPoint.x,heroPoint.y,toMap.x,toMap.y,grid)
        setTimeout(() => {
            autoMove(hero,maps,path)
        },20);  
	}),1000)
    //上移
    up.addEventListener('click',()=>{
        playFooter();
        move.toUp(hero,maps);
    })
    //右移
    right.addEventListener('click',()=>{
        playFooter();
        move.toRight(hero,maps);
    })
    //左移
    down.addEventListener('click',()=>{
        playFooter();
        move.toDown(hero,maps);
    })
    //右移
    left.addEventListener('click',()=>{
        playFooter();
        move.toLeft(hero,maps);
    })
}
const autoMove =(hero,maps,path,i=1)=>{
    return new Promise((resolve,reject)=>{
        const result={};
        const pathItem=path[i]
        result.x=pathItem[0]-hero.heroPoint.x;
        result.y=pathItem[1]-hero.heroPoint.y;
        if(result.x===0){
            result.y>0?move.toDown(hero,maps):move.toUp(hero,maps)
            resolve('成功')
        }
        if(result.y===0){
            result.x>0?move.toRight(hero,maps):move.toLeft(hero,maps)
            resolve('成功')
        }else{
            reject('失败')
        }
    }).then((resolve)=>{
        if(i===path.length){
            return;
        }
        if(resolve==='成功'){
            setTimeout(()=>autoMove(hero,maps,path,i+1),50)
        }
    },(reject)=>{
        return
    })
}
const getOffsetLeft = (obj)=>{
    let tmp = obj.offsetLeft;
	let val = obj.offsetParent;
	while(val != null){
	tmp += val.offsetLeft;
	  val = val.offsetParent;
	 }
  return tmp;
}
const getOffsetTop = (obj)=>{
	let tmp = obj.offsetTop;
	let val = obj.offsetParent;
	while(val != null){
	tmp += val.offsetTop;
	  val = val.offsetParent;
	 }
  return tmp;
}
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
      const self = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(self, args);
      }, delay);
    };
  }
   const deepClone=(obj)=>{
    const out = [],len = obj.length;
    for (let i=0 ; i < len; i++) {
        if (obj[i] instanceof Array){
            out[i] = deepClone(obj[i]);
        }
        else out[i] = obj[i];
    }
    return out;
}
const creatmatrix=(hero,maps)=>{
        return  deepClone(maps[hero.floor-1])
}
export default heroMove;