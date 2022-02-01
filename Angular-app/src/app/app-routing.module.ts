import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { NftListComponent } from './features/nft-list/nft-list.component';
import { NftPageComponent } from './features/nft-page/nft-page.component';
import { SignupComponent } from './features/signup/signup.component';

const routes: Routes = [
  { component: NftListComponent, path: 'nft-list' },
  { component: LoginComponent, path: 'login' },
  { component: SignupComponent, path: 'signup' },
  { component: NftPageComponent, path: 'nft-page/:id' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
