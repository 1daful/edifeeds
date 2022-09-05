/*import mailjet from 'node-mailjet';
export class Mailjet {
  mailjet: any;
  constructor() {
    this.mailjet = mailjet.connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
  }

  message =  {
      "Messages":[
        {
          "From": {
            "Email": "contact@edifeeds.com",
            "Name": "Wonder"
          },
          "To": [
            {
              "Email": "wondersayanfe@gmail.com",
              "Name": "Wonder"
            }
          ],
          "Subject": "Greetings from Mailjet.",
          "TextPart": "My first Mailjet email",
          "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
  }

  getItem(name: string, filters: Record<string, any>) {
    let body: any = {};
    let request = this.mailjet
    .get(name)
    .request(filters);
    request
    .then((result: any) => {
      body = result.body;
    })
    .catch((err: any) => {
      body = err.statusCode;
    });
    return body;
  }

  getItemWithId(name: string, id: string) {
    let body: any = {};
    let request = this.mailjet
    .get(name)
    .id(id)
    .request();
    request
    .then((result: any) => {
      body = result.body;
    })
    .catch((err: any) => {
      body = err.statusCode;
    });
    return body;
  }

  postItem(name: string, params: Record<string, any>) {
    let body: any = {};
    let request = this.mailjet
    .post(name, {'version': 'v3.1'})
    .request(params);
    request
    .then((result: any) => {
      body = result.body;
    })
    .catch((err: any) => {
      body = err.statusCode;
    });
    return body;
  }

  postItemWithId(name: string, params: Record<string, any>, id: string) {
    let body: any = {};
    let request = this.mailjet
    .post(name, {'version': '3.1'})
    .id(id)
    .request(params);
    request
    .then((result: any) => {
      body = result.body;
    })
    .catch((err: any) => {
      body = err.statusCode;
    });
    return body;
  }

  updateItem(name: string, params: Record<string, any>, id: string) {
    let body: any = {};
    let request = this.mailjet
    .put(name)
    .id(id)
    .request(params);
    request
    .then((result: any) => {
      body = result.body;
    })
    .catch((err: any) => {
      body = err.statusCode;
    });
    return body;
  }

  deleteItem(name: string, id: string) {
    let body: any = {};
    let request = this.mailjet
    .delete(name)
    .id(id)
    .request();
    request
    .then((result: any) => {
      body = result.body;
    })
    .catch((err: any) => {
      body = err.statusCode;
    });
    return body;
  }
  
}*/