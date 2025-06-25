import { Component, OnInit } from '@angular/core';
import { Model, SvgRegistry } from "survey-core";
import { SurveyModule } from "survey-angular-ui";
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {iconDescriptionShowSvg, iconDescriptionHideSvg} from '../icons/icons.constants'

SvgRegistry.registerIcon("icon-description-show", iconDescriptionShowSvg);
SvgRegistry.registerIcon("icon-description-hide", iconDescriptionHideSvg);

const path = 'http://localhost:3000';

@Component({
  selector: 'app-form-library',
  imports: [SurveyModule, RouterModule],
  standalone: true,
  templateUrl: './form-library.component.html',
  styleUrl: './form-library.component.scss'
})
export class FormLibraryComponent implements OnInit {
  surveyModel!: Model;
  private surveyJson: any = {};
  public currentYear!: string;

  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit() {
    const year = localStorage.getItem('year') || 2025;
    const json = localStorage.getItem(`survey-${year}`) || {};
    const surveyModel = new Model (json);

    surveyModel.completeText = 'Save';
        surveyModel.css = {
          navigationButton: 'save-button'
        }

        surveyModel.showCompletePage = false;
    this.surveyModel = surveyModel;




    // this.currentYear = selectedYear ? JSON.parse(selectedYear)  : (new Date()).getFullYear();

    // this.http.get<any>(`${path}/?year=${this.currentYear}`).subscribe({
    //   next: res => {
    //     console.log('es', res)
    //     this.surveyJson = res.json;

    //     const survey = new Model(res.json.json ?? {});
        
    //     this.surveyModel = survey;

    //     // survey config
        // survey.completeText = 'Save';
        // survey.css = {
        //   navigationButton: 'save-button'
        // }

        // survey.showCompletePage = false;

    //     survey.onAfterRenderPanel.add((sender, options) => {
    //       const titleElement = options.htmlElement.querySelector('.sv-string-viewer');
    //       titleElement?.classList.add('my-panel-title');
    //     })


      //   survey.onGetQuestionTitleActions.add((_, options) => {
      //     options.actions = [{
      //         id: "show-description",
      //         tooltip: "Show description",
      //         iconName: "icon-description-show",
      //         action: (action) => {
      //           console.log('hhh')
      //             // const q = options.question;
      //             // q.descriptionLocation = q.descriptionLocation !== "hidden" ? "hidden" : "underTitle";
      //             // action.iconName = q.descriptionLocation !== "hidden" ? "icon-description-hide" : "icon-description-show";
      //         }
      //     }];
      // });

      // survey.onGetPanelTitleActions.add((_, options) =>{
      //         options.actions = [{
      //         id: "show-description",
      //         tooltip: "Show description",
      //         iconName: "icon-description-show",
      //         action: (action) => {
      //           console.log('hhh')
      //             // const q = options.question;
      //             // q.descriptionLocation = q.descriptionLocation !== "hidden" ? "hidden" : "underTitle";
      //             // action.iconName = q.descriptionLocation !== "hidden" ? "icon-description-hide" : "icon-description-show";
      //         }
      //     }];
      // })





        
        // survey.onComplete.add((sender, options) => {
        //   console.log(sender.data)
        //   console.log(sender.data)
        //   localStorage.setItem('response', JSON.stringify(sender.data));
        //   // this.router.navigate(['/result'])
        //   window.location.href = '/index'
        // });
      // }
    // });
  }

  public goToCreatePage = () =>{
    window.location.href = '/create';
  }
}

