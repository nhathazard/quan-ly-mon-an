import { Component, inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { AuthService } from 'src/app/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddfoodComponent } from 'src/app/addfood/addfood.component';
import { environment } from 'src/environment';
import { ToastrService } from 'ngx-toastr';

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
    private dialog: MatDialog,
    private toastr: ToastrService
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

  onDeleteFood(id: string) {
    this.foodService.deleteFood(id).subscribe((value) => {
      if (value) {
        this.toastr.success('Xóa thành công!', 'Thông báo');
        this.loadFoodList();
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddfoodComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((newFood: Food) => {
      if (newFood) {
        this.toastr.success('Món ăn đã được thêm!', 'Thông báo');
        this.loadFoodList();
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
