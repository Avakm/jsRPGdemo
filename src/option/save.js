import {addStoreList as updateStoreList} from '../init/addContent';

function save(hero,map){
    let now=new Date();
    now=now.toLocaleString();
    const storeList=JSON.parse(localStorage.getItem('storeList'));
    const storeItem={ 
        info:{
            floor:hero.floor,
            date:now
        },
        data:{
            hero,
            map
        }
    }
    if(storeList!==null){
        storeList.unshift(storeItem);
        localStorage.setItem('storeList',JSON.stringify(storeList));
    }else{
        let storeList=[];
        storeList.push(storeItem);
        localStorage.setItem('storeList',JSON.stringify(storeList));
    }
    updateStoreList();
}
export default save;