import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { AuthService } from 'src/app/auth.service';

interface Food {
  id: string;
  name: string;
  description: string;
}
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent {
  foodList: Food[] = [];
  constructor(
    private foodService: FoodService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((value: Food[]) => {
      console.log(value);
      this.foodList = value;
    });
  }
  onOrder(food: any): void {
    alert(`You ordered: ${food.name}`);
    console.log(`Ordered Food:`, food);
  }

  addFood() {
    alert('add food');
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
