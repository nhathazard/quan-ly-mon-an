import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: ['', [Validators.required]],
      description: [''],
      image: ['', [Validators.required]],
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Tạo bản xem trước ảnh
      const reader = new FileReader();
      // reader.onload = () => {
      //   this.imagePreview = reader.result;
      // };
      reader.readAsDataURL(file);

      // Cập nhật giá trị trong form
      this.foodForm.patchValue({
        image: file,
      });
    }
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      const formData = new FormData();
      formData.append('name', this.foodForm.get('name')?.value);
      formData.append('description', this.foodForm.get('description')?.value);
      formData.append('image', this.foodForm.get('image')?.value);

      // this.foodService.addFood(formData).subscribe((response) => {
      //   console.log('Món ăn đã được thêm:', response);
      //   this.dialogRef.close();
      // });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
