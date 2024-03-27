import i18n from '../../internationalization/i18n.config.js';

// Partily AI Generated Code, I used chatgpt to generate arrays of names, websites, cities and nouns to use
// with my generateSampleData code. I didn't want to spend an hour thinking up all these.

// The Randomizer is something I put toghether, it will allow it to generate consisted but varied data
// to be used across the application.

// If you started the project with spanish support, it will select the Spanish list of Items (Because the ai generated data looks funny)


export const FIRSTNAMES = [
    'John', 'Emma', 'Michael', 'Sophia', 'William',
    'Olivia', 'James', 'Ava', 'Alexander', 'Isabella',
    'Ethan', 'Mia', 'Daniel', 'Charlotte', 'Matthew',
    'Amelia', 'Benjamin', 'Harper', 'David', 'Evelyn',
    'Liam', 'Abigail', 'Lucas', 'Emily', 'Jackson',
    'Madison', 'Jackson', 'Elizabeth', 'Aiden', 'Sofia',
    'Mason', 'Grace', 'Logan', 'Chloe', 'Oliver',
    'Ella', 'Elijah', 'Avery', 'Carter', 'Scarlett'
];


export const ITEMS = [
    'T-shirts', 'Jeans', 'Sneakers', 'Watches', 'Handbags',
    'Sunglasses', 'Jackets', 'Dresses', 'Hats', 'Belts',
    'Perfumes', 'Scarves', 'Wallets', 'Boots', 'Jewelry',
    'Suits', 'Sandals', 'Backpacks', 'Gloves', 'Umbrellas',
    'Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras',
    'Speakers', 'Gaming Consoles', 'Smartwatches', 'Printers', 'Routers',
    'External Hard Drives', 'Monitors', 'Microphones', 'Projectors', 'Keyboards',
    'Mouse', 'USB Flash Drives', 'Chargers', 'Power Banks', 'Networking Cables'
];

export const ITEMS_ES = [
    'Camisetas', 'Jeans', 'Zapatillas deportivas', 'Relojes', 'Bolsos de mano',
    'Gafas de sol', 'Chaquetas', 'Vestidos', 'Sombreros', 'Cinturones',
    'Perfumes', 'Bufandas', 'Carteras', 'Botas', 'Joyas',
    'Trajes', 'Sandalias', 'Mochilas', 'Guantes', 'Paraguas',
    'Teléfonos inteligentes', 'Laptops', 'Tabletas', 'Audífonos', 'Cámaras',
    'Altavoces', 'Consolas de juegos', 'Smartwatches', 'Impresoras', 'Enrutadores',
    'Discos duros externos', 'Monitores', 'Micrófonos', 'Proyectores', 'Teclados',
    'Mouse', 'Unidades flash USB', 'Cargadores', 'Bancos de energía', 'Cables de red'
];

export const CURRENCY = [
    'USD', 'EUR', 'JPY', 'GBP', 'AUD',
    'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
    'KRW', 'SGD', 'NOK', 'MXN', 'INR',
    'RUB', 'ZAR', 'HKD', 'BRL', 'TRY'
];

export const CITIES = [
    'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton',
    'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'London',
    'Kitchener', 'Victoria', 'Halifax', 'Oshawa', 'Windsor',
    'Saskatoon', 'Regina', 'Terrace', 'Barrie', 'Kelowna'
];

export const WEBSITES = [
    'google.com', 'youtube.com', 'facebook.com', 'baidu.com', 'wikipedia.org',
    'yahoo.com', 'reddit.com', 'amazon.com', 'twitter.com', 'instagram.com',
    'linkedin.com', 'netflix.com', 'ebay.com', 'microsoft.com', 'wordpress.org',
    'pinterest.com', 'apple.com', 'tumblr.com', 'bbc.co.uk', 'stackoverflow.com'
];

export function getRandomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to get a random first name
export function getRandomFirstName() {
    return getRandomItemFromArray(FIRSTNAMES);
}

// Function to get a random item
export function getRandomItem() {
    if(i18n.getLocale() === 'es') {
        return getRandomItemFromArray(ITEMS_ES);
    }
    return getRandomItemFromArray(ITEMS);
}

// Function to get a random currency
export function getRandomCurrency() {
    return getRandomItemFromArray(CURRENCY);
}

// Function to get a random Canadian city
export function getRandomCanadianCity() {
    return getRandomItemFromArray(CITIES);
}

// Function to get a random popular website
export function getRandomPopularWebsite() {
    return getRandomItemFromArray(WEBSITES);
}

export default {
    FIRSTNAMES,
    ITEMS,
    ITEMS_ES,
    CURRENCY,
    CITIES,
    WEBSITES,
    getRandomFirstName,
    getRandomItem,
    getRandomCurrency,
    getRandomCanadianCity,
    getRandomPopularWebsite
};