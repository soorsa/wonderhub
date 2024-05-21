function comiclist() {
    let url = 'http://127.0.0.1:8000/nimic/api/'
    fetch(url)
        .then((response) => response.json())
        .then(function(data) {
            console.log('Data:', data)
            let list = data
            let bdy = document.getElementById('body')
            bdy.innerHTML = ""

            for (let i = 0; i < list.length; i++) {
                item = ` 
                <div class="card">
                <img src="http://127.0.0.1:8000/static/${list[i].image}" alt="">
                <div class="card-detail">
                    <h1 class="card-title">${list[i].title}</h1>
                    <p>Edited by <strong>${list[i].author}</strong> </p>
                    <p>categories: <i>${list[i].category} </i></p>
                    <p>${list[i].description} </p>
                    <button class="like-btn" onclick="comicEpisodes(this.dataset)" data-id="${list[i].comic_id}">like</button>
                </div>
                </div>
                `

                bdy.innerHTML += item

            }

        })

}
categoryList()
comicByCat()


function categoryList() {
    let url = 'http://127.0.0.1:8000/nimic/api/category/'
    fetch(url)
        .then((response) => response.json())
        .then(function(data) {
            console.log('Data:', data)
            let list = data
            let cat = document.getElementById('category-container')
            cat.innerHTML = ""

            for (let i = 0; i < list.length; i++) {
                item = `         
                    <a data-id="${list[i].title}" onclick=" comicByCat(this.dataset) " id="${list[i].title}" class="cat"> ${list[i].title}</a>
    
                `

                cat.innerHTML += item

            }

        })

}

function comicByCat(data) {
    if (data == undefined) {
        let url = 'http://127.0.0.1:8000/nimic/api/'
        fetch(url)
            .then((response) => response.json())
            .then(function(data) {
                console.log('Data:', data)
                let list = data
                let bdy = document.getElementById('body')
                bdy.innerHTML = ""

                for (let i = 0; i < list.length; i++) {
                    item = ` 
                    <div class="card">
                    <img src="http://127.0.0.1:8000/static/${list[i].image}" alt="">
                    <div class="card-detail">
                        <h3 class="card-title">
                        <a href='http://127.0.0.1:8000/nimic/episodes/${list[i].comic_id}'>${list[i].title}</a>
                        </h3>
                        <p>Edited by <strong>${list[i].author}</strong> </p>
                        <p>categories: <span>${list[i].category} </span></p>
                        <article>${list[i].description} </article>
                    </div>
                    </div>
                    `

                    bdy.innerHTML += item

                }

            })
    } else {
        let catId = data.id
        let selectedCat = document.getElementById(data.id)
        let allCatPill = document.querySelectorAll(".cat")
        let url = `http://127.0.0.1:8000/nimic/api/filter/category/${catId}/  `
            // window.open("http://127.0.0.1:8000/nimic/episodes/", "_self")

        fetch(url)
            .then((response) => response.json())
            .then(function(data) {
                console.log('Data:', data)
                let list = data
                let bdy = document.getElementById('body')
                bdy.innerHTML = ""
                allCatPill.forEach((element) => {
                    element.classList.remove('active');
                });

                selectedCat.classList.add('active');

                for (let i = 0; i < list.length; i++) {
                    item = ` 
                    <div class="card">
                    <img src="http://127.0.0.1:8000/static/${list[i].image}" alt="">
                    <div class="card-detail">
                        <h3 class="card-title">
                        <a href='http://127.0.0.1:8000/nimic/episodes/${list[i].comic_id}'>${list[i].title}</a>
                        </h3>
                        <p>Edited by <strong>${list[i].author}</strong> </p>
                        <p>categories: <span>${list[i].category} </span></p>
                        <article>${list[i].description} </article>
                    </div>
                    </div>
    
                    `

                    bdy.innerHTML += item

                }

            })


    }

}