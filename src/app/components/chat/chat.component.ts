import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConnectService } from 'src/app/services/connect.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Client } from './client.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewInit{
  placeholderValue: string = "Write your message here..."
  nameInput!: HTMLSpanElement
  popAudio: HTMLAudioElement = new Audio()

  constructor(protected connectService: ConnectService, protected utilityService: UtilityService){}

  ngOnInit(){
    this.connectService.connect()
    this.setInitialChatHeight()
    this.onChange()
  }
  
  ngAfterViewInit(){
    this.nameInput = document.querySelector('.name-input') as HTMLSpanElement
    this.onResize()
    this.onResponse()
  }

  setInitialChatHeight(){
    (document.querySelector('.chat') as HTMLDivElement).style.height = `${window.innerHeight - 130}px`

    //fix for mobile in case keyboard is open
    if(window.screen.orientation.type === "portrait-primary"){
      (document.querySelector('.chat') as HTMLDivElement).style.height = `${window.innerHeight - 90}px`
    }
  }

  onChange(){
    window.addEventListener("change", this.setChatHeight)
  }

  //second parameter is an arrow function calling another function in order to pass the value of this, otherwise chatHeight returns undefined
  onResize(){
    window.addEventListener("resize", () => this.setChatHeight())
  }

  setChatHeight(){
      let chatHeight = this.utilityService.getChatHeight()
      let chat = this.utilityService.getChat()
      if(chatHeight > window.screen.availHeight){
        chat.style.height = `${chatHeight}px`
      }else{
        chat.style.height = `${window.screen.availHeight - 130}px`
      }
  }

  onResponse(){
    this.connectService.socket.on("response", (client: Client) => {
      let chat = document.querySelector('.chat') as HTMLDivElement
      this.connectService.appendText(chat, client, true);
      this.onResponseAudio(client)
    })
  }

  onResponseAudio(client: Client){
    (client.name === "God") 
        ? this.popAudio.src = '../../assets/sneeze.wav'
        : this.popAudio.src = '../../assets/pop.mp3'
    //there is a chance the user receives a response without interacting first, by default if it hasn't interact, it can't receive the audio notification
    this.popAudio.play().catch(err => console.warn(err))
  }
}
