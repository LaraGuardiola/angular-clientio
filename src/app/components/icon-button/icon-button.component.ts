import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { faSliders, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent {
  //style of the symbol
  @Input() symbol: IconDefinition
  
  constructor() { 
    this.symbol = faSliders
  }

  @ViewChild('icon') icon: ElementRef | any
  @ViewChild('button') button: ElementRef | any
  @ViewChild('text') text: ElementRef | any

  ngOnInit(): void {}

  //*Events

  onClick(event: Event): void {
    let button = (event.target as HTMLElement)
    console.log(button)
  }
}
