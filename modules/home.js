const createElement = elem => document.createElement(elem);
let categoryId;


// Get data for the carousel Banners
async function fetchBanner()
{ 
    try {
        const response = await fetch('http://localhost:5000/banners');
        const result = await response.json();
        return result; 
    } catch (error) {
        console.log(error);
    }

}

// Get data for card in home page were need to show categories
async function fetchCategories()
{ 
    try {
        const response = await fetch('http://localhost:5000/categories');
        const result = await response.json();
        return result; 
    } catch (error) {
        console.log(error);
    }

}

// To show items of carousel
export async function renderBanners() {
    // Pagination part for carousel --> odered List
    let carouselContainerList = document.getElementById('carouselContainerList');
    const banners = carouselContainerList !== null || undefined ? await fetchBanner() : [];

    banners.map((item, index) => {
        // Pagination part for carousel --> list item
        let listItem = createElement('li');
        listItem.dataset.bsTarget = "#carouselExampleIndicators";
        listItem.dataset.bsSlideTo = index;
        listItem.setAttribute('class', index === 0 ? "active": '');
        carouselContainerList.appendChild(listItem);
        
        // carousel Image part main div

        let carouselInner = document.getElementById('carouselInner');

        // carousel Image part with having items
        let carouselItem = createElement('div');
        carouselItem.setAttribute('class', index === 0 ? "carousel-item active": 'carousel-item');
        // carouselItem.classList.add("carousel-item");

        // creating image tag
        let imageTag = createElement('img');
        imageTag.classList.add("d-block");
        imageTag.classList.add("w-100");
        imageTag.setAttribute('src', item.bannerImageUrl);
        imageTag.setAttribute('alt', item.bannerImageAlt);
        carouselItem.append(imageTag);
        carouselInner.append(carouselItem);
    });
}

// To show cards on Home page with categories
export async function renderCategories() {
    let cardContainer = document.getElementById('cardContainer');
    const categories = cardContainer !== null && await fetchCategories();
    cardContainer !== null && categories.map((item, index) => {
        //Main Div 
        let mainDiv = createElement('div');
        mainDiv.setAttribute('class', 'card mb-3 categorieCard' );
        cardContainer.append(mainDiv);

        let fistInnerDiv = createElement('div');
        fistInnerDiv.setAttribute('class', 'row g-0 categoryItem' );

        // adding the main image inner div to main div
        mainDiv.appendChild(fistInnerDiv);

        // the div for image 
        let imageDiv = createElement('div');
        imageDiv.classList.add('col-md-4');

        // creating image tag
        let imageTag = createElement('img');
        imageTag.setAttribute('class', 'img-fluid rounded-start' );
        imageTag.setAttribute('src', item.imageUrl);
        imageTag.setAttribute('alt', item.key)

        // appending the image tag to the div
        imageDiv.append(imageTag);

        // adding image div with first inner div
        fistInnerDiv.append(imageDiv);

        // second inner div to add text 
        let secondInnerDiv = createElement('div');
        secondInnerDiv.classList.add('col-md-8');

        // adding the main text inner div to main div
        mainDiv.appendChild(secondInnerDiv);

        //making div for card-body
        let textCardBody = createElement('div');
        textCardBody.classList.add('card-body');

        // categorie Name  
        let categoriesName = createElement('h5');
        categoriesName.classList.add('card-title');
        categoriesName.textContent = item.name;

        textCardBody.append(categoriesName);

        // categorie Description
        let categoriesDesc = createElement('p');
        categoriesDesc.classList.add('card-text');
        categoriesDesc.textContent = item.description;

        textCardBody.append(categoriesDesc);

        // categorie button
        let categorieButton = createElement('button');
        categorieButton.classList.add('categorieButton');
        categorieButton.textContent = `Explore ${item.name}`;
        textCardBody.append(categorieButton);

        // connecting card body with second div
        secondInnerDiv.append(textCardBody);
        fistInnerDiv.append(secondInnerDiv);
    });

}

// Get data for cards in Product page
export async function fetchProducts()
{ 
    try {
        const response = await fetch('http://localhost:5000/products');
        const result = await response.json();
        renderProducts(result);
        return result; 
    } catch (error) {
        console.log(error);
    }

}

// To show sideBar page with categories on product page
export async function renderSideBarCategories() {
    // sideBar Ul list
    let sideBarUList = document.getElementById('sideBarUList');  
    const categories = sideBarUList !== null && await fetchCategories();

    
    sideBarUList !== null && categories.map((items, index) => {
        // list Items for sideBar
        let listItem = createElement('li');
        // content for sideBar
        let sideBarContent = createElement('span');
        // sideBarContent.classList.add("item");
        sideBarContent.textContent = items.name;
        sideBarContent.className = items.id === categoryId ? 'item active' : 'item';

        sideBarContent.addEventListener('click', () => {
            if (sideBarContent.classList.contains('active')) {
                sideBarContent.classList.remove('active');
                categoryId = '';
                updateProductList(null);

            } else {
                updateProductList(items);
                sideBarContent.classList.add('active');
            }
            while (sideBarUList.firstChild) {
                sideBarUList.removeChild(sideBarUList.firstChild);
            }
            renderSideBarCategories();
        });
        listItem.append(sideBarContent);

        sideBarUList.append(listItem);        
    });

}

async function updateProductList(category) {
    const productsData = await fetchProducts();
    if (category !== null) {
        let categoryProducts = productsData.filter(product => product.category === category.id);
        categoryId = category.id;
        renderProducts(categoryProducts);
    } else {
        renderProducts(productsData);
    }

}

// To show card with data in Product page
export async function renderProducts(products) {
    let productContainer = document.getElementsByClassName('productContainer');
    const productsData = productContainer !== null || undefined ? products : [];

    while (productContainer[0] && productContainer[0].firstChild) {
        productContainer[0].removeChild(productContainer[0].firstChild);
    }

     productsData.map((item, index) => {
        // Main div for card
        let productCard = createElement('div');
        productCard.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-xl-3 p-3');

        let innerDiv = createElement('div');
        innerDiv.setAttribute('class', 'card proContainer');
        productCard.append(innerDiv);

        // the main text for card
        let headingText = createElement('h5');
        headingText.classList.add('card-title');
        headingText.textContent = item.name;
        innerDiv.append(headingText);
        
        // creating image tag
        let imageTag = createElement('img');
        imageTag.classList.add("card-img-top");
        imageTag.setAttribute('src', item.imageURL);
        imageTag.setAttribute('alt', item.name);
        innerDiv.append(imageTag);
        
        //card body
        let cardBody = createElement('div');
        cardBody.classList.add('card-body');
        cardBody.setAttribute('class', 'card-body despCard');
        
        // card description
        let cardDesc = createElement('p');
        cardDesc.classList.add('card-text');
        cardDesc.textContent = item.description;
        
        cardBody.append(cardDesc);
        innerDiv.append(cardBody);
        
        //card body
        let cardFooter = createElement('div');
        cardFooter.classList.add('card-footer');
        
        // price of item
        let price = createElement('span');
        price.classList.add('price');
        price.textContent = `MRP Rs${item.price}`;
        cardFooter.append(price);
        
        //Buy now button
        let button = createElement('a');
        button.setAttribute('href', '#');
        button.setAttribute('class', 'btn btnStyle');
        button.textContent = `Buy Now`;
        cardFooter.append(button);
        innerDiv.append(cardFooter);

        productContainer[0] !== undefined && productContainer[0].appendChild(productCard);
    });
}