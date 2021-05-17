import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import {baseURL} from '../shared/baseurl';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader : Leader;
  dataURL : string;
  errDishMess: string;
  errPromotionMess: string;
  errLeaderMess: string;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService) { }

  ngOnInit() {
    this.dataURL = baseURL;
    //this.dish = this.dishservice.getFeaturedDish();
    //this.promotion = this.promotionservice.getFeaturedPromotion();
    //this.leader = this.leaderservice.getFeaturedLeader();
    // this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
    // this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    // this.leaderservice.getFeaturedLeader().then(leader => this.leader = leader);
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.errDishMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errmess => this.errPromotionMess = <any>errmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader, errmess => this.errLeaderMess = <any>errmess);
  }

}
