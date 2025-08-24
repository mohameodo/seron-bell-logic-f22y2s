export const schedules = {
    A: { // Monday, Thursday
        name: "A Day Schedule",
        periods: [
            { name: "A Hour", start: "7:15", end: "8:00" },
            { name: "1st Hour", start: "8:15", end: "9:47" },
            { name: "3rd Hour", start: "9:53", end: "11:27" },
            { name: "Lunch", start: "11:27", end: "11:59" },
            { name: "5th Hour", start: "12:05", end: "13:37" },
            { name: "7th Hour", start: "13:43", end: "15:15" },
        ]
    },
    B: { // Tuesday, Friday
        name: "B Day Schedule",
        periods: [
            { name: "A Hour", start: "7:15", end: "8:00" },
            { name: "2nd Hour", start: "8:15", end: "9:47" },
            { name: "4th Hour", start: "9:53", end: "11:27" },
            { name: "Lunch", start: "11:27", end: "11:59" },
            { name: "6th Hour", start: "12:05", end: "13:37" },
            { name: "8th Hour", start: "13:43", end: "15:15" },
        ]
    },
    W: { // Wednesday
        name: "Wednesday Schedule",
        periods: [
            { name: "A Hour", start: "7:15", end: "8:00" },
            { name: "1st Hour", start: "8:15", end: "8:46" },
            { name: "2nd Hour", start: "8:51", end: "9:22" },
            { name: "3rd Hour", start: "9:27", end: "9:58" },
            { name: "4th Hour", start: "10:03", end: "10:34" },
            { name: "5th Hour", start: "10:39", end: "11:10" },
            { name: "6th Hour", start: "11:15", end: "11:46" },
            { name: "7th Hour", start: "11:51", end: "12:22" },
            { name: "8th Hour", start: "12:27", end: "12:58" },
        ]
    },
    NONE: {
        name: "No Classes",
        periods: []
    }
};