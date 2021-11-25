let offset =0;
const sliderLine = document.querySelector('.slider-line');

document.querySelector('.slider-next').addEventListener('click', ()=>{
    offset+=256;
    if (offset>2048){
        offset=0;
    }
    sliderLine.style.left = -offset + 'px';
});

document.querySelector('.slider-prev').addEventListener('click', ()=>{
    offset-=256;
    if (offset<0){
        offset=2048;
    }
    sliderLine.style.left = -offset + 'px';
});