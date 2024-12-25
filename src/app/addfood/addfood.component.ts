import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FoodService } from '../food/services/food.service';

@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.scss'],
})
export class AddfoodComponent {
  foodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<AddfoodComponent>
  ) {}

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      const newFood = this.foodForm.value;
      this.foodService.createFood(newFood).subscribe((value) => {
        console.log(value);
        if (value) {
          this.dialogRef.close();
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
