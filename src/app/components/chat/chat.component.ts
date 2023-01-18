import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConnectService } from 'src/app/services/connect.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewInit{
  placeholderValue: string = "Write your message here..."
  @ViewChild('chat') chat: ElementRef | any
  chatHeight: string = `${window.screen.availHeight - 130}px`
  
  constructor(protected connectService: ConnectService, protected utilityService: UtilityService){

  }
  ngOnInit(){
    this.setInitialChatHeight()
    // this.setChatHeight()
    // this.screenOrientation()
  }
  ngAfterViewInit(): void {
    // this.screenOrientation()
    // this.setChatHeight()
    this.onResponse()
  }

  setInitialChatHeight(){
    (document.querySelector('.chat') as HTMLDivElement).style.height = `${window.screen.availHeight - 130}px`
  }

  screenOrientation(){
    console.log(window.screen.height)
    screen.orientation.addEventListener("change", () => {
      (document.querySelector('.chat') as HTMLDivElement).style.height = `${window.screen.height - 130}px`
      window.scrollTo(0, document.body.scrollHeight)
       //this.chat.nativeElement.style.height = `${window.screen.availHeight - 130}px`
    })
     
  }

  setChatHeight(){
    window.addEventListener("resize", () => {
      console.log(window.screen.availHeight, window.innerHeight, window.screen.height)
    //130 is the sum of the header and input chat(footer) heights
      
      this.chat.nativeElement.style.height = `${window.screen.availHeight - 130}px`
      window.scrollTo(0, document.body.scrollHeight + 20)
    })
  }

  onResponse(){
    this.connectService.socket.on("response", (input:string) => {
      let chat = document.querySelector('.chat') as HTMLDivElement;
      this.connectService.appendText(chat, input, true)
    })
  }
}
