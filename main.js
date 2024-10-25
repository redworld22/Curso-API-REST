console.log('Hello World');

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=4&api_key=live_2ubfKsH68fwLGlJAgC9uj4T8nKvF7Q4WXZdxrNPUmEKhgrVOeSFxyQ4e6ETwnI32';

const btn = document.getElementById('change');
btn.addEventListener('click', changePhoto);

async function changePhoto(){
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const img3 = document.getElementById('img3')
    const img4 = document.getElementById('img4')
    img1.src = data[0].url
    img2.src = data[1].url
    img3.src = data[2].url
    img4.src = data[3].url
}

changePhoto()