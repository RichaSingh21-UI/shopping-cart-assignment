import {renderBanners, renderCategories, renderSideBarCategories, fetchProducts} from './home.js';

window.onload = (event) => {
    renderBanners();
    renderCategories();
    renderSideBarCategories();
    fetchProducts();
}
