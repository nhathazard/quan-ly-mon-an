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
  imagePreview: any;
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
      price: ['', [Validators.required]],
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log('file', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.foodForm.patchValue({
        image: file,
      });
    }
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('#fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      const formData = new FormData();
      formData.append('name', this.foodForm.get('name')?.value);
      formData.append('description', this.foodForm.get('description')?.value);
      formData.append('image', this.foodForm.get('image')?.value);
      formData.append('price', this.foodForm.get('price')?.value);
      this.foodService.createFood(formData).subscribe((response) => {
        if (response) {
          this.dialogRef.close();
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
