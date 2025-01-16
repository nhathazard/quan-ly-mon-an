import { Component } from '@angular/core';
import { FoodService } from '../food/services/food.service';
import { environment } from 'src/environment';
interface Food {
  _id: string;
  name: string;
  description: string;
  image: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  foodList: Food[] = [];
  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.loadFoodList();
  }

  loadFoodList(): void {
    this.foodService.getAllFoods().subscribe((value: Food[]) => {
      this.foodList = value;
    });
  }

  onOderFood(id: any) {
    alert('Bạn đã order món thành công');
  }
  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}${imagePath}`;
  }
}
