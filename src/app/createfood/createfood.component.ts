import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FoodService } from '../food/services/food.service';

@Component({
  selector: 'app-createfood',
  templateUrl: './createfood.component.html',
  styleUrls: ['./createfood.component.scss'],
})
export class CreatefoodComponent {
  addFoodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatefoodComponent>,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.addFoodForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  onSave(): void {
    console.log('nhat', this.addFoodForm.value);
    const { name, description } = this.addFoodForm.value;
    this.foodService.addFoods(name, description).subscribe((value) => {
      if (value) {
        this.foodService.getAllFoods();
      }
    });
  }
}
