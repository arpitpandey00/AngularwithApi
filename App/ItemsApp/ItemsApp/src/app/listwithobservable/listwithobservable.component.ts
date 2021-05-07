import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppServiceService } from '../app-service.service';
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
 @Output() deleteEvent : EventEmitter<any> = new EventEmitter<any>();
 allitems:items[]=[];
  itemssubscription:Subscription;
  constructor(private cd:ChangeDetectorRef,private appservice: AppServiceService,private route:ActivatedRoute)
  {
    this.itemssubscription= new Subscription();
    this.items=new Observable<items[]>();
  }
  ngOnInit(){
    this.route.params.subscribe(p=>{console.log(p.id)});
    this.itemssubscription=this.items.subscribe(
      data=>{
        this.allitems=data;
        this.cd.markForCheck();
        console.log(this.allitems);      
      }
    ),
      (error: any)=>{
      console.log(error);
    },
    ()=>console.log('complete')

  }
  ngOnChanges(): void {
    
    this.itemssubscription=this.items.subscribe(
      data=>{this.allitems=data;
      this.cd.markForCheck()});
     
  }
  
  ngOnDestroy(){
    if(this.itemssubscription)
    {
      this.itemssubscription.unsubscribe();
    }
  }
  deleteProduct(id:number){
    this.deleteEvent.emit(id);
  }

}
