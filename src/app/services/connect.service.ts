import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  socket = io('https://nodejs-socketio-production.up.railway.app/');
  // socket = io('http://localhost:3000');
  
  constructor() {
    this.socket.on("connect", () => {
      console.log("Connected - SocketID:",this.socket.id)
    })
   }

  write(event: KeyboardEvent | TouchEvent | any, chatElem: HTMLDivElement, inputElem: HTMLSpanElement, input: string){
    if (event.key === 'Enter') {
      event.preventDefault();
      if(input.endsWith("\n")){
        input = input.slice(0, -1)
      }
      console.log(input)
      this.socket.emit("message", input)
      inputElem.textContent =""
      this.appendText(chatElem, input)
    }
  }

  onInput(inputElem: HTMLSpanElement, input: string){
    if(input.endsWith("\n")){
      inputElem.textContent = input.slice(0,-1)
      inputElem.dispatchEvent(new KeyboardEvent("keydown",{'key': 'Enter'}))
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
    if(!input) return

    let bubble = document.createElement("div")
    this.setBubbleStyles(bubble)
    let paragraph = document.createElement("p");
    chat.append(bubble)
    bubble.append(paragraph)
    paragraph.innerText = input;
  }

  setBubbleStyles(bubble: HTMLDivElement){
    bubble.style.marginLeft = "20px"
    bubble.style.marginRight = "20px"
    bubble.style.marginBottom = "10px"
    bubble.style.border = "2px solid white"
    bubble.style.borderRadius = "10px"
    bubble.style.padding = "10px"
    bubble.style.color = "white"
    bubble.style.backgroundColor = "#2a3942"
  }
}
