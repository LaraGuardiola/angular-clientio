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
}
