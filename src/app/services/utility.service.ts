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

  createBubble(chat: HTMLDivElement, input: string, nickname: string, response: boolean): HTMLElement[]{
    let wrapper = document.createElement("div")
    let bubble = document.createElement("div")
    let name = document.createElement("p")
    let paragraph = document.createElement("p")
    let hour = document.createElement("p")

    let nameSpan = document.querySelector('.name-input') as HTMLSpanElement
    let chatSpan = document.querySelector('.chat-input') as HTMLSpanElement

    let date = new Date();

    //if client is sending a message, else getting a response
    if(!response){
      name.innerText = nickname
      if(nameSpan.innerText.length === 0){
        this.inCaseNoWrittenName(nameSpan, chatSpan)
      }
    }else{
      name.innerText = nickname
    }

    if(!response){
      nameSpan.innerText = name.innerText
    }
    
    paragraph.innerText = input;
    hour.innerText = `${date.getHours().toString()}:${date.getMinutes().toString()}`

    chat.append(bubble)
    bubble.append(wrapper)
    wrapper.append(name)
    wrapper.append(paragraph)
    wrapper.append(hour)

    return [bubble, wrapper, paragraph, hour, name]
  }

  inCaseNoWrittenName(nameSpan: HTMLSpanElement, chatSpan: HTMLSpanElement){
    nameSpan.focus()
    //need to figure out why it has to be wrapped inside a setTimeout
    setTimeout(() => {
      nameSpan.dispatchEvent(new KeyboardEvent("keydown",{'key': 'Enter'}))
    })
    setTimeout(() => {
      chatSpan.focus()
    })
  }
}
