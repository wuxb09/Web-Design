import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';
import {baseURL} from '../shared/baseurl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leader: Leader;
  leaders: Leader[];
  dataURL : string;
  errLeaderMess: string;

  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.dataURL = baseURL;
    //this.leader = this.leaderService.getFeaturedLeader();
    //this.leaders = this.leaderService.getLeaders();
    // this.leaderService.getFeaturedLeader().then(leader => this.leader = leader);
    // this.leaderService.getLeaders().then(leaders => this.leaders = leaders);
    //this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader, errmess => this.errLeaderMess = <any>errmess);
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders, errmess => this.errLeaderMess = <any>errmess);
  }

}
