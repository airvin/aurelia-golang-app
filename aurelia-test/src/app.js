import {HttpClient, json} from  'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)

export class App {
  constructor(http) {

    http.configure(config => {
      config
        .withBaseUrl('')
        .withDefaults({
          mode: 'cors'
        });
    });

    this.http = http;
    this.message = 'Aurelia GoLang application';
  }

  clickButton() {
    // http://jsonplaceholder.typicode.com/posts/1
    // http://localhost:12345/getdata
    this.http.fetch('http://localhost:12345/getdata')
      .then(response => response.json())
      .then(data => {
        console.log(data.Name);
        this.message = data.Name;
      })
  
  }
}
