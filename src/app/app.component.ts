import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.fb.group({
      store_id: ['5c38080c6f5e5d0001770c6c'],
      user_identity: [''],
      deals: [[]],
      barcode_image: [null],
      currency: ['AUD'],
      discount_type: ['Flat'],
      tax_type: ['gst'],
      date: [new Date()],
      invoice_number: ['', [Validators.required]],
      invoice_type_tax: [true, [Validators.required]],
      order_number: ['', [Validators.required]],
      total_cost: [0, [Validators.required]],
      items: this.fb.array([])
    });
  }
  ngOnInit() {

  }

  createItem() {
    return this.fb.group({
      item_name: ['', [Validators.required]],
      marking_price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      selling_price: [null, [Validators.required]],
      total_tax: [0, [Validators.required]],
      discount: this.fb.group({
        discount_type: ['Flat', [Validators.required]],
        value: [null],
      }),
      info: ['', [Validators.required]],
      taxes: this.fb.array([])
    });
  }

  createTax() {
    return this.fb.group({
      tax_type: ['', [Validators.required]],
      tax_value: [0, [Validators.required]],
    });
  }

  createTotal() {
    let total = 0;
     this.form.value.items.map(item => {
      total += item.quantity * item.selling_price;
    });
    this.form.patchValue({
     total_cost: total
    });
  }
  addItem() {
    const control = <FormArray>this.form.controls['items'];
    control.push(this.createItem());
  }
  removeItem(i) {
    const control = <FormArray>this.form.controls['items'];
    control.removeAt(i);
    this.createTotal();
  }
  createBill() {
    this.apiService.create(this.form.value).subscribe(response => {
      console.log(response);
      alert('Bill Created');
    });
  }
}
