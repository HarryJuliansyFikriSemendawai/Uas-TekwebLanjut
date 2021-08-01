import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { ApiService } from 'src/app/services/api.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  books:any=[];
  userData: any = {};
  constructor(
    public dialog: MatDialog,
    public api: ApiService,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { 
    
  }

  ngOnInit(): void {
    this.title='Product';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getBooks();
    }); 
  }

  loading: boolean | undefined;
  getBooks()
  {
    this.loading=true;
    this.db.collection('books',ref=>{
      return ref.where('uid','==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.books=res;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
  }

  detailItem(data: any, idx: any) {
    let dialog = this.dialog.open(ProfileComponent, {
      width: '450px',
      data: data,
    });

    dialog.afterClosed().subscribe((res) => {
      console.log('card ditutup');
    });
  }

  productDetail(data: any, idx: any)
  {
    let dialog=this.dialog.open(ProductDetailComponent,{
      width:'400px',
      data: data
    });
    dialog.afterClosed().subscribe(res=>{
      return;
    })
  }

  loadingDelete:any={};
  deleteProduct(id: any, idx: any)
  {
    var conf=confirm('Delete Item?');
    if (conf)
    {
      this.db.collection('books').doc(id).delete().then(res=>{
        this.books.splice(idx,1);
        this.loadingDelete[idx]=false;
      }).catch(err=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
    
  }

  uploadFile(data: any)
  {
    let dialog=this.dialog.open(FileUploaderComponent,{
      width:'400px',
      data: data
    });
    dialog.afterClosed().subscribe(res=>{
      return;
    })
  }

  downloadFile(data: any)
  {
    FileSaver.saveAs('books/'+data.url);
  }
}

