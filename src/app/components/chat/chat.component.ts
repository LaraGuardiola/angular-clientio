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
  nameInput: HTMLSpanElement | undefined

  constructor(protected connectService: ConnectService, protected utilityService: UtilityService){}

  ngOnInit(){
    this.connectService.connect()
    this.setInitialChatHeight()
    this.onResize()
  }
  
  ngAfterViewInit(): void {
    this.nameInput = document.querySelector('.name-input') as HTMLSpanElement
    this.onResponse()
  }

  setInitialChatHeight(){
    (document.querySelector('.chat') as HTMLDivElement).style.height = `${window.innerHeight - 130}px`

    //fix for mobile in case keyboard is open
    if(window.screen.orientation.type === "portrait-primary"){
      (document.querySelector('.chat') as HTMLDivElement).style.height = `${window.innerHeight - 90}px`
    }
  }

  onResize(){
    window.addEventListener("change", this.setChatHeight)
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
      let chat = document.querySelector('.chat') as HTMLDivElement;
      this.connectService.appendText(chat, client, true)
    })
  }
}
