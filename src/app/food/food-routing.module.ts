import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';

const routes: Routes = [
  {
    path: 'food',
    children: [
      {
        path: '',
        component: FoodListComponent,
      },
      {
        path: ':slug',
        component: FoodDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
