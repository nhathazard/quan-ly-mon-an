import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  foodList = [
    {
      name: 'Pizza Margherita',
      slug: 'pizza-margherita',
      price: 10.99,
      description: 'Classic Italian pizza with tomato sauce and mozzarella.',
      image: 'https://via.placeholder.com/150?text=Pizza',
    },
    {
      name: 'Sushi Combo',
      slug: 'sushi-combo',
      price: 15.99,
      description: 'Fresh sushi platter with a mix of rolls and nigiri.',
      image: 'https://via.placeholder.com/150?text=Sushi',
    },
    {
      name: 'Burger Deluxe',
      slug: 'burger-deluxe',
      price: 8.99,
      description: 'Juicy beef burger with lettuce, tomato, and cheese.',
      image: 'https://via.placeholder.com/150?text=Burger',
    },
    {
      name: 'Pasta Carbonara',
      slug: 'pasta-carbonara',
      price: 12.99,
      description: 'Creamy pasta with bacon, egg, and Parmesan cheese.',
      image: 'https://via.placeholder.com/150?text=Pasta',
    },
    {
      name: 'Caesar Salad',
      slug: 'caesar-salad',
      price: 7.99,
      description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
      image: 'https://via.placeholder.com/150?text=Salad',
    },
  ];

  foodId: string | null = null;
  food: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.foodId = this.route.snapshot.paramMap.get('slug');
    console.log('this.foodId', this.foodId);

    this.food = this.foodList.find((item) => item.slug === this.foodId);
  }
}
