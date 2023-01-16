import { Component, Input } from '@angular/core';
import { faIdCard, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() symbol: IconDefinition
  placeholderVal: string = "Write your name"

  constructor(protected connectService: ConnectService){
    this.symbol = faIdCard
  }
}
