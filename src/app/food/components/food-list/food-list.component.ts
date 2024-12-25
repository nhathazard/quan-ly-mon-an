import { Component, inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { AuthService } from 'src/app/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddfoodComponent } from 'src/app/addfood/addfood.component';

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
    private dialog: MatDialog
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

  openDialog() {
    const dialogRef = this.dialog.open(AddfoodComponent, {
      width: '400px',
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
