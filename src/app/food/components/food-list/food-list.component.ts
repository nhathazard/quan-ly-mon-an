import { Component, inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { AuthService } from 'src/app/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddfoodComponent } from 'src/app/addfood/addfood.component';
import { environment } from 'src/environment';

interface Food {
  _id: string;
  name: string;
  description: string;
  image: string;
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
      console.log('value', value);
    });
  }
  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}${imagePath}`;
  }
  onOrder(food: any): void {
    alert(`You ordered: ${food.name}`);
    console.log(`Ordered Food:`, food);
  }

  onDeleteFood(id: string) {
    console.log('id', id);

    this.foodService.deleteFood(id).subscribe((value) => {
      console.log('value', value);
    });
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
