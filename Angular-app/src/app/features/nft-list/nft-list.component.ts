import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.css'],
})
export class NftListComponent implements OnInit {
  list: Observable<any[]>;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthServiceService
  ) {
    this.list = firestore.collection('nfts').valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
  }

}
