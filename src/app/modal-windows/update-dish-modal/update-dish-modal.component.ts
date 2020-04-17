import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AdminService} from '../../services/admin.service';
import {SnackBarService} from '../../services/snackBar.service';
import {CategoryService} from '../../services/category.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Dish} from '../../models/dish';
import {Category} from '../../models/category';
import {SERVER_URL} from '../../../environments/environment';

@Component({
  selector: 'ms-update-dish-modal',
  templateUrl: './update-dish-modal.component.html',
  styleUrls: ['./update-dish-modal.component.scss']
})
export class UpdateDishModalComponent implements OnInit {
  @ViewChild('input', {static: true}) inputRef: ElementRef;
  selectedCategory = this.dish.category._id;
  form: FormGroup;
  image: File;
  imagePreview: any;
  categories: Category[];

  constructor(private modal: MatDialog,
              private adminService: AdminService,
              private snackBar: SnackBarService,
              private categoryService: CategoryService,
              public modalRef: MatDialogRef<UpdateDishModalComponent>,
              @Inject(MAT_DIALOG_DATA) public dish: Dish) {
  }

  ngOnInit() {
    this.imagePreview = this.dish.img;
    this.form = new FormGroup({
      name: new FormControl(this.dish.name, [
        Validators.required,
        Validators.pattern(/^[A-zА-яЁё\s]*$/),
        Validators.minLength(3),
        Validators.maxLength(20)]),
      categoryCode: new FormControl(this.selectedCategory, [
        Validators.required]),
      rating: new FormControl(this.dish.rating, [
        Validators.required,
        Validators.pattern(/^[0-5]*$/)]),
      price: new FormControl(this.dish.rating, [Validators.required]),
      composition: new FormControl(this.dish.composition, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]),
      weight: new FormControl(this.dish.weight, [Validators.required]),
      description: new FormControl(this.dish.description, [
        Validators.required,
        Validators.minLength(20)
      ])
    });
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    });
  }


  private closeModal(): void {
    this.modal.closeAll();
  }

  triggerClick(): void {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  UpdateDish() {
    this.form.disable();
    this.adminService.updateDish(this.dish._id, this.form.value, this.image).subscribe(dish => {
      this.snackBar.showSnackBar(`Dish update`);
      this.modalRef.close(dish);
    }, () => {
      this.form.enable();
      console.error();
    });
  }
}
