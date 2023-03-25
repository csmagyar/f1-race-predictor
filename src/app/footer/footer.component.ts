import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() extraInput = null;
  currentYear: string = "";
  myName = 'Csaba Magyar';

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }

}
