import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  itemadd: items;
  constructor(private appservice: AppServiceService) { }
  addproductform: FormGroup;
  min: number = 1;
  max: number = 100000;
  stock: boolean;
  ngOnInit(): void {
    this.addproductform = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [PriceRangeValidator(this.min, this.max)]),
      quantity: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      expiryDate: new FormControl(null, [Validators.required]),
      inStock: new FormControl(true, [Validators.required])
    })
    this.booleanchecker();
  }
  booleanchecker() {

    this.addproductform.get('inStock')?.valueChanges.subscribe((data: string) => {
      console.log(data);
      if (data === "true") {
        this.stock = true;

      }
      else if (data === "false") {
        this.stock = false;
      }
    });
  }
  adddata(): void {
    this.itemadd = this.addproductform.value;
    let product1: items = {
      id: 121,
      title: this.itemadd.title,
      price: this.itemadd.price,
      quantity: this.itemadd.quantity,
      expiryDate: this.itemadd.expiryDate,
      color: this.itemadd.color,
      inStock: this.stock,
    }
    console.log(this.addproductform.value);
    this.appservice.createProducts(product1).subscribe(data => { });
    this.reset();
  }
  reset(): void {
    this.addproductform.reset();
  }

}
