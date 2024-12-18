import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { filter, find } from 'rxjs';
interface Food {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  foodId: number | null = null;
  food: any;
  foodList: Food[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.foodId = Number(this.route.snapshot.paramMap.get('slug'));
    if (this.foodId) {
      this.foodService.getAllFoods().subscribe((value) => {
        this.foodList = value;
        console.log('this.foodList', this.foodList);
        this.food = this.foodList.find((item) => item.id === this.foodId);
      });
    }
  }
}
