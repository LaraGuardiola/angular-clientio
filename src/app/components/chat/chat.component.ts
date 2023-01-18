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
  
  constructor(protected connectService: ConnectService, protected utilityService: UtilityService){
    
  }
  ngOnInit(){
    (document.querySelector('.chat') as HTMLDivElement).style.height = `${window.screen.availHeight - 130}px`
  }
  ngAfterViewInit(): void {
    // this.screenOrientation()
    // this.setChatHeight()
    this.onResponse()
  }

  // screenOrientation(){
  //   console.log(window.screen.height)
  //   screen.orientation.addEventListener("change", () => {
  //     window.scrollTo(0, document.body.scrollHeight)
  //     this.chat.nativeElement.style.height = `${window.screen.availHeight - 130}px`

  //   })
  // }

  // setChatHeight(){
  //   window.addEventListener("resize", () => {
  //     console.log(window.screen.availHeight, window.innerHeight, window.screen.height)
  //   //130 is the sum of the header and input chat(footer) heights
  //     window.scrollTo(0, document.body.scrollHeight + 20)
  //     this.chat.nativeElement.style.height = `${window.screen.availHeight - 130}px`
  //   })
  // }

  onResponse(){
    this.connectService.socket.on("response", (input:string) => {
      let chat = document.querySelector('.chat') as HTMLDivElement;
      this.connectService.appendText(chat, input, true)
    })
  }
}
