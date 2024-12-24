import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { AuthService } from 'src/app/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatefoodComponent } from 'src/app/createfood/createfood.component';

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
    private authService: AuthService,
    private matDialog: MatDialog
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
    if (this.matDialog.openDialogs.length > 0) {
      return; // Không mở thêm dialog
    }
    this.matDialog.open(CreatefoodComponent, {
      width: '600px',
      height: '300px',
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
