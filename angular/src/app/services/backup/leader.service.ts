import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay,catchError,map } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getLeaders(): Promise<Leader[]> {
  //   //return Promise.resolve(LEADERS);
  //   return new Promise(resolve => setTimeout(() => {
  //     resolve(LEADERS);
  //   }, 2000));
  // }

  // getLeader(id: string): Promise<Leader> {
  //   //return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  //   return new Promise(resolve => setTimeout(() => {
  //     resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  //   }, 2000));
  // }

  // getFeaturedLeader(): Promise<Leader> {
  //   //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  //   return new Promise(resolve => setTimeout(() => {
  //     resolve(LEADERS.filter((leader) => leader.featured)[0]);
  //   }, 2000));
  // }
  getLeaders(): Observable<Leader[]> {
    //return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    //return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leadership/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
