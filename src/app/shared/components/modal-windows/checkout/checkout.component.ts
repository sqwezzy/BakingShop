import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {AuthService} from '../../../../services/auth.service';
import {SuccessfulCheckoutModalComponent} from '../successful-checkout-modal/successful-checkout-modal.component';
import {BasketService} from '../../../../services/basket.service';

@Component({
  selector: 'ms-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(
    public modalRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private modal: MatDialog,
    private cartService: BasketService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      house: new FormControl(null, [Validators.required]),
      flat: new FormControl(null, [])
    });
  }

  private checkout() {
    this.modal.open(SuccessfulCheckoutModalComponent);
    this.cartService.clearCart();
    this.data = {
      dishes: [],
      totalPrice: 0,
    };
    this.modalRef.close(this.data);
  }

  private closeModal() {
    this.modalRef.close(this.data);
  }

}
