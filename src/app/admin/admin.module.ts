import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ProfileComponent } from './profile/profile.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'product',
        component:ProductComponent
      },
      {
        path:'file-uploader',
        component:FileUploaderComponent
      },

      {
        path:'',
        pathMatch:'full',
        redirectTo:'/admin/dashboard'
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent, 
    DashboardComponent, 
    ProductComponent,
    ProductDetailComponent,
    FileUploaderComponent,
    ProfileComponent,
    PrintLayoutComponent
  ],
  entryComponents:[

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    FormsModule,
  ]
})
export class AdminModule { }
