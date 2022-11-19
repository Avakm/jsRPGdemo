import {addStoreList} from './addContent';

//创建存储页面
function initStore(){
    const app=document.querySelector('#app');
    const sotrePage=document.createElement('div');
    sotrePage.classList.add('storePage');
    sotrePage.style.display='none';
    app.append(sotrePage);
    addStoreList();
}

export default initStore;