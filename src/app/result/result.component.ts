import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
const path = 'http://localhost:3000';

@Component({
  selector: 'app-result',
  imports: [SurveyModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  surveyModel!: Model;
  private surveyJson: any = {};

  constructor(private http: HttpClient) { }
  ngOnInit() {
    const year = (new Date()).getFullYear();
    this.http.get<any>(`${path}/?year=${year}`).subscribe({
      next: res => {
        console.log('es', res)
        this.surveyJson = res.json;

        const survey = new Model(res.json.json ?? {});
        survey.showCompletePage = false;
        survey.showCompleteButton = false;
        // survey.mode = 'display';
        this.surveyModel = survey;
        const savedData = localStorage.getItem('response');
        this.surveyModel.data = savedData ? JSON.parse(savedData) : {};
        

        survey.onAfterRenderPanel.add((sender, options) => {
          const titleElement = options.htmlElement.querySelector('.sv-string-viewer');
          titleElement?.classList.add('my-panel-title')
        })
      }
    })
  }
}

