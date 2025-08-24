const schedules = {
    aDay: {
        name: "🔴 A Day Schedule (Mon & Thu)",
        periods: [
            { name: "A Hour", start: "7:15", end: "8:00" },
            { name: "Passing Period", start: "8:00", end: "8:15" },
            { name: "1st Hour", start: "8:15", end: "9:47" },
            { name: "Passing Period", start: "9:47", end: "9:53" },
            { name: "3rd Hour", start: "9:53", end: "11:27" },
            { name: "Lunch", start: "11:27", end: "11:59" },
            { name: "Passing Period", start: "11:59", end: "12:05" },
            { name: "5th Hour", start: "12:05", end: "1:37" },
            { name: "Passing Period", start: "1:37", end: "1:43" },
            { name: "7th Hour", start: "1:43", end: "3:15" },
        ]
    },
    bDay: {
        name: "🔵 B Day Schedule (Tue & Fri)",
        periods: [
            { name: "A Hour", start: "7:15", end: "8:00" },
            { name: "Passing Period", start: "8:00", end: "8:15" },
            { name: "2nd Hour", start: "8:15", end: "9:47" },
            { name: "Passing Period", start: "9:47", end: "9:53" },
            { name: "4th Hour", start: "9:53", end: "11:27" },
            { name: "Lunch", start: "11:27", end: "11:59" },
            { name: "Passing Period", start: "11:59", end: "12:05" },
            { name: "6th Hour", start: "12:05", end: "1:37" },
            { name: "Passing Period", start: "1:37", end: "1:43" },
            { name: "8th Hour", start: "1:43", end: "3:15" },
        ]
    },
    wednesday: {
        name: "🟢 Wednesday Schedule",
        periods: [
            { name: "A Hour", start: "7:15", end: "8:00" },
            { name: "Passing Period", start: "8:00", end: "8:15" },
            { name: "1st Hour", start: "8:15", end: "8:46" },
            { name: "Passing Period", start: "8:46", end: "8:51" },
            { name: "2nd Hour", start: "8:51", end: "9:22" },
            { name: "Passing Period", start: "9:22", end: "9:27" },
            { name: "3rd Hour", start: "9:27", end: "9:58" },
            { name: "Passing Period", start: "9:58", end: "10:03" },
            { name: "4th Hour", start: "10:03", end: "10:34" },
            { name: "Passing Period", start: "10:34", end: "10:39" },
            { name: "5th Hour", start: "10:39", end: "11:10" },
            { name: "Passing Period", start: "11:10", end: "11:15" },
            { name: "6th Hour", start: "11:15", end: "11:46" },
            { name: "Passing Period", start: "11:46", end: "11:51" },
            { name: "7th Hour", start: "11:51", end: "12:22" },
            { name: "Passing Period", start: "12:22", end: "12:27" },
            { name: "8th Hour", start: "12:27", end: "12:58" },
        ]
    },
    weekend: {
        name: "💡 Weekend",
        periods: []
    }
};

window.schedules = schedules;