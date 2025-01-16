import { Component, inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { AuthService } from 'src/app/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddfoodComponent } from 'src/app/addfood/addfood.component';
import { environment } from 'src/environment';
import { catchError, of } from 'rxjs';

interface Food {
  _id: string;
  name: string;
  description: string;
  image: any;
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
      this.foodList.forEach((food) => {
        food.image = `${environment.apiUrl}${food.image}`;
      });
    });
  }

  deleteFood(id: any) {
    console.log('id', id);
    this.foodService.deleteFood(id).subscribe({
      next(value) {
        if (value) {
          alert('Delete success');
        }
      },
      error(err) {
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
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
