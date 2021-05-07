import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { items } from '../IItems';
function PriceRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 0 || control.value > 100000)) {
      return { "priceerror": true };
    }
    return null;
  }
}
@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  itemupdate: items;
  itemUpdate: items;
  Produt$Id: Observable<items>;
  searchbarenable: boolean = true;
  constructor(private appservice: AppServiceService, private route: ActivatedRoute) { }
  updateproductform: FormGroup;
  min: number = 1;
  max: number = 100000;
  stock: boolean;
  x: boolean = false;
  y: boolean = true;
  div: boolean = false;
  ngOnInit(): void {

    this.updateproductform = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [PriceRangeValidator(this.min, this.max)]),
      quantity: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      expiryDate: new FormControl(null, [Validators.required]),
      inStock: new FormControl(true, [Validators.required])
    })
    this.booleanchecker();
    this.itemupdate = this.updateproductform.value;
    this.route.params.subscribe(
      p => {

        let rid = p.id as number;


        if (isNaN(rid) == false) {

          this.Produt$Id = this.appservice.getProductsbyid(rid);
          this.Produt$Id.subscribe(data => {

            if (data) {
              this.searchbarenable = false;
              this.div=true;
              this.y=false;
              this.x=true;
             
              this.updateproductform.get("title")?.setValue(data.title);
              this.updateproductform.get("price")?.setValue(data.price);
              this.updateproductform.get("quantity")?.setValue(data.quantity);
              this.updateproductform.get("color")?.setValue(data.color);
              this.updateproductform.get("expiryDate")?.setValue(data.expiryDate);
              this.updateproductform.get("inStock")?.setValue(data.inStock);
              this.updateproductform.get("id")?.setValue(rid);

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
  booleanchecker() {

    this.updateproductform.get('inStock')?.valueChanges.subscribe((data: string) => {
      console.log(data);
      if (data === "true") {
        this.stock = true;

      }
      else if (data === "false") {
        this.stock = false;
      }
    });
  }
  findproduct() {
    this.div = true;
    this.x = true;
    this.y = false;
    this.itemUpdate = this.updateproductform.value;
    this.appservice.getProductsbyid(this.itemUpdate.id).subscribe(
      data => {
        console.log(data);
        this.updateproductform.get('title')?.setValue(data.title);
        this.updateproductform.get('price')?.setValue(data.price);
        this.updateproductform.get('quantity')?.setValue(data.quantity);
        this.updateproductform.get('color')?.setValue(data.color);
        this.updateproductform.get('expiryDate')?.setValue(data.expiryDate);
        this.updateproductform.get('inStock')?.setValue(data.inStock);
      }
    );
  }
  updatedata(): void {

    let product1: items = {
      id: this.itemupdate.id,
      title: this.itemupdate.title,
      price: this.itemupdate.price,
      quantity: this.itemupdate.quantity,
      expiryDate: this.itemupdate.expiryDate,
      color: this.itemupdate.color,
      inStock: this.stock,
    }
    console.log(this.updateproductform.value);
    this.appservice.putProducts(product1).subscribe();
    this.reset();
  }
  reset(): void {
    this.x = false;
    this.y = true;
    this.div = false;
    this.updateproductform.reset();
    this.searchbarenable=true;
  }


}
