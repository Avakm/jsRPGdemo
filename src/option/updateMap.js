import updateBookinfo from './updateBookinfo';
//更新地图
function updateMap(hero,updatemap){
    const map=document.querySelector('.map')

	let temp="";
	for(var i=0;i<updatemap.length;i++){
		   for(var j=0;j<updatemap[i].length;j++){
                    let url=require(`../img/${updatemap[i][j]}.png`);
			    	temp+=`<img  src=${url} style='height:1rem;width:0.7rem; background: url(${require("../img/1.png")});'/>`;
                    if(updatemap[i][j]==15){
			    		hero.heroPoint.x=j;
			    		hero.heroPoint.y=i;
			    	}
		   }
	}
	map.innerHTML=temp;
	updateBookinfo(hero,updatemap);
}

export default updateMap;