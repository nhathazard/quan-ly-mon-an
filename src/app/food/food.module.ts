import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FoodListComponent, FoodDetailComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FoodRoutingModule,
    ReactiveFormsModule,
  ],
})
export class FoodModule {}
