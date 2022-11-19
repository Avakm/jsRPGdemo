function initMap(hero,maps){
    const top=document.getElementsByClassName('top');
    const map=document.createElement('div');
	const positonDiv=document.createElement('div')

    map.classList.add('map');
	positonDiv.classList.add('positionDiv');
    map.style.width=7.7+'rem';
    map.style.height=11+'rem';
    top[0].append(map);
	top[0].append(positonDiv)

    let initmap=maps[hero.floor-1];

	let temp="";
	for(var i=0;i<initmap.length;i++){
		   for(var j=0;j<initmap[i].length;j++){
                    let url=require(`../img/${initmap[i][j]}.png`);
			    	temp+=`<img  class="mapimg" src=${url} style='height:1rem;width:0.7rem;'/>`;
			    	if(initmap[i][j]==15){
			    		hero.heroPoint.x=j;
			    		hero.heroPoint.y=i;
			    	}
		   }
	}
	map.innerHTML=temp;
}
export default initMap;