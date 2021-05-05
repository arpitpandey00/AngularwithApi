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
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  itemupdate: items;
  constructor(private appservice: AppServiceService) { }
  updateproductform: FormGroup;
  min: number = 1;
  max: number = 100000;
  stock: boolean;
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
  updatedata(): void {
    this.itemupdate = this.updateproductform.value;
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
    this.appservice.putProducts(product1).subscribe(data => { });
    this.reset();
  }
  reset(): void {
    this.updateproductform.reset();
  }


}
