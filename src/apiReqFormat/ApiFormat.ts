export class ApiFormat {
        constructor(props = {}) {
                Object.assign(this, props)
        }

        title = ''
        author = {
                name: '',
                pic: '',
                bio: ''
        }
        publisher = {
                name: '',
                logo: '',
                description: ''
        }
        topic = ''
        isbn = ''
        lccl = ''
        oclc = ''
        format = ''
        printType = ''
        orderBy = ''
        content = ''
        date = ''
        thumbnail = ''
        genre = ''
        tags = []
        region = ''
        length = ''
        parent = ''
        description = ''
        keyword = ''
}
