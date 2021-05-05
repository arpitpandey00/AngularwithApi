import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { items } from './IItems';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http:HttpClient) { }
  getProducts(): Observable<items[]>{
    const apiurl = environment.apibaseurl;
    const headers ={'content-type':'application/json'};
    return this.http.get<items[]>(apiurl,{'headers':headers}).pipe(
      tap((data)=>{console.log(data)}),
      catchError((error)=>{
        return throwError(error)
      })
    );
    }
  createProducts(item:items): Observable<items[]>{
    const apiurl = environment.apibaseurl;
    const headers ={'content-type':'application/json'};
    Object.defineProperty(item,'id',{'enumerable':false});
    const itemtodoadd =JSON.stringify(item);
    return this.http.post<items[]>(apiurl,itemtodoadd,{'headers':headers}).pipe(
      tap((data)=>{console.log(data)}),
      catchError((error)=>{
        return throwError(error)
      })
    );
    }
  putProducts(item:items): Observable<items[]>{
    const apiurl = environment.apibaseurl+"/"+item.id;
    const headers ={'content-type':'application/json'};
    return this.http.put<items[]>(apiurl,item,{'headers':headers}).pipe(
        catchError((error)=>{
        return throwError(error)   })
    );
    }
  deleteProducts(id:number): Observable<items[]>{
    const apiurl = environment.apibaseurl+"/"+id;
    const headers ={'content-type':'application/json'};
    return this.http.delete<items[]>(apiurl,{'headers':headers}).pipe(
        catchError((error)=>{
        return throwError(error)   })
    );
    }


  }
