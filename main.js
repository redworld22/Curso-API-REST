const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4&api_key=live_2ubfKsH68fwLGlJAgC9uj4T8nKvF7Q4WXZdxrNPUmEKhgrVOeSFxyQ4e6ETwnI32';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_2ubfKsH68fwLGlJAgC9uj4T8nKvF7Q4WXZdxrNPUmEKhgrVOeSFxyQ4e6ETwnI32';

const btn = document.getElementById('change');
btn.addEventListener('click', loadRandomMichis);

const spanError = document.querySelector('#error');

async function loadRandomMichis(){
    const res = await fetch(API_URL_RANDOM);

    if(res.status !== 200){
        spanError.innerHTML = "Ha ocurrido un error " + data.message
    } else{
        const data = await res.json();
        console.log('Random');
        console.log(data);
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const img3 = document.getElementById('img3')
        const img4 = document.getElementById('img4')
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn3')
        const btn4 = document.getElementById('btn4')
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
        img4.src = data[3].url
        btn1.onclick = ()=> saveFavoritesMichis(data[0].id)
        btn2.onclick = ()=> saveFavoritesMichis(data[1].id)
        btn3.onclick = ()=> saveFavoritesMichis(data[2].id)
        btn4.onclick = ()=> saveFavoritesMichis(data[3].id)
    }
    
}

async function loadFavoritesMichis(){
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favorites');
    console.log(data);
    
    if(res.status !== 200){
        spanError.innerHTML = "Ha ocurrido un error " + data.message
    } else{
        data.forEach(Michi => {
        const section = document.getElementById('favoritesMichis');
        const article = document.createElement('article');
        const img = document.createElement('img');
        const button = document.createElement('button');
        const btnText = document.createTextNode('Sacar al Michi de favoritos');

        img.src = Michi.image.url;
        img.width = 200;
        button.appendChild(btnText);
        article.appendChild(button);
        article.appendChild(img);
        section.appendChild(article);
        });
        
    }
}

async function saveFavoritesMichis(id){
    const res = await fetch(API_URL_FAVORITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await res.text();
    console.log('Save');
    console.log(data);
    console.log(res);
    
    if(res.status !== 200){
        spanError.innerHTML = "Ha ocurrido un error " + res.status + data.message
    }
}

loadRandomMichis();
loadFavoritesMichis();