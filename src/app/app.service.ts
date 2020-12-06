import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AppService {
    apiurl = environment.apiurl; // to assign frontend url
    constructor(private http: HttpClient, private router: Router) { }

    /** Http Service **/

    /**
     * Getcovids 19 statistics
     * @param country
     * @returns  
     */
    postslot(data) {
        return this.http.post(this.apiurl + '/api/appointment/', data);
    }

    getslotdetails(data) {
        return this.http.get(this.apiurl + '/api/appointment/' + data.date + '/' + data.doctor_id);
    }
    getappointments(data){
        return this.http.get(this.apiurl + '/api/patient/' + data.date + '/' + data.doctor_id + '/' + data.pagenumber);
    }

    postpatient(data){
        return this.http.post(this.apiurl + '/api/patient/', data);
    }
}
