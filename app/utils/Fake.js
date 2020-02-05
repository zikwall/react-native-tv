import faker from 'faker';
import { Content } from './../constants';
import { random } from './Array';

export const onComingSoonFeaturePress = () => {
    alert('Coming Soon');
};

export const generateIPTVMessages = [
    {
        id: 1,
        message: 'Подождите, мы генерируем Вам случайный плейлист.'
    },
    {
        id: 2,
        message: 'Сейчас мы Вам найдем интересный контент.'
    },
    {
        id: 3,
        message: 'Кручу, кручу, найти контент хочу!'
    },
];

export const advices = [
    {
        id: 1,
        advice: 'У авторизированных пользователей больше возможностей, проверьте это сами!'
    },
    {
        id: 2,
        advice: 'Оффициальные представители отображаются на главной странице!'
    },
    {
        id: 3,
        advice: 'А Вы знали про родительский котроль? Нет? Попробуйте!'
    },
    {
        id: 4,
        advice: 'Вы можете публиковать свой контент. С Вашей рекламой!'
    },
    {
        id: 5,
        advice: 'Авторизированные пользователи могут менять цветовые схемы!'
    },
    {
        id: 6,
        advice: 'Вы можете воспользоваться случайным IPTV плейлистом, который мы подобрали для Вас!'
    },
    {
        id: 6,
        advice: 'У авторизированных пользователей есть возможность сканировать IPTV плейлисты!'
    }
];

export const homeFeed = [
    {
        type: "tweet",

        user: "Rodney Diaz",
        userName: "@rodiaz",
        avatar: require("../assets/avatar/user1.jpg"),

        time: "1h",
        message:
            'Sometimes I see english words that make me smile - because they are clear "transpositions" of their latin/italian counterparts',
        comments: 1,
        retweets: 0,
        likes: 2
    },
    {
        type: "retweet",
        from: "Wayne Spencer",

        user: "Tammy Warren",
        userName: "@tammy2",
        avatar: null,

        time: "2h",
        message:
            'Aqui les dejo el link a mi charla de ayer del #ReactWeekMedelin : "Some Video" youtube.com/watch?v=WC0Wkx #react #redux #RxJS',
        comments: 0,
        retweets: 3,
        likes: 6
    },
    {
        type: "response",
        to: "@ryanflorence",

        user: "Jacqueline Hayes",
        userName: "@jacqyes68",
        avatar: require("../assets/avatar/user2.jpg"),

        time: "1h",
        message:
            "Hard work is all you need if you're a hunter gatherer, but you're not.\n\nYouneed to convince people around you that whatever thing it is that you want to happen is something that they want to happen too.",
        comments: 3,
        retweets: 6,
        likes: 55
    },
    {
        type: "response",
        to: "@esablack58",

        user: "Wyatt Fleming",
        userName: "@attFleming",
        avatar: require("../assets/avatar/user3.jpg"),

        time: "32m",
        message: "How do you learn sales?",
        comments: 0,
        retweets: 0,
        likes: 0
    },
    {
        type: "retweet",
        from: "Earl Baker",

        user: "Craig Griffin",
        userName: "@cgriffin",
        avatar: require("../assets/avatar/user4.jpg"),

        time: "22h",
        message: "I'm jumping on this AMA. Come keep me company.",
        comments: 2,
        retweets: 6,
        likes: 15
    },
    {
        type: "responseTo",

        original: {
            type: null,
            user: "Josephine Gray",
            userName: null,
            avatar: require("../assets/avatar/user5.jpg"),

            time: "3h",
            message:
                "I need 7 more followers to get to 1000. If I get 1000 by end of day I will Venmo @Dandremonteiro $7.",
            comments: 5,
            retweets: 1,
            likes: 1
        },

        user: "Terry Davidson",
        userName: "@davidson",
        avatar: require("../assets/avatar/user6.jpg"),

        time: "1h",
        message: "I want @Dandremonteiro to pay you",
        comments: 1,
        retweets: 0,
        likes: 0
    }
];

export const searchFeed = {
    main: {
        title:
            "See how will be 'Wizards Unite' new phone game inspired on Harry Potter",
        topic: "Games",
        time: "Earlier Today",
        image: require("../assets/images/wizardsunite.png")
    },
    trends: [
        {
            title: "Worldwide trends"
        },
        {
            title: "Twitter Clone App",
            tweets: "1,3M tweets"
        },
        {
            title: "Zidane",
            tweets: "609k tweets"
        },
        {
            title: "Noick Foles",
            tweets: "21,7k tweets"
        },
        {
            title: "#FlyEaglesFly",
            tweets: "12,3k tweets"
        },
        { title: "Show more" }
    ]
};

