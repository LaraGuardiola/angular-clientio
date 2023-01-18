import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  socket = io('https://chatonymous-dev.onrender.com')
  // socket = io('http://localhost:3000')
  
  constructor() {
    this.socket.on("connect", () => {
      console.log("Connected - SocketID:",this.socket.id)
    })
   }

  write(event: KeyboardEvent | TouchEvent | any, chatElem: HTMLDivElement, inputElem: HTMLSpanElement, input: string, response: boolean){
    if(event.key === 'Enter') {
      event.preventDefault();
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

  appendText(chat: HTMLDivElement, input: string, response: boolean){
    if(!input) return

    let [bubble,paragraph,hour] =  this.createBubble(chat,input)

    this.setBubbleStyles(bubble as HTMLDivElement, paragraph as HTMLParagraphElement, hour, response)
    this.chatResize(chat,bubble as HTMLDivElement)
  }

  createBubble(chat: HTMLDivElement, input: string): HTMLElement[]{
    let bubble = document.createElement("div")
    let paragraph = document.createElement("p")
    let hour = document.createElement("span")

    let date = new Date();
    paragraph.innerText = input;
    hour.innerText = `${date.getHours().toString()}:${date.getMinutes().toString()}`

    chat.append(bubble)
    bubble.append(paragraph)
    paragraph.append(hour)

    return [bubble,paragraph,hour]
  }


  setBubbleStyles(bubble: HTMLDivElement, paragraph: HTMLParagraphElement, hour: HTMLSpanElement, response: boolean){
    bubble.style.display = "flex"
    bubble.style.position = "relative"

    //setting style if message or response
    if(!response){
      bubble.style.justifyContent = "flex-end"
      paragraph.style.backgroundColor = "#005C4B"
      
    }else{
      bubble.style.justifyContent = "flex-start"
      paragraph.style.backgroundColor = "#2a3942"
    }

    this.setParagraphStyle(paragraph)
    this.setHourStyles(paragraph, hour, response)
  }

  setParagraphStyle(paragraph: HTMLParagraphElement){
    //paragraph global styles
    paragraph.style.marginLeft = "20px"
    paragraph.style.marginRight = "20px"
    paragraph.style.marginBottom = "10px"
    paragraph.style.border = "2px solid white"
    paragraph.style.borderRadius = "10px"
    paragraph.style.padding = "10px"
    paragraph.style.paddingRight = "50px"
    paragraph.style.color = "white"
    paragraph.style.width= "fit-content"
    paragraph.style.height= "fit-content"
    paragraph.style.maxWidth= `${window.innerWidth * 0.8}px`
  }

  setHourStyles(paragraph: HTMLParagraphElement, hour: HTMLSpanElement, response: boolean){
    //hour style
    hour.style.position = "absolute"
    hour.style.bottom = "15px"
    hour.style.fontSize = "12px"

    //sets position of the hour span depending on response or message
    if(!response){
      hour.style.right = "30px"
    }else{
      hour.style.display = `block`
      hour.style.textAlign = `end`
      hour.style.width = `${paragraph.clientWidth - 20}px`
    }
  }

  chatResize(chat: HTMLDivElement,bubble: HTMLDivElement){
    let bubbles = document.querySelectorAll(".chat > div")
    let height = 0
    let chatHeight = chat.clientHeight

    bubbles.forEach(bubble => {
      height += bubble.clientHeight
    })

    if(height + 10 > chat.clientHeight){
      chat.style.height = `${chatHeight + bubble.clientHeight}px`
      document.body.style.marginBottom = "75px"
      window.scrollTo(0, document.body.scrollHeight)
    }    
  }
}
