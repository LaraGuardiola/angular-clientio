import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  onFocus(placeholder: HTMLSpanElement){
    placeholder.textContent = ""
  }

  onFocusOut(placeholder: HTMLSpanElement, inputElem: HTMLSpanElement, placeholderValue: string){
    if(inputElem.innerText.length != 0) return
    placeholder.textContent = placeholderValue
  }

  getChatHeight(): number{
    let bubbles = document.querySelectorAll('.chat > div')
    
    let chatHeight = 0
    bubbles.forEach(bubble => {
      chatHeight += bubble.clientHeight
    })

    return chatHeight
  }

  getChat(): HTMLDivElement{
    return document.querySelector('.chat') as HTMLDivElement
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
}
