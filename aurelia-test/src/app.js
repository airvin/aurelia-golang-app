import {HttpClient, json} from  'aurelia-fetch-client';
import {TaskQueue, inject} from 'aurelia-framework';

@inject(HttpClient, TaskQueue)

export class App {
  
  constructor(http,taskQueue) {

    http.configure(config => {
      config
        .withBaseUrl('')
        .withDefaults({
          mode: 'cors'
        });
    });

    this.http = http;
    this.taskQueue = taskQueue;
    this.message = 'Aurelia GoLang application';
    this.count = 0;
    this.updateTime(this.count);
  }

  updateTime(count) {
    if (this.count<10) {
      this.count = parseInt(count)+1;
    } else {
      this.http.fetch('http://localhost:3000/getdata')
      .then(response => response.json())
      .then(data => {
        console.log(data.Name);
        this.message = data.Name;
      })
      this.count = 0;
    }
    this.taskQueue.queueMicroTask(() => {
      console.log("count is: " + this.count);
      window.setTimeout(() => {
        this.updateTime(this.count)
      },2000);
    });
  }

  clickButton() {
    this.http.fetch('http://localhost:3000/getdata')
      .then(response => response.json())
      .then(data => {
        console.log(data.Name);
        this.message = data.Name;
      })
  }

}
