import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Logger } from '../../../helper/logger.service'
import Swal from 'sweetalert2';

const logger = new Logger('general-expense-form.component')

@Component({
  selector: 'app-general-expense-form',
  templateUrl: './general-expense-form.component.html',
  styleUrls: ['./general-expense-form.component.scss']
})
export class GeneralExpenseFormComponent implements OnInit {
  form = this.formBuilder.group({
    selected: ['', Validators.required],
    date: [{ value: '', disabled: false }, Validators.required],
    amount: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
    remark: ['']
  })
  files: any;
  typeofExpense = [
    { id: 1, name: 'ค่าใช้จ่ายจิปาถะ', value: 1 },
    { id: 2, name: 'ค่าเดินทาง', value: 1 },
    { id: 3, name: 'ค่าน้ำมันรถ', value: 1 },
    { id: 4, name: 'ค่าโทรศัพท์', value: 1 },
    { id: 5, name: 'ค่าอาหาร', value: 1 },
    { id: 6, name: 'ค่าที่พัก', value: 1 },
    { id: 7, name: 'อื่นๆ', value: -1 },
  ]
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    Swal.fire({
      icon: 'question',
      title: 'บันทึกการทำรายการใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: `ยกเลิก`,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'บันทึกรายการสำเร็จ',
          timer: 3000,
          showConfirmButton: false
        })
      }
    })
  }

  onCancel() {
    Swal.fire({
      icon: 'question',
      title: 'ยืนยันที่จะยกเลิกการทำรายการใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: `ยกเลิก`,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
    }).then(result => {
      if (result.isConfirmed) {
        this.form.reset();
        this.files = null
      }
    })
  }

  onExpenseChange(event: any) {
    logger.debug(`onExpenseChange => ${event}`)
    this.form.patchValue({
      quantity: this.typeofExpense.find(f => f.id === event.value)?.value
    });
  }

  transformToDecimal(event: any) {
    logger.debug(`transformToDecimal => ${event.target.value}`)
    this.form.patchValue({
      amount: event.target.value ? parseFloat(event.target.value).toFixed(2) : ''
    })
  }

  press(event: any) {
    logger.debug(`press => ${event.key}`)
    // allow only number and dot
    var regExp = new RegExp(/[0-9.]/);
    if (regExp.test(event.key))
      return true
    else
      return false;
  }

  getFile(fileInput: any) {
    logger.debug('fileInput => ' + fileInput.target.files)
    const file: File = fileInput.target.files;
    this.files = file
  }

  checkRemarkRequired() {
    const idOfExpense = this.form.get('selected')?.value
    const value = this.typeofExpense.find(f => f.id === idOfExpense)?.value || 1
    let rs = false
    // expenses with a value of less than 0 must be required remark
    if (value < 0) {
      this.form.controls['remark'].setValidators([Validators.required]);
      rs = true
    } else {
      this.form.controls['remark'].clearValidators();
      rs = false
    }
    this.form.controls['remark'].updateValueAndValidity();
    return rs
  }
}
