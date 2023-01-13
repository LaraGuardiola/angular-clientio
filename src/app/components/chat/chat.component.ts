import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('chat') chat: ElementRef | any

  constructor(protected connectService: ConnectService){
    connectService.socket.on("response", (input:string) => {
      let chatBox = document.createElement("p");
      chatBox.innerText = input;
      this.chat.nativeElement.append(chatBox);
    })
  }
}
