import { Directive, ElementRef, Input ,Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  
  @Input()
  barTitle : String ;

  @Input()
  barDescription : String ;

  constructor() { }

  ngOnInit() {
  }

}
