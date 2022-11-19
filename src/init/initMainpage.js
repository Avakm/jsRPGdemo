//创建游戏页面
function initMainpage(){
    const app=document.querySelector('#app');
    const div=document.createElement('div');
    div.style.display='none'
    div.classList.add('game');
    app.append(div);
}

export default initMainpage;