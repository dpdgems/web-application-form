import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Logger } from '../../../helper/logger.service'
import Swal from 'sweetalert2';

const logger = new Logger('take-leave-form.component')

@Component({
  selector: 'app-take-leave',
  templateUrl: './take-leave-form.component.html',
  styleUrls: ['./take-leave-form.component.scss']
})
export class TakeLeaveFormComponent implements OnInit {
  form = this.formBuilder.group({
    selected: ['', Validators.required],
    startdate: [{ value: '', disabled: false }, Validators.required],
    enddate: [{ value: '', disabled: false }, Validators.required],
    amount: [''],
    remark: ['']
  })
  typeofLeave = [
    { id: 1, name: 'ลากิจ', value: '1' },
    { id: 2, name: 'ลากิจ(ครึ่งวันเช้า)', value: '0.5' },
    { id: 3, name: 'ลากิจ(ครึ่งวันบ่าย)', value: '0.5' },
    { id: 4, name: 'ลาพักร้อน', value: '1' },
    { id: 5, name: 'ลาพักร้อน(ครึ่งวันเช้า)', value: '0.5' },
    { id: 6, name: 'ลาพักร้อน(ครึ่งวันบ่าย)', value: '0.5' },
    { id: 7, name: 'ลาป่วย', value: '1' },
    { id: 8, name: 'ลาป่วย(ครึ่งวันเช้า)', value: '0.5' },
    { id: 9, name: 'ลาป่วย(ครึ่งวันบ่าย)', value: '0.5' },
    { id: 10, name: 'ลาคลอด', value: '1' },
    { id: 11, name: 'ลาบวช', value: '1' }
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
      }
    })
  }

  onLeaveChange(event: any) {
    logger.debug(`onLeaveChange => ${event}`)
    if (this.form.controls['enddate'].value !== '') {
      const diffDay = this.calculateDiffDay(this.form.get('startdate')?.value, this.form.get('enddate')?.value)
      const quant = this.typeofLeave.find(f => f.id === event.value)?.value
      // set amount
      this.form.patchValue({
        amount: diffDay * Number(quant)
      });
    } else {
      // set amount
      this.form.patchValue({
        amount: this.typeofLeave.find(f => f.id === event.value)?.value
      });
    }
  }

  onDateChange() {
    logger.debug(`onDateChange => ${this.form.get('selected')?.value}`)
    if (this.form.controls['selected'].value !== '' && this.form.controls['enddate'].value !== null) {
      const diffDay = this.calculateDiffDay(this.form.get('startdate')?.value, this.form.get('enddate')?.value)
      const idOfLeave = this.form.get('selected')?.value
      const quant = this.typeofLeave.find(f => f.id === idOfLeave)?.value
      // set amount
      this.form.patchValue({
        amount: diffDay * Number(quant)
      });
    }
  }

  calculateDiffDay(start: any, end: any) {
    logger.debug(`start Date => ${start}`)
    logger.debug(`end Date => ${end}`)
    const startDate = start
    const endDate = end
    return (Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / (1000 * 60 * 60 * 24))) + 1;
  }
}
