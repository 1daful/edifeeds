import { isLoopbackAddr } from "is-loopback-addr";
export class NetworkLocal {
    static isLoopback = isLoopbackAddr(window.location.origin);
    static onLine = window.navigator.onLine;
    static test(message, msg, name) {
        if (name) {
            console.log(name);
            console.log(message, msg);
            return this.dummyData;
        }
    }
    static dummyData = {
        name: "dummyData",
        data: {
            id: 1,
            status: "released",
            privacy: "public",
            tags: ['test', 'dummy variable'],
            description: 'This is a test json data for the ui',
            genre: "Dummy Variable",
            thumbnailSmall: "data_dummy_small.jpg",
            thumbnailLarge: "data.dummy_large",
            created: "01-02-20",
            license: "GPL",
            title: "Dummy Data comes handy",
            authors: {
                name: "Wonder Ayanfe",
                pic: "awonder1",
                bio: "Quality-oriented"
            },
            printType: "papaerback"
        }
    };
}
//# sourceMappingURL=network.js.map