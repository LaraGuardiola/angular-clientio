import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faIdCard, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit{
  @Input() symbol: IconDefinition
  placeholderVal: string = "Write your name"
  @ViewChild("input") input!: ElementRef

  constructor(protected utilityService: UtilityService){
    this.symbol = faIdCard
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.onFocus()
    this.onBlur()
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

  onFocus(){
    this.input.nativeElement.addEventListener('focus', () => {
      if(this.input.nativeElement.textContent.length === 0){
        if(this.input.nativeElement.classList.contains("input-animation-in")){
          this.input.nativeElement.classList.remove("input-animation-in")
        }
      }
    })
  }

  onBlur(){
    this.input.nativeElement.addEventListener('blur', () => {
      if(this.input.nativeElement.textContent.length != 0){
        this.input.nativeElement.style.backgroundColor = "#202C33"
        if(!this.input.nativeElement.classList.contains("input-animation-in")){
          this.input.nativeElement.classList.add("input-animation-in")
        }
        
      }else{
        this.input.nativeElement.style.backgroundColor = "#2a3942"
      }
    })
  }
}
