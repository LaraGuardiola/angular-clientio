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
    let wrapper = document.createElement("div")
    let bubble = document.createElement("div")
    let name = document.createElement("p")
    let paragraph = document.createElement("p")
    let hour = document.createElement("p")

    let date = new Date();
    name.innerText = "Crypto Bro"
    paragraph.innerText = input;
    hour.innerText = `${date.getHours().toString()}:${date.getMinutes().toString()}`

    chat.append(bubble)
    bubble.append(wrapper)
    wrapper.append(name)
    wrapper.append(paragraph)
    wrapper.append(hour)

    return [bubble, wrapper, paragraph, hour, name]
  }
}
