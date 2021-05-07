import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppServiceService } from '../app-service.service';
import { items } from '../IItems';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsList:Observable<items[]>
  constructor(private appservise:AppServiceService) 
  {
     this.productsList= new Observable<items[]>();
  }

  ngOnInit(): void {
    this.productsList=this.appservise.getProducts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.productsList = this.appservise.getProducts().pipe(switchMap(data =>
      { 
         return this.appservise.getProducts();
    }))
  }
  deleteProduct(id:number){
    this.appservise.deleteProducts(id).subscribe(
      ()=>{this.productsList=this.appservise.getProducts()}
    );
  }

}
