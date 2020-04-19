import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminService} from '../../services/admin.service';
import {SnackBarService} from '../../services/snackBar.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Dish} from '../../models/dish';
import {InternalServerPageComponent} from '../../error-pages/internal-server-page/internal-server-page.component';

@Component({
  selector: 'ms-add-dish-modal',
  templateUrl: './create-or-update-dish.component.html',
  styleUrls: ['./create-or-update-dish.component.scss']
})
export class CreateOrUpdateDishlComponent implements OnInit {
  @ViewChild('input', {static: true}) inputRef: ElementRef;
  selectedCategory: string;
  categories: Category[];
  form: FormGroup;
  image: File = null;
  imagePreview: any;
  title: string;
  action: string;
  spinner: boolean;

  constructor(private modal: MatDialog,
              private adminService: AdminService,
              private snackBar: SnackBarService,
              private categoryService: CategoryService,
              public modalRef: MatDialogRef<CreateOrUpdateDishlComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if (this.data.isNew) {
      this.data.dish = null;
      this.title = 'Create dish';
      this.action = 'Create';
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
    } else {
      this.imagePreview = this.data.dish.img;
      this.selectedCategory = this.data.dish.category._id;
      this.title = 'Update dish';
      this.action = 'Update';
      this.form = new FormGroup({
        name: new FormControl(this.data.dish.name, [
          Validators.required,
          Validators.pattern(/^[A-zА-яЁё\s]*$/),
          Validators.minLength(3),
          Validators.maxLength(20)]),
        categoryCode: new FormControl(this.selectedCategory, [
          Validators.required]),
        rating: new FormControl(this.data.dish.rating, [
          Validators.required,
          Validators.pattern(/^[0-5]*$/)]),
        price: new FormControl(this.data.dish.rating, [Validators.required]),
        composition: new FormControl(this.data.dish.composition, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)]),
        weight: new FormControl(this.data.dish.weight, [Validators.required]),
        description: new FormControl(this.data.dish.description, [
          Validators.required,
          Validators.minLength(20)
        ])
      });
    }
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      this.snackBar.showSnackBar(error.error);
      this.form.enable();
    });
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
    this.showSpinner();
    if (this.data.isNew) {
      this.form.disable();
      this.adminService.addNewDish(this.form.value, this.image).subscribe(dish => {
        this.snackBar.showSnackBar(`Dish added`);
        this.modalRef.close(dish);
        this.hideSpinner();
      }, (error) => {
        if (error.status === 500) {
          this.modal.open(InternalServerPageComponent);
          return;
        }
        this.snackBar.showSnackBar(error.error);
        this.form.enable();
      });
    } else {
      this.form.disable();
      this.adminService.updateDish(this.data.dish._id, this.form.value, this.image).subscribe(dish => {
        this.snackBar.showSnackBar(`Dish update`);
        this.modalRef.close(dish);
        this.hideSpinner();
      }, (error) => {
        if (error.status === 500) {
          this.modal.open(InternalServerPageComponent);
          return;
        }
        this.snackBar.showSnackBar(error.error);
        this.form.enable();
      });
    }
  }
  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner() {
    this.spinner = false;
  }
}
