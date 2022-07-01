const url = "http://localhost:5000/banners";
console.log('run=-=-=-');

export async function getBanners()
{ 
    try {
        console.log(url);
        const response = await fetch('http://localhost:5000/banners');
        const result = await response.json();
        console.log(result);    
        let image = document.getElementsByClassName('row'); 
        console.log(image);
        for (let i = 0; i< result.length; i++) {
            let div =document.createElement('div');
            div.className = "col-md-2 col-sm-6 col-12";
            let imageTag = document.createElement('img');
            imageTag.setAttribute('src', result[i].bannerImageUrl);
            div.appendChild(imageTag); 
            //let carouselImage =`<div class="col-md-2 col-sm-6 col-12"><a href="#"><img src=${result[i].bannerImageUrl} alt="" /></a></div >`; 
            image[0].appendChild(div);
        } 
    } catch (e) {
        console.log(e);
    }

}
