//npc对话

function openNpcinfo(value,index){
    const npc=document.querySelector('.npc');
        new Promise((resolve)=>{
            npc.style.display='block';
            npc.innerHTML=value[index];
            resolve();
        }).then(()=>{
            npc.onclick=()=>{
                npc.style.display='none';
                if(index==value.length-1){
                    return;
                 }else{
                    index+=1;
                    openNpcinfo(value,index);
                }
            }
        })
}

export default openNpcinfo;