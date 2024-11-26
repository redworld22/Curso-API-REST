const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers: {
        'x-api-key': 'live_HsgO6mxBP8dF2egkpE1Dkx2IhR4DJqInlWQGJeQtT5IVPbPZE5S1cjEMWHnGNJ9f'
    }
})

const API_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=';
const API_FAVORITES = 'https://api.thedogapi.com/v1/favourites';
const API_FAVORITES_DELETE = (id)=> `https://api.thedogapi.com/v1/favourites/${id}`;
const API_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'


const img1 = document.querySelector('#imageRandom')
const img2 = document.querySelector('#imageRandom2')
const btn1 = document.querySelector('#saveDog1')
const btn2 = document.querySelector('#saveDog2')

const spanError = document.querySelector('#error')
const btnRefrescar = document.querySelector('btn')


async function loadRandomDogs(){
    const res = await fetch(API_RANDOM, {
        method: 'GET',
        headers: {
            'x-api-key': 'live_HsgO6mxBP8dF2egkpE1Dkx2IhR4DJqInlWQGJeQtT5IVPbPZE5S1cjEMWHnGNJ9f'
        }
    })
    const data = await res.json()
    console.log('Random');
    console.log(res);
    console.log(data);

    if(res.status !== 200){
        spanError.innerText = 'Ha ocurrido un error ' + res.status + data.message
    } else{
        img1.src = data[0].url
        img2.src = data[1].url
        btn1.onclick = ()=> saveFavoriteDog(data[0].id)
        btn2.onclick = ()=> saveFavoriteDog(data[1].id)
    }    
}

async function loadFavoritesDogs(){
    const res = await fetch(API_FAVORITES, {
        method: 'GET',
        headers: {
            'x-api-key': 'live_HsgO6mxBP8dF2egkpE1Dkx2IhR4DJqInlWQGJeQtT5IVPbPZE5S1cjEMWHnGNJ9f'
        }
    })
    const data = await res.json()
    console.log('Favoritos');
    console.log(res);
    console.log(data);

    if(res.status !== 200){
        spanError.innerHTML = 'Ha ocurrido un error ' + res.status + data.message
    } else{
        const section = document.getElementById('favoritesDogs');
        section.innerHTML = ""
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Firulais Favoritos');

        h2.appendChild(h2Text);
        section.appendChild(h2)
        data.forEach(dog => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button')
            const btnText = document.createTextNode('Eliminar a Firulais de Favoritos')

            img.src = dog.image.url
            img.width = 200
            btn.appendChild(btnText)
            btn.onclick = ()=> deleteFavoriteDog(dog.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
        });
    }

}

async function saveFavoriteDog(id){
    const res = await api.post('/favourites', {
        image_id: id
    })

    // const res = await fetch(API_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': 'live_HsgO6mxBP8dF2egkpE1Dkx2IhR4DJqInlWQGJeQtT5IVPbPZE5S1cjEMWHnGNJ9f'
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     })
    // })
    // const data = await res.json()
    console.log('Save');
    console.log(res);
    // console.log(data);

    if(res.status !== 200){
        spanError.innerHTML = 'Ha ocurrido un error ' + res.statusgit 
    } else {
        console.log('El Firulais fue agregado a Favoritos');
        loadFavoritesDogs()
    }

}

async function deleteFavoriteDog(id){
    const res = await fetch(API_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'x-api-key': 'live_HsgO6mxBP8dF2egkpE1Dkx2IhR4DJqInlWQGJeQtT5IVPbPZE5S1cjEMWHnGNJ9f'
        }
        });
    const data = await res.json();
    console.log('Save');
    console.log(res);
    console.log(data);

    if(res.status !== 200){
        spanError.innerHTML = 'Ha ocurrido un error ' + res.status + data.message
    } else {
        console.log('El Firulais fue eliminado de Favoritos');
        loadFavoritesDogs();
    }
}

async function uploadDogPhoto(){
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form)
    console.log(formData.get('file'));
    
    const res = await fetch(API_UPLOAD, {
        method: 'POST',
        headers: {
            'x-api-key': 'live_HsgO6mxBP8dF2egkpE1Dkx2IhR4DJqInlWQGJeQtT5IVPbPZE5S1cjEMWHnGNJ9f'
        },
        body: formData
    })
    const data = await res.json();
    console.log(data);
    
    if(res.status !== 201){
        spanError.innerHTML = "Ha ocurrido un error " + res.status + data.message
    } else{
        console.log('Se ha enviado la imagen con éxito');
        console.log(data.url);
        saveFavoriteDog(data.id)
    }
}

loadRandomDogs()
loadFavoritesDogs()
