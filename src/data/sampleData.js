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
    CURRENCY,
    CITIES,
    WEBSITES,
    getRandomFirstName,
    getRandomItem,
    getRandomCurrency,
    getRandomCanadianCity,
    getRandomPopularWebsite
};