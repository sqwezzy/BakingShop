import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminService} from '../../services/admin.service';
import {SnackBarService} from '../../services/snackBar.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;

@Component({
  selector: 'ms-add-dish-modal',
  templateUrl: './add-dish-modal.component.html',
  styleUrls: ['./add-dish-modal.component.scss']
})
export class AddDishModalComponent implements OnInit {
  @ViewChild('input', {static: true}) inputRef: ElementRef;
  selectedCategory: Category;
  categories: Category[];
  form: FormGroup;
  image: File;
  imagePreview;

  constructor(private modal: MatDialog,
              private adminService: AdminService,
              private snackBar: SnackBarService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    // this.imagePreview = dish.img
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-zА-яЁё]*$/),
        Validators.minLength(3),
        Validators.maxLength(20)]),
      categoryCode: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required, Validators.pattern(/^[0-5]*$/)]),
      price: new FormControl(null, [Validators.required]),
      composition: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]),
      weight: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(20)
      ])
    });
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    });
  }


  private closeModal() {
    this.modal.closeAll();
  }

  private addDish() {
    console.log(this.form.value);
  }

  triggerClick() {
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

  addNewDish() {
    this.form.disable();
    // this.adminService.addNewDish();
  }
}
