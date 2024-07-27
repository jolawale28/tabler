const events = [
    {
        "id": 1,
        "name": "Tech Conference 2024",
        "tagline": "Innovate, Connect, Succeed.",
        "fromDate": "2024-09-10",
        "toDate": "2024-09-10",
        "location": "Lagos, Nigeria",
        "description": "A conference bringing together technology enthusiasts and professionals to discuss the latest trends in the tech industry.",
        "image": "https://picsum.photos/800/600?random=" + 1,
        "host": "jhhhhjj",
        "website": 'bkhjhoi'
    },
    {
        "id": 2,
        "name": "Music Fest",
        "tagline": "Feel the Beat.",
        "fromDate": "2024-08-20",
        "toDate": "2024-08-20",
        "location": "Abuja, Nigeria",
        "description": "A festival celebrating music from various genres with performances by local and international artists.",
        "image": "https://picsum.photos/800/600?random=" + 2,
        "host": "jhhhhjj",
        "website": 'bkhjhoi'
    },
    {
        "id": 3,
        "name": "Startup Pitch Night",
        "tagline": "Pitch, Impress, Fund.",
        "fromDate": "2024-10-15",
        "toDate": "2024-10-15",
        "location": "Port Harcourt, Nigeria",
        "description": "An event where startups can pitch their ideas to potential investors and receive feedback.",
        "image": "https://picsum.photos/800/600?random=" + 3,
        "host": "jhhhhjj",
        "website": 'bkhjhoi'
    },
    {
        "id": 4,
        "name": "Art Exhibition",
        "tagline": "Art in Every Stroke.",
        "fromDate": "2024-07-30",
        "toDate": "2024-07-30",
        "location": "Kano, Nigeria",
        "description": "An exhibition showcasing contemporary art by local artists.",
        "image": "https://picsum.photos/800/600?random=" + 4,
        "host": "jhhhhjj",
        "website": 'bkhjhoi'
    },
    {
        "id": 5,
        "name": "Business Networking Breakfast",
        "tagline": "Connect Over Coffee.",
        "fromDate": "2024-11-05",
        "toDate": "2024-11-05",
        "location": "Ibadan, Nigeria",
        "description": "A networking event for business professionals to connect and discuss opportunities.",
        "image": "https://picsum.photos/800/600?random=" + 5,
        "host": "jhhhhjj",
        "website": 'bkhjhoi'
    },
    {
        "id": 6,
        "name": "Google Dveloper Group Mpape",
        "tagline": "Use of Gemini API.",
        "fromDate": "2024-11-05",
        "toDate": "2024-11-05",
        "location": "Abuja, Nigeria",
        "description": "An opportunity to meet with professionals working in AI stuffs.",
        "image": "https://picsum.photos/800/600?random=" + 6,
        "host": "jhhhhjj",
        "website": 'bkhjhoi'
    }
]

export interface Event {
    id: number;
    name: string;
    tagline: string;
    fromDate: string;
    toDate: string;
    location: string;
    description: string;
    image: string,
    host: string,
    website: string
}

export default events