//提示信息.
function openAlert(value){
    const alert=document.querySelector('.alert');
    alert.innerHTML=value;
    alert.style.display='block';
    setTimeout(() => {
        alert.style.display='none';
    }, 500);
}

export default openAlert;
