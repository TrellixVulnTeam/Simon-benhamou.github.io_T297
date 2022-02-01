import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nft-page',
  templateUrl: './nft-page.component.html',
  styleUrls: ['./nft-page.component.css'],
})
export class NftPageComponent implements OnInit {
  id: string = this.router.url.split('/')[2];
  list: Observable<any[]>;
  relevantItem: any = {};

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.list = firestore.collection('nfts').valueChanges({ idField: 'id'});
  }

  ngOnInit(): void {
    this.list.forEach(e => e.forEach(e => {
      if(e.id === this.id){
        this.relevantItem.title =  e.title
         this.relevantItem.image = e.image;
          this.relevantItem.description = e.description;
      }
    }));
  }
}
