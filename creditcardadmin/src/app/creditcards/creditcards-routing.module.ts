import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditcardsComponent } from './creditcards.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ path: '', component: CreditcardsComponent
  // children:[
  //   {path:'view/:id'}
  // ]
},
{path:'add',component:AddComponent},
{path:'view/:id', component:ViewComponent}, // la7ata 2a3ml access 3a haydol l route lezm balesh bl /creditcards/view/12
{path:'edit/:id', component:EditComponent},
{path:'delete/:id', component:DeleteComponent},
{path:'**', component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditcardsRoutingModule { }
