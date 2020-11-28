import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.scss']
})
export class ApplicantFormComponent {
  addressForm = this.fb.group({
    clinicName: [null, Validators.required],
    doctorName: [null, Validators.required],
    speciality: [null, Validators.required],
  });

  specialities = [
    'Allergy and Immunology',
    'Anesthesiology',
    'Dermatology',
    'Emergency Medicine',
    'Family Medicine',
    'Internal Medicine',
    'Medical Genetics and Genomics',
    'Neurological Surgery',
    'Neurology',
    'Nuclear Medicine',
    'Obstetrics and Gynecology',
    'Ophthalmology',
    'Orthopaedic Surgery',
    'Otolaryngology – Head and Neck Surgery',
    'Pathology',
    'Pediatrics',
    'Physical Medicine and Rehabilitation',
    'Plastic Surgery',
    'Preventive Medicine',
    'Psychiatry',
    'Radiology',
    'Surgery (General Surgery)',
    'Thoracic Surgery'

  ];

  clinics = ['Barbara Davis Center, Denver, Colorado (Adults)', 'Barbara Davis Center, Denver, Colorado (Pediatrics)', 'Children`s Mercy Hospital, Kansas, Missouri', 'Cincinnati Children\'s', 'Joslin Diabetes Center (State University of New York)', 'Joslin Diabetes Center (State University of New York) Pediatric', 'Nationwide Children`s Hospital, Columbus, Ohio', 'Texas Children\'s Hospital'];
  submitDisabled: boolean;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private matSnackBar: MatSnackBar) {}

  onSubmit = () => {
    this.submitDisabled = true;
    console.log(this.addressForm.value);
    this.httpClient.post('http://localhost:5000/chaincode/acc/', this.addressForm.value).pipe(
      take(1),
      tap(() => this.matSnackBar.open('Created Successfully', null, {duration: 700})),
      tap(() => this.submitDisabled = false),
      catchError(err => {
        this.submitDisabled = false;
        return of(err);
      })
    ).subscribe();

  };
}
