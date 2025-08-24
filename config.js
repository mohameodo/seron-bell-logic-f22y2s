export const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=33.42&longitude=-111.82&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph";

export const SCHEDULES = {
    A_DAY: [
        { name: 'A Hour', start: '07:15', end: '08:00' },
        { name: '1st Hour', start: '08:15', end: '09:47' },
        { name: '3rd Hour', start: '09:53', end: '11:27' },
        { name: 'Lunch', start: '11:27', end: '11:59' },
        { name: '5th Hour', start: '12:05', end: '13:37' },
        { name: '7th Hour', start: '13:43', end: '15:15' }
    ],
    B_DAY: [
        { name: 'A Hour', start: '07:15', end: '08:00' },
        { name: '2nd Hour', start: '08:15', end: '09:47' },
        { name: '4th Hour', start: '09:53', end: '11:27' },
        { name: 'Lunch', start: '11:27', end: '11:59' },
        { name: '6th Hour', start: '12:05', end: '13:37' },
        { name: '8th Hour', start: '13:43', end: '15:15' }
    ],
    WEDNESDAY: [
        { name: 'A Hour', start: '07:15', end: '08:00' },
        { name: '1st Hour', start: '08:15', end: '08:46' },
        { name: '2nd Hour', start: '08:51', end: '09:22' },
        { name: '3rd Hour', start: '09:27', end: '09:58' },
        { name: '4th Hour', start: '10:03', end: '10:34' },
        { name: '5th Hour', start: '10:39', end: '11:10' },
        { name: '6th Hour', start: '11:15', end: '11:46' },
        { name: '7th Hour', start: '11:51', end: '12:22' },
        { name: '8th Hour', start: '12:27', end: '12:58' }
    ]
};

export const QUOTES = [
    { text: 'The future depends on what you do today.', author: 'Mahatma Gandhi' },
    { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { text: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
    { text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' }
];

export const ALERTS = {
    NONE: { active: false },
    LOCKDOWN: { active: true, message: '🚨 Lockdown – The campus is on Lockdown. Initiate Lockdown procedures and WAIT for the All Clear.', class: 'bg-red-500 border-red-700 text-white' },
    ALL_CLEAR: { active: true, message: '✅ All Clear – Red Mountain High', class: 'bg-green-500 border-green-700 text-white' },
    SCHEDULED_MAINTENANCE: { active: false, message: '🚧 Website Down - Scheduled Website Maintenance', class: 'bg-yellow-400 border-yellow-600 text-yellow-800' }
};