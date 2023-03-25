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
  
  top3: any = [];
  others: any = [];
  raceName: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.year = +params['year'];
      this.round = +params['round'];
      this.dataService.getRaceResults(this.year,this.round).subscribe(res => {
        const raceDetails = res.MRData.RaceTable.Races[0]
        console.log(raceDetails);
        this.top3 = raceDetails.Results.slice(0,3);
        [this.top3[0], this.top3[1]] = [this.top3[1], this.top3[0]];
        this.others = raceDetails.Results.slice(3);
        this.raceName = `${raceDetails.season} ${raceDetails.raceName} results`;
      });
    })
  }


}
