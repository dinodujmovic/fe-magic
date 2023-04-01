import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject, from, lastValueFrom, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // The key difference between Subject and BehaviorSubject is that BehaviorSubject always emits the latest value to its subscribers, 
  // even if they subscribe after the value was emitted, while a Subject does not have an initial value and only emits values that are 
  // emitted after a subscriber subscribes to it.

  // Subject is Multicast meaning  late subscribes will mess any emissions that accured before subscription
  // Also use if you don't want to define initial value.
  private categorySelectedSubject = new Subject<string>();
  categorySelectedSubAction$ = this.categorySelectedSubject.asObservable();

  // BehaviorSubject buffers last emitted value and emits that value to any late subscribes
  // Late subscribes will get latest emission and when value is emitted again every subscriber recieves the latest notification with the value.
  // Requires initial value.
  public categorySelectedBehaviourSubject = new BehaviorSubject<string>('a');
  categorySelectedBSubAction$ = this.categorySelectedBehaviourSubject.asObservable();

  constructor(private http: HttpClient) { 
    console.log(environment);
  }

  public getDogs() {
    return this.http.get('https://api.thedogapi.com/v1/breeds')
      .pipe(
        tap(data => console.log(data)),
        mergeMap((data: any) => {
          return of(data.splice(0, 5));
        }),
        catchError(() => of([{ name: 'Error Dog' }]))
      );
  }

  public getCats() {
    return this.http.get('https://api.thecatapi.com/v1/breeds')
      .pipe(
        tap(data => console.log(data)),
        mergeMap((data: any) => {
          return of(data.splice(0, 5));
        }),
        catchError(() => of([{ name: 'Error Cat' }]))
      );
  }

  public getDog(id: number) {
    return this.http.get(`https://api.thedogapi.com/v1/breeds/${id}`)
      .pipe(
        mergeMap((data: any) => {
          return of(data);
        }));
  }

  public getMoreDogs(ids: number[]) {
    // High order functions that transforms each emitted item to a new (inner) observable as defined by a function

    // concatMap
    // it waits for each inner observable to complete before processing the next one!
    // Example: set of ids, get data in sequence -> ids of top10 highest products and u wanna display them in the order, 
    // or updating or deleting data and want to be sure each update is complete

    // mergeMap (ex flatMap)
    // it executes inner Observables in parallel and merges their results
    // Use when order doesn't matter

    // switchMap - Unsubscribes the prior inner observable and switches to the new inner Observable
    // When one is emitted it subscribes and get request is issues. When second one is emitted switchMap switches to that one and cancels previous one.
    // If first one completes before second one is emitted it's result would be merged to upper observable.
    // Useful for typeahead or autocomplete !! When you want to restart a search as user types.
    // Or when displaying a list and user selects option 1, Oops no, option 2 !

    // ===================
    // of and from are two operators in RxJS that can be used to create an Observable.
    // The of operator is used to create an Observable that emits a sequence of values. Example: of(1, 2, 3, 4);

    // The from operator is used to create an Observable from an array, iterable, Promise, or any other object that can be iterated.
    // Example: from([1, 2, 3, 4])
    // The main difference between of and from is the type of input they can accept. 
    // of can accept any number of arguments, while from can accept an array, iterable, Promise, or any other object that can be iterated.
    return from(ids)
      .pipe(
        mergeMap(id => this.http.get(`https://api.thedogapi.com/v1/breeds/${id}`)),
        toArray()
      )
      // forkJoin can more cleaner
  }

  public getCat(id: number) {
    return this.http.get(`https://api.thecatapi.com/v1/breeds/${id}`)
      .pipe(
        mergeMap((data: any) => {
          return of(data);
        }))
  }

  // Promise example with HttpClient (lastValueFrom is a replacement for toPromise)
  public getBreedsPromise() {
    const observable = this.http.get('https://api.thedogapi.com/v1/breeds')
      .pipe(
        mergeMap((breeds: any) => {
          return of(breeds.splice(0, 5));
        }));

    return lastValueFrom(observable);
  }

  public selectCategory(category: string) {
    this.categorySelectedSubject.next(category);
    this.categorySelectedBehaviourSubject.next(category);
  }
}
