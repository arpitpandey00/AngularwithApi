import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private appservice : AppServiceService) { }

  ngOnInit(): void {
    this.deleteproductform = new FormGroup({
      id: new FormControl()
    })
  }
  deletedata(): void {
    this.itemdelete = this.deleteproductform.value;
    console.log(this.itemdelete);
    this.appservice.deleteProducts(this.itemdelete.id).subscribe();

    this.reset();
  }
  reset(): void {
    this.deleteproductform.reset();
  }
}
