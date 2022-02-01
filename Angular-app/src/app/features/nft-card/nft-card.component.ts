import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.css']
})
export class NftCardComponent implements OnInit {

@Input() public oneItem : any = null;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate(['nft-page/'+this.oneItem.id])
  }

}
