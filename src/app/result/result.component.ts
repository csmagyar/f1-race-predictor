import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  private year: number = 0;
  private round: number = 0;
  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.year = +params['year'];
      this.round = +params['round'];
      this.dataService.getRaceResults(this.year,this.round).subscribe();
    })
  }


}
