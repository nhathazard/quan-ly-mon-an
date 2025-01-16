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
  file: File | null = null;
  imageUrl: string | null = null;
  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<AddfoodComponent>
  ) {}

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.foodForm.valid && this.file) {
      const formData = new FormData();
      formData.append('name', this.foodForm.get('name')?.value);
      formData.append('description', this.foodForm.get('description')?.value);
      formData.append('price', this.foodForm.get('price')?.value);
      formData.append('image', this.file, this.file.name);
      this.foodService.createFood(formData).subscribe((value) => {
        if (value) {
          this.dialogRef.close();
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
