import { updateText } from './ui.js';

const quotes = [
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
];

export function displayQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    updateText('#quote-text', `"${quote.text}"`);
    updateText('#quote-author', `— ${quote.author}`);
}