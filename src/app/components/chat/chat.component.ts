import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit{
  placeholderValue: string = "Write your message here..."
  @ViewChild('chat') chat: ElementRef | any
  constructor(protected connectService: ConnectService){
    
  }
  
  ngAfterViewInit(): void {
    this.setChatHeight()
    this.onResponse()
  }

  setChatHeight(){
    //130 is the sum of the header and input chat(footer) heights
    this.chat.nativeElement.style.height = `${window.innerHeight - 130}px`
  }

  onResponse(){
    this.connectService.socket.on("response", (input:string) => {
      let chat = document.querySelector('.chat') as HTMLDivElement;
      this.connectService.appendText(chat, input, true)
    })
  }
}
