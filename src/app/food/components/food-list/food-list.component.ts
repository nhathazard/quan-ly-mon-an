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
    this.loadFoodList();
  }

  loadFoodList(): void {
    this.foodService.getAllFoods().subscribe((value: Food[]) => {
      this.foodList = value;
    });
  }
  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}${imagePath}`;
  }
  onOrder(food: any): void {
    alert(`You ordered: ${food.name}`);
    console.log(`Ordered Food:`, food);
  }

  onDeleteFood(id: string): void {
    this.foodService.deleteFood(id).subscribe({
      next: (value) => {
        if (value) {
          alert('Delete success');
          this.loadFoodList();
        }
      },
      error: (err) => {
        alert('User không phải là admin không có quyền xóa');
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddfoodComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterOpened().subscribe((value) => {
      console.log('value', value);
    });
    dialogRef.afterClosed().subscribe((newFood: Food) => {
      if (newFood) {
        alert('Món ăn đã được thêm!');
        this.loadFoodList();
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
