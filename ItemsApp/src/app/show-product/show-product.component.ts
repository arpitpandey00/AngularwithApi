import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { items } from '../IItems';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  productsList:Observable<items>
  list:items
  productid:number
  constructor(private appservise:AppServiceService,private route:ActivatedRoute) 
  {
     this.productsList= new Observable<items>();
  }

  ngOnInit(): void {
    this.route.params.subscribe(d=>{
    this.productid=d.id as number;
  })
    this.productsList =this.appservise.getProductsbyid(this.productid);
    this.productsList.subscribe(
      d=>{this.list=d;
      console.log(d)
      });
 }
}