export const notificationFeed = {
    all: [
        {
            type: "discover",
            users: [require("../assets/avatar/user1.jpg")],
            title: "*Rodney Diaz* liked the playlist of Tammy Warren",
            desc: "I don't have words for this! pic.twitter.com/tw1tt3rcl0n31s4w3s0m3"
        },
        {
            type: "follow",
            users: [require("../assets/avatar/user2.jpg")],
            title: "*Jacqueline Hayes* followed you",
            desc: null
        },
        {
            type: "like",
            users: [
                require("../assets/avatar/user3.jpg"),
                require("../assets/avatar/user1.jpg"),
                require("../assets/avatar/user4.jpg"),
                require("../assets/avatar/user2.jpg")
            ],
            title:
                "*Wyatt Fleming* and other 3 liked a Tweet in wich you were mentioned",
            desc:
                "Congrats for @zikwall for releasing PlayHub app! #ReactNative #playhub"
        },
        {
            type: "discover",
            users: [require("../assets/avatar/user6.jpg")],
            title: "*Terry Davidson* liked the playlist of Elon Musk",
            desc: "That's a beautiful app indeed"
        }
    ],
    mentions: [
        {
            type: "tweet",

            user: "Rodney Diaz",
            userName: "@rodiaz",
            avatar: require("../assets/avatar/user1.jpg"),

            time: "05/03/2020",
            message:
                'Sometimes I see english words that make me smile - because they are clear "transpositions" of their latin/italian counterparts',
            comments: 0,
            retweets: 0,
            likes: 3
        },
        {
            type: "retweet",
            from: "Wayne Spencer",

            user: "Tammy Warren",
            userName: "@tammy2",
            avatar: null,

            time: "03/03/2020",
            message:
                'Aqui les dejo el link a mi charla de ayer del #ReactWeekMedelin : "Some Video" youtube.com/watch?v=WC0Wkx #react #redux #RxJS',
            comments: 13,
            retweets: 30,
            likes: 20
        }
    ]
};

export const messageFeed = [
    {
        user: "Rodney Diaz",
        userName: "@rodiaz",
        avatar: require("../assets/avatar/user1.jpg"),

        time: "1m",
        message: "You: Check out my project!"
    },
    {
        user: "Terry Davidson",
        userName: "@davidson",
        avatar: require("../assets/avatar/user6.jpg"),

        time: "2m",
        message: "Realy Nice project man, congrats."
    },
    {
        user: "Craig Griffin",
        userName: "@cgriffin",
        avatar: require("../assets/avatar/user4.jpg"),

        time: "1d",
        message: "Hey, I saw your twitter clone, very nice!"
    },
    {
        user: "Wyatt Fleming",
        userName: "@attFleming",
        avatar: require("../assets/avatar/user3.jpg"),

        time: "3d",
        message: "You: Thank you !"
    }
];

