import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminService} from '../../services/admin.service';
import {SnackBarService} from '../../services/snackBar.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Dish} from '../../models/dish';

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
  image: File = null;
  imagePreview: any ;

  constructor(private modal: MatDialog,
              private adminService: AdminService,
              private snackBar: SnackBarService,
              private categoryService: CategoryService,
              public modalRef: MatDialogRef<AddDishModalComponent>,
              @Inject(MAT_DIALOG_DATA) public dish: Dish) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-zА-яЁё\s]*$/),
        Validators.minLength(3),
        Validators.maxLength(20)]),
      categoryCode: new FormControl(null, [
        Validators.required]),
      rating: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-5]*$/)]),
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
    this.dish = null;
  }


  private closeModal() {
    this.modal.closeAll();
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
    this.adminService.addNewDish(this.form.value, this.image).subscribe(dish => {
      this.snackBar.showSnackBar(`Dish added`);
      this.modalRef.close(dish);
    }, (error) => {
      console.log(error);
      this.form.enable();
    });
  }
}
