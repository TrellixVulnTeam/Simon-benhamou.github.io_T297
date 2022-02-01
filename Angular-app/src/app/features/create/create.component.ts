import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {

  access : boolean = false; 
  nftTitle:any  = null;
  nftDescription: any = null;
  nftCategory: any = null;
  previewUrl : any = null
  success : boolean = false;
  error:boolean = false;
  

  @ViewChild('title', { static: false }) title: ElementRef = null as any;
  @ViewChild('description', { static: false }) description: ElementRef =
    null as any;
  @ViewChild('category', { static: false }) category: ElementRef = null as any;

  file: File = null as any;

  constructor( private firestore: AngularFirestore) {}

  changeHandler(){
    this.nftTitle = this.title.nativeElement.value;
    this.nftDescription = this.description.nativeElement.value;
    this.nftCategory = this.category.nativeElement.value;
     if (
       this.nftTitle !== null ||
       this.nftCategory !== null ||
       this.nftDescription !== null 
     ) {
       this.access = true;
     }
  }

  create(){
    this.firestore.collection('nfts').add({
      title: this.nftTitle,
      category: this.nftCategory,
      description: this.nftDescription,
      image:this.previewUrl
    }).then(response => {
      if(response){
        this.success = true;
        setTimeout(() => {
           location.reload();
        }, 2000);
      }
    }).catch(e => this.error = true);
    }
  ngOnInit(): void {}

  uploadFileEvt(imgFile: any) {
    this.file = imgFile.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.previewUrl = fileReader.result;
      this.access = true
      console.log(this.previewUrl);
    };
    
    fileReader.readAsDataURL(this.file);
  }
}
