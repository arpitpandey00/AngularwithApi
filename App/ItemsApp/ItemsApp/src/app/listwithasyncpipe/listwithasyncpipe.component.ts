import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { items } from '../IItems';

@Component({
  selector: 'app-listwithasyncpipe',
  templateUrl: './listwithasyncpipe.component.html',
  styleUrls: ['./listwithasyncpipe.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ListwithasyncpipeComponent implements OnInit {

  
  @Input() item$ : Observable<items[]>;
  constructor(private appservice:AppServiceService) { 
    this.item$ = new  Observable<items[]>();
  }
  ngOnInit(): void {
    
  }
  deleteProduct(id:number){
    this.appservice.deleteProducts(id).subscribe();
  }


}
