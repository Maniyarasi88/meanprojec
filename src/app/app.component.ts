import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { AppService } from './app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meanproject1';
  slottype: any;
  sortmodal: any;
  timevalue = '';
  date: any;
  eveningslot = [];
  morningslot = [];
  today = new Date();
  p = 1; // for pagination
  patients: any = [];
  filterdate: any;
  count = 0;
  constructor(private modalService: NgbModal, private atp: AmazingTimePickerService, public appservice: AppService) {

  }
  ngOnInit() {

  }

  open(ev: any, slot, content) {
    if (this.date) {
      this.slottype = slot;
      let amazingTimePicker;
      if (slot === 'Morning') {
        amazingTimePicker = this.atp.open({
          theme: 'material-orange',
          rangeTime: {
            start: '09:00',
            end: '12:00'
          },
          onlyAM: true
        });
      } else if (slot === 'Evening') {
        amazingTimePicker = this.atp.open({
          theme: 'material-orange',
          rangeTime: {
            start: '18:00',
            end: '21:00',
          },
          onlyPM: true
        });
      }
      amazingTimePicker.afterClose().subscribe(time => {
        console.log(time);
        if (this.date === moment(new Date()).format('YYYY-MM-DD') &&
          Number(moment(new Date()).format('HH')) >= Number(time.split(':')[0])) {
          alert('Slot time got over');
        } else {
          if (slot === 'Evening') {
            const slot1 = this.eveningslot.filter(x => x === time);
            if (slot1 && slot1.length > 0) {
              alert('Slot already exists');
            } else {
              if (Number(time.split(':')[0]) >= 18 && Number(time.split(':')[0]) <= 20) {
                if (Number(time.split(':')[0]) === 20 && Number(time.split(':')[1]) > 30) {
                  alert('Select time between 06PM to 08.30PM');
                } else {
                  console.log(Number(time.split(':')[1]));
                  this.sortmodal = this.modalService.open(content, { size: 'lg', centered: true });
                  this.timevalue = time;
                }
              } else {
                alert('Select time between 06PM to 08.30PM');
              }
            }
          } else if (slot === 'Morning') {
            if (Number(time.split(':')[0]) >= 9 && Number(time.split(':')[0]) <= 11) {
              if (Number(time.split(':')[0]) === 11 && Number(time.split(':')[1]) > 30) {
                alert('Select time between 09AM to 11.30AM');
              } else {
                console.log(Number(time.split(':')[1]));
                this.sortmodal = this.modalService.open(content, { size: 'lg', centered: true });
                this.timevalue = time;
              }
            } else {
              alert('Select time between 09AM to 11.30AM');
            }
          }
        }
      }
      );
    } else {
      alert('Select date');
    }
  }
  addslot(form) {
    console.log(this.date);
    form.value.doctor_id = '1';
    form.value.morningslot = form.value.timevalue;
    if (this.slottype === 'Evening') {
      form.value.eveningslot = form.value.timevalue;
    }
    form.value.slottype = this.slottype;
    form.value.created_by = '1';
    form.value.date = this.date;
    this.appservice.postslot(form.value).subscribe((res: any) => {
      console.log(res);
      if (res.result === 'Slot Added Successfully') {
        alert(res.result);
        this.close();
        this.getslotdetails(this.date);
      }
    });
  }

  close() {
    this.sortmodal.close();

    // const data = {
    //   doctor_id: '1',
    //   date: '2020-12-07',
    //   time: '18:00',
    //   slottype: 'evening',
    //   patient_name: 'Kavya',
    //   contact_number: '68833385587',
    //   created_by: 'bdg123n',
    //   patient_id: 'bdg123n'
    // };
    // this.appservice.postpatient(data).subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  getslotdetails(data) {
    const data1 = {
      date: data,
      doctor_id: '1'
    };
    this.appservice.getslotdetails(data1).subscribe((res: any) => {
      console.log(res);
      if (res && res.length > 0) {
        this.morningslot = res[0].morningslot;
        this.eveningslot = res[0].eveningslot;
      } else if (res && res.length === 0) {
        this.morningslot = [];
        this.eveningslot = [];
      }
    });
  }

  getappointments(page) {
    const data = {
      date: this.filterdate,
      doctor_id: '1',
      pagenumber: Number(page) - 1
    };
    if (this.filterdate === undefined) {
      this.filterdate = 'undefined';
    }
    this.appservice.getappointments(data).subscribe((res: any) => {
      console.log(res);
      this.count = 0;
      if (res.data) {
        if (res.count.length > 0) {
          this.count = res.count[0].count;
        }
        if (page > 1) {
          Array.prototype.push.apply(this.patients, res.data);
        } else {
          this.patients = res.data;
        }
      }
    });
  }
}