export const contributingData = [
    { date: "2020-01-01" },
    { date: "2020-01-01" },
    { date: "2020-01-02" },
    { date: "2020-01-01" },
    { date: "2020-01-01" },
    { date: "2020-01-01" },
    { date: "2020-01-01" },
    { date: "2020-01-01" },
    { date: "2020-01-01" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-01-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2019-12-21" },
    { date: "2019-12-21" },
    { date: "2019-11-21" },
    { date: "2019-11-30" },
    { date: "2019-11-21" },
    { date: "2019-12-20" },
    { date: "2019-11-21" },
    { date: "2019-11-16" },
    { date: "2019-11-21" },
    { date: "2019-11-15" },
    { date: "2019-11-15" },
    { date: "2019-02-21" },
    { date: "2019-02-21" },
    { date: "2019-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-02-21" },
    { date: "2020-03-05" },
    { date: "2020-03-05" },
    { date: "2020-03-05" },
    { date: "2020-03-05" },
    { date: "2020-03-05" },
    { date: "2020-03-05" },
    { date: "2020-08-05" },
    { date: "2020-07-07" },
    { date: "2020-01-01" },
    { date: "2020-01-01" },
    { date: "2020-01-02" }
];

export const userPlaylist = [
    {
        channel: "Кинопремьера",
        category: "Кино",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/Кинопремьера.png'},
        rating: '4,4',
        visibility: Content.VISIBILITY.USERS,
        pinned: Content.PINNED.NO,
        type: 'Телеканал'
    },
    {
        channel: "Побег из шоушенка (1994)",
        category: "Кино",
        cover: {uri: 'https://upload.wikimedia.org/wikipedia/ru/thumb/d/de/Movie_poster_the_shawshank_redemption.jpg/240px-Movie_poster_the_shawshank_redemption.jpg'},
        rating: '5,5',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.NO,
        type: 'Фильм'
    },
    {
        channel: "Fox",
        category: "Развлекательное",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/FOX.png'},
        rating: '4,2',
        visibility: Content.VISIBILITY.PREMIUM,
        pinned: Content.PINNED.YES,
        type: 'Телеканал'
    },
    {
        channel: "Матч ТВ",
        category: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '3,1',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.NO,
        type: 'Телеканал'
    },
    {
        channel: "Cartoon Network",
        category: "Развлекательное",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/Cartoon Network.png'},
        rating: '4,9',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.YES,
        type: 'Телеканал'
    },
    {
        channel: "Amedia premium HD",
        category: "Премиум",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/Amedia premium HD.png'},
        rating: '4,3',
        visibility: Content.VISIBILITY.PREMIUM,
        pinned: Content.PINNED.YES,
        type: 'Телеканал'
    },
    {
        channel: "National Geographic",
        category: "Позвновательное",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/National Geographic.png'},
        rating: '2',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.YES,
        type: 'Телеканал'
    },
    {
        channel: "Матч ТВ",
        category: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '4,4',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.YES,
        type: 'Телеканал'
    },
    {
        channel: "Матч ТВ",
        category: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '4,4',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.NO,
        type: 'Телеканал'
    },
    {
        channel: "Матч ТВ",
        category: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '4,4',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.NO,
        type: 'Телеканал'
    },
    {
        channel: "Матч ТВ",
        category: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '4,4',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.NO,
        type: 'Телеканал'
    },
    {
        channel: "Матч ТВ",
        category: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '4,4',
        visibility: Content.VISIBILITY.PUBLIC,
        pinned: Content.PINNED.NO,
        type: 'Телеканал'
    }
];

export const users = [
    {
        user: "Rodney Diaz",
        userName: "@rodiaz",
        avatar: require("../assets/avatar/user1.jpg"),
    },
    {
        user: "Rustam Abashirov",
        userName: "@rus_team",
        avatar: { uri: faker.image.avatar() },
    },
    {
        user: "Terry Davidson",
        userName: "@davidson",
        avatar: require("../assets/avatar/user6.jpg"),
    },
    {
        user: "Stepanov Alexander",
        userName: "@stepa",
        avatar: { uri: faker.image.avatar() },
        is_official: 1
    },
    {
        user: "Craig Griffin",
        userName: "@cgriffin",
        avatar: require("../assets/avatar/user4.jpg"),
    },
    {
        user: "Sergey Tichonov",
        userName: "@tihon",
        avatar: require("../assets/avatar/user5.jpg"),
        is_official: 1
    },
    {
        user: "Wyatt Fleming",
        userName: "@attFleming",
        avatar: require("../assets/avatar/user3.jpg"),
    },
    {
        user: "Andrey Nikolayev",
        userName: "@nickolay",
        avatar: require("../assets/avatar/user2.jpg"),
    },
    {
        user: "Nikita Timurbulatov",
        userName: "@dawshak",
        avatar: { uri: faker.image.avatar() },
    }
];

export const reviews = [
    {
        user: random(users),
        review: 'Очень круто, давно искал этот контент, Автору огромный респект!!!',
        stars: 3,
        date: '02.02.2020',
        usefulCount: 0,
        isOwnUseful: false
    },
    {
        user: random(users),
        review: 'Очень круто, давно искал этот контент, Автору огромный респект!!!',
        stars: 5,
        date: '30.01.2020',
        usefulCount: 5,
        isOwnUseful: false
    },
    {
        user: random(users),
        review: 'Очень качественное вещание, автор действительно постарался, регулярные обновления, смотреть одно удовольствие. Подписался на него, чтобы получать качественный ковый контент, реклмендую всем!',
        stars: 1,
        date: '29.01.2020',
        usefulCount: 1,
        isOwnUseful: true
    },
    {
        user: random(users),
        review: 'Cool!, Very Cooool! Perfect! omg vaaahhh, krasota!',
        stars: 5,
        date: '28.01.2020',
        usefulCount: 1,
        isOwnUseful: true
    },
    {
        user: random(users),
        review: 'Спасибо этому приложению и божественному создателю, благослави тебя жизнь, ты супер, теперь я могу смотреть любимые передачи в любое время и в любом месте!! :)',
        stars: 5,
        date: '27.01.2020',
        usefulCount: 1,
        isOwnUseful: true
    }
];
