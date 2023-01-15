import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  socket = io('https://nodejs-socketio-production.up.railway.app/');
  // socket = io('http://localhost:3000');
  
  constructor(private rendererFactory: RendererFactory2) {
    this.socket.on("connect", () => {
      console.log("Connected - SocketID:",this.socket.id)
    })
   }

  write(event: KeyboardEvent | TouchEvent | any, chatElem: HTMLDivElement, inputElem: HTMLSpanElement, input: string, response: boolean){
    if(event.key === 'Enter') {
      event.preventDefault();
      console.log(input)
      this.socket.emit("message", input)
      inputElem.textContent =""
      this.appendText(chatElem, input, response)
    }
  }

  onInput(inputElem: HTMLSpanElement, input: string){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if(input.endsWith("\n")){
        inputElem.textContent = input.slice(0,-1)
        inputElem.dispatchEvent(new KeyboardEvent("keydown",{'key': 'Enter'})) //fix for mobile. can't find a better solution to avoid break lines in mobile
      }
    }
  }

  onFocus(placeholder: HTMLSpanElement){
    placeholder.textContent = ""
  }

  onFocusOut(placeholder: HTMLSpanElement, inputElem: HTMLSpanElement, placeholderValue: string){
    if(inputElem.innerText.length != 0) return
    placeholder.textContent = placeholderValue
  }

  appendText(chat: HTMLDivElement, input: string, response: boolean){
    if(!input) return

    let bubble = document.createElement("div")
    let paragraph = document.createElement("p");

    chat.append(bubble)
    bubble.append(paragraph)

    paragraph.innerText = input;
    this.setBubbleStyles(bubble, paragraph, response)
  }

  setBubbleStyles(bubble: HTMLDivElement, paragraph: HTMLParagraphElement, response: boolean){
    bubble.style.display = "flex"

    if(!response){
      bubble.style.justifyContent = "flex-end"
      paragraph.style.backgroundColor = "#005C4B"
    }else{
      bubble.style.justifyContent = "flex-start"
      paragraph.style.backgroundColor = "#2a3942"
    }

    paragraph.style.marginLeft = "20px"
    paragraph.style.marginRight = "20px"
    paragraph.style.marginBottom = "10px"
    paragraph.style.border = "2px solid white"
    paragraph.style.borderRadius = "10px"
    paragraph.style.padding = "10px"
    paragraph.style.color = "white"
    paragraph.style.width= "fit-content"
    paragraph.style.height= "fit-content"
    paragraph.style.maxWidth = "70%"
  }
}
