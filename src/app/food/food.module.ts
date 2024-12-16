import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';

@NgModule({
  declarations: [FoodListComponent, FoodDetailComponent],
  imports: [CommonModule, FoodRoutingModule],
})
export class FoodModule {}
