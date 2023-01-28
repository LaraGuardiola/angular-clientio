import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Client } from '../components/chat/client.interface';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  socket = io('https://chatonymous-dev.onrender.com')
  // socket = io('http://localhost:3000')
  
  constructor(protected utilityService: UtilityService) {}

  connect(){
    this.socket.on("connect", () => {
      console.log("Connected - SocketID:",this.socket.id)
    })
  }

  write(event: KeyboardEvent | TouchEvent | any, chatElem: HTMLDivElement, inputElem: HTMLSpanElement, input: string, name: string, response: boolean){
    if(event.key === 'Enter') {
      event.preventDefault();
      
      const client: Client = {
        name: name.length != 0 ? name : `Anon#${Math.floor(Math.random() * 1001)}`,
        arg: input
      }

      this.socket.emit("message", client)
      inputElem.textContent =""
      this.appendText(chatElem, client, response)
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

  appendText(chat: HTMLDivElement, client: Client, response: boolean){
    if(!client.arg) return

    let [bubble,wrapper,paragraph,hour,name] =  this.utilityService.createBubble(chat,client.arg, client.name, response)

    this.setBubbleStyles(
      bubble as HTMLDivElement, 
      wrapper as HTMLDivElement, 
      paragraph as HTMLParagraphElement, 
      hour as HTMLParagraphElement, 
      name as HTMLParagraphElement, 
      response)
    this.chatResize(chat)
  }

  setBubbleStyles(bubble: HTMLDivElement, wrapper: HTMLDivElement, paragraph: HTMLParagraphElement, hour: HTMLParagraphElement, name: HTMLParagraphElement, response: boolean){
    bubble.style.display = "flex"
    bubble.style.flexDirection = "column"
    bubble.style.color = "white"
    wrapper.style.padding = "5px 10px 5px 10px"
    wrapper.style.border = "2px solid white"
    wrapper.style.borderRadius = "10px"
    wrapper.style.margin = "4px 0 4px 0"

    //setting style if message or response
    if(!response){
      bubble.style.alignItems = "end"
      wrapper.style.backgroundColor = "#005C4B"
      wrapper.style.marginRight = "20px"
    }else{
      bubble.style.alignItems = "start"
      wrapper.style.backgroundColor = "#2a3942"
      wrapper.style.marginLeft = "20px"
    }

    this.setNameStyles(name)
    this.setParagraphStyle(paragraph)
    this.setHourStyles(hour)
  }

  setNameStyles(name: HTMLParagraphElement){
    name.style.fontSize = "12px"
    name.style.fontWeight = "600" 
  }

  setParagraphStyle(paragraph: HTMLParagraphElement){
    paragraph.style.padding = "5px 20px 5px 0px"
    paragraph.style.maxWidth= `${window.screen.width * 0.75}px`
  }

  setHourStyles(hour: HTMLSpanElement){
    hour.style.fontSize = "12px"
    hour.style.textAlign = "end"
  }

  chatResize(chat: HTMLDivElement){
    let bubbles = document.querySelectorAll(".chat > div")
    let height = 0

    bubbles.forEach(bubble => {
      height += bubble.clientHeight
    })

    if(height > chat.clientHeight){
      this.setMarginBottom(chat, height)
      
      window.scrollTo(0, document.body.scrollHeight)
    }else{
      window.scrollTo(0,0)
    }
  }

  setMarginBottom(chat: HTMLDivElement, height: number){
    chat.style.height = `${height + 25}px` //extra height so in mobile doesn't look like shit
    if(window.screen.orientation.type === "landscape-primary"){
      document.body.style.marginBottom = "75px"
    }else{
      document.body.style.marginBottom = "65px"
    }
  }
}
