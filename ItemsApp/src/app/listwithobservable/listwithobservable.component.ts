import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { items } from '../IItems';

@Component({
  selector: 'app-listwithobservable',
  templateUrl: './listwithobservable.component.html',
  styleUrls: ['./listwithobservable.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListwithobservableComponent implements OnChanges,OnInit{

  title = 'AppApi';
 @Input() items :Observable< items[]>;
 allitems:items[]=[];
  itemssubscription:Subscription;
  constructor(private cd:ChangeDetectorRef)
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
  
  ngOnDestroy(){
    if(this.itemssubscription)
    {
      this.itemssubscription.unsubscribe();
    }
  }

}
