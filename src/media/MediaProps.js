export class MediaProps {
    id = '';
    title = '';
    timestamp = 0;
    status = '';
    privacy = '';
    tags = [];
    url = '';
    description = '';
    genre = '';
    thumbnail = '';
    author = '';
    license = '';
    mapProps(response, media) {
        let obj;
        Object.keys(response).forEach(key => {
            if (this.hasOwnProperty(key) || media.hasOwnProperty(key)) {
                obj[key] = response[key];
            }
        });
        media = obj;
    }
}
//# sourceMappingURL=MediaProps.js.map