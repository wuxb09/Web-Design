import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Comment} from '../shared/comment';
import {baseURL} from '../shared/baseurl';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

class addComment {
  author: string;
  rating: number;
  message: string;
}


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
      flyInOut(),
      visibility(),
      expand()
  ]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishcopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  dataURL : string;
  errMess: string;
  styleVisibility = 'shown';

  commentForm: FormGroup;
  @ViewChild('cform') commentFormDirective;
  comment: addComment;

  formErrors = {
    'author': '',
    'message': '',
  };
  
  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.',
    },
    'message': {
      'required':      'Comment is required.',
    },
  };
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private cb: FormBuilder) {
      this.createForm();
  }

  createForm() {
    this.commentForm = this.cb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: 5,
      message: ['', [Validators.required] ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = this.commentForm.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
          }
        }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    //Add the new comment into dish.comments
    var tmp : Comment = {'author': this.comment.author, 'rating':this.comment.rating, 'comment':this.comment.message, 'date': Date()};
    //this.dish.comments.push(tmp);
    this.dishcopy.comments.push(tmp);
    console.log(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      message: ''
    });
  }
  
  ngOnInit() {
    this.dataURL = baseURL;

    //const id = this.route.snapshot.params['id'];
    //this.dish = this.dishservice.getDish(id);
    //this.dishservice.getDish(id).then(dish => this.dish = dish);
    //this.dishservice.getDish(id).subscribe(dish => this.dish = dish);

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.styleVisibility = 'hidden'; return this.dishservice.getDish(params['id']);}))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.styleVisibility = 'shown';}, errmess => this.errMess = <any>errmess);
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

}
