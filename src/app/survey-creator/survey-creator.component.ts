import { Component, OnInit } from "@angular/core";
import { SurveyCreatorModel } from 'survey-creator-core';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { settings } from "survey-core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { finalize, first } from "rxjs";

// settings.allow
const path = 'http://localhost:3000/save-form';

@Component({
  selector: 'app-survey-creator',
  imports: [SurveyCreatorModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './survey-creator.component.html',
  styleUrl: './survey-creator.component.scss'
})
export class SurveyCreatorComponent implements OnInit {
  creator: SurveyCreatorModel;
  private action = 'create';
  private _id!: string;
  public isLoading = true;

  public selectedOption: string = '2027';
  public options = [
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' }
  ];

  constructor(private http: HttpClient, private router: Router) {
    this.creator = new SurveyCreatorModel({
      showLogicTab: true,
      showTranslationTab: false,
      isAutoSave: false,
    });

    // Ajout du bouton personnalisé
    this.creator.toolbar.addAction({
      id: "save-form",
      title: "Save",
      tooltip: "Sauvegarder le formulaire",
      iconName: "icon-save",
      visible: true,
      action: () => {
        localStorage.setItem('form', JSON.stringify(this.creator.JSON))
        const json = this.creator.JSON;
        const year = this.selectedOption
        const body = {
          _id: this._id || null,
          year,
          version: 1,
          label: `Formulaire ${this.selectedOption} - V1`,
          json : json || {},
        }
        this.http.post<any>(`${path}/${this.action}`, body).subscribe({
          next: res => {
            console.log(res)
            window.location.href = '/index';
          }, error: err => {
            console.error(err)
          }
        })
      }
    });
  }


  ngOnInit(): void {
    this.getFormByYear(this.selectedOption);
  }

  public onChangeDate = () =>{
    localStorage.setItem('year', this.selectedOption)
    this.getFormByYear(this.selectedOption);
  }

  private getFormByYear = (year: string) =>{
    this.isLoading = true;
    this.http.get<any>(`http://localhost:3000/?year=${year}`).pipe(first(), finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        console.log(res)
        this.action = res.action;
        console.log(this.action)
        this._id = res?.json?._id;
        this.creator.JSON = res?.json?.json || {};
      }
    })
  }
}
