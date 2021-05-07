import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { items } from '../IItems';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  title = 'AppApi';
 @Input() items :Observable< items[]>;
 allitems:items[]=[];
  itemssubscription:Subscription;
  constructor(private cd:ChangeDetectorRef,private appservise:AppServiceService)
  {
    this.itemssubscription= new Subscription();
    this.items=new Observable<items[]>();
  }
  ngOnInit(){
    this.itemssubscription=this.items.subscribe(
      data=>{
        this.allitems=data;
        this.cd.markForCheck();
        console.log(this.allitems);      }
    ),
      (error: any)=>{
      console.log(error);
    },
    ()=>console.log('complete')

  }
  ngOnChanges(): void {
    
    this.itemssubscription=this.items.subscribe(
      data=>this.allitems=data)
      this.cd.markForCheck();
  }
  deleteProduct(id:number){
    this.appservise.deleteProducts(id).subscribe();
  }
  ngOnDestroy(){
    if(this.itemssubscription)
    {
      this.itemssubscription.unsubscribe();
    }
  }
  displayedColumns: string[] = ['Id', 'Title', 'Quantity', 'Price','Color','ExpDate','InStock','Del'];
}
