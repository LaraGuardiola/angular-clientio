import { Component, Input, OnInit } from '@angular/core';
import { faIdCard, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Input() symbol: IconDefinition
  placeholderVal: string = "Write your name"

  constructor(protected utilityService: UtilityService){
    this.symbol = faIdCard
  }

  ngOnInit(): void {
    // window.onscroll = () => this.setStickyHeader()
  }
  
  setStickyHeader(){
    let header = document.querySelector("header") as HTMLHeadingElement;
    let headerOffSetTop = header.offsetTop
    if(window.scrollY > headerOffSetTop){
      header.classList.add("header")
    }
  }

  limitCharacters(inputElem: HTMLSpanElement, input: string) {
    if (inputElem.textContent!.length > 20) {
        inputElem.textContent = inputElem.textContent!.substring(0, 20);
    }

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if(input.endsWith("\n")){
        inputElem.textContent = input.slice(0,-1)
      }
    }
  }

  preventBreakLine(event: KeyboardEvent){
    if(event.key === 'Enter') {
      event.preventDefault();
    }
  }
}
