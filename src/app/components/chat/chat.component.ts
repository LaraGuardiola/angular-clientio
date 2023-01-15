import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit{
  @ViewChild('chat') chat: ElementRef | any
  placeholderValue: string = "Write your message here..."

  constructor(protected connectService: ConnectService){
    // connectService.socket.on("response", (input:string) => {
    //   connectService.appendText(this.cha as HTMLDivElement, input)
    // })
  }
  ngAfterViewInit(): void {
    this.connectService.socket.on("response", (input:string) => {
      this.connectService.appendText(this.chat, input)
    })
  }
}
