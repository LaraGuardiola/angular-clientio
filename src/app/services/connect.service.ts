import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  socket = io('https://nodejs-socketio-production.up.railway.app/');
  
  constructor() {
    this.socket.on("connect", () => {
      console.log("Connected - SocketID:",this.socket.id)
    })
   }

  write(event: KeyboardEvent, chatElem: HTMLDivElement, inputElem: HTMLSpanElement, input: string){
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(input)
      this.socket.emit("message", input)
      inputElem.innerText =""
      this.appendText(chatElem, input)
    }
  }

  onWriting(length: number){
    if(length === 0) return
    this.socket.emit("inputMessage", length)
  }

   appendText(chat: HTMLDivElement, input: string){
    let chatBox = document.createElement("p");
    chatBox.innerText = input;
    chat.append(chatBox);
   }
}
