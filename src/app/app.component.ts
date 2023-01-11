import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConnectService } from './services/connect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('input') input: ElementRef | any
  @ViewChild('chat') chat: ElementRef | any

  constructor(protected connectService: ConnectService){
    connectService.socket.on("response", (input:string) => {
      let chatBox = document.createElement("p");
      chatBox.innerText = input;
      this.chat.nativeElement.append(chatBox);
    })
  }
}


 



