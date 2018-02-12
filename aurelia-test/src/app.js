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
    this.message = 'Welcome to Neverending Trivia';
    this.answer = "";
    this.count = 8;
    this.updateTime(this.count);
    this.response = "";
    this.feedback = "";

  }

  updateTime(count) {
    if (this.count<4) {
      this.count = parseInt(count)+1;
    } else if (this.count<8) {
      this.feedback = this.answer[0] + "_ ".repeat(this.answer.length-1);
      this.count = parseInt(count)+1;
      if (this.count==8) {this.feedback = this.answer}
    } else { 
      this.http.fetch('http://localhost:3000/getdata')
      .then(response => response.json())
      .then(data => {
        console.log(data.Name);
        this.message = data.Name;
        this.answer = data.Answer
        console.log(data.Answer);
      })
      this.count = 0;
      this.feedback = "";
    } 
    this.taskQueue.queueMicroTask(() => {
      console.log("count is: " + this.count);
      window.setTimeout(() => {
        this.updateTime(this.count)
      },2000);
    });
  }

  formSubmit() {
    if (this.response == this.answer) {
      this.feedback = "Correct";
      this.count = 5;
    } else {
      this.feedback ="Incorrect";
    }
  }

  

}
