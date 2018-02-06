import {HttpClient} from  'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)

export class App {
  constructor(http) {

    http.configure(config => {
      config
        .withBaseUrl('someBaseUrl/');
    });

    this.http = http;
    this.message = 'Aurelia GoLang application';
  }

  clickButton() {
    this.http.fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {
        this.message = data.title;
      })
  
  }
}
