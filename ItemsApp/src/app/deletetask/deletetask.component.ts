import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { items } from '../IItems';

@Component({
  selector: 'app-deletetask',
  templateUrl: './deletetask.component.html',
  styleUrls: ['./deletetask.component.css']
})
export class DeletetaskComponent implements OnInit {
  deleteproductform: FormGroup;
  itemdelete: items;
  x:boolean = false;
  y:boolean = true;
  div:boolean=false;
  Produt$Id: Observable<items>;
  searchbarenable: boolean=true;
  constructor(private appservice : AppServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.deleteproductform = new FormGroup({
      id: new FormControl(),
      title: new FormControl(null, []),
      price: new FormControl(null, []),
      quantity: new FormControl(null, []),
      color: new FormControl(null, []),
      expiryDate: new FormControl(null, []),
      inStock: new FormControl(null, [])
    })
    this.route.params.subscribe(
      p => {

        let rid = p.id as number;


        if (isNaN(rid) == false) {

          this.Produt$Id = this.appservice.getProductsbyid(rid);
          this.Produt$Id.subscribe((data:items) => {

            if (data) {
              this.searchbarenable = false;
              this.div=true;
              this.y=false;
              this.x=true;
             
              this.deleteproductform.get("title")?.setValue(data.title);
              this.deleteproductform.get("price")?.setValue(data.price);
              this.deleteproductform.get("quantity")?.setValue(data.quantity);
              this.deleteproductform.get("color")?.setValue(data.color);
              this.deleteproductform.get("expiryDate")?.setValue(data.expiryDate);
              this.deleteproductform.get("inStock")?.setValue(data.inStock);
              this.deleteproductform.get("id")?.setValue(rid);

            }
          });
          
          this.searchbarenable = true;

        }
        else if (isNaN(rid) == true) {
          console.log("Value is Not a Number");
        }
     
              this.div=false;
              this.y=true;
              this.x=false;
              
      }
    );
  }
  deletedata(): void {
    this.itemdelete = this.deleteproductform.value;
    console.log(this.itemdelete);
    this.appservice.deleteProducts(this.itemdelete.id).subscribe();

    this.reset();
  }
  findproduct(){
    this.div=true;
    this.x =true;
    this.y = false;
    this.itemdelete=this.deleteproductform.value;
     this.appservice.getProductsbyid(this.itemdelete.id).subscribe(
       data=> {console.log(data);
      this.deleteproductform.get('title')?.setValue(data.title);
      this.deleteproductform.get('price')?.setValue(data.price);
      this.deleteproductform.get('quantity')?.setValue(data.quantity);
      this.deleteproductform.get('color')?.setValue(data.color);
      this.deleteproductform.get('expiryDate')?.setValue(data.expiryDate);
      this.deleteproductform.get('inStock')?.setValue(data.inStock);
      }
     );
  }
  reset(): void {
    this.searchbarenable=true;
    this.div=false;
    this.x =false;
    this.y = true;
    this.deleteproductform.reset();
  }
}
