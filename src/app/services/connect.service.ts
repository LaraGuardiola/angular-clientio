import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  socket = io('http://localhost:3000');
  
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
      inputElem.textContent =""
      this.appendText(chatElem, input)
    }
  }

  onFocus(placeholder: HTMLSpanElement){
    placeholder.textContent = ""
  }

  onFocusOut(placeholder: HTMLSpanElement, inputElem: HTMLSpanElement, placeholderValue: string){
    if(inputElem.innerText.length != 0) return
    placeholder.textContent = placeholderValue
  }

  appendText(chat: HTMLDivElement, input: string){
    let chatBox = document.createElement("p");
    chatBox.innerText = input;
    chat.append(chatBox);
  }
}
