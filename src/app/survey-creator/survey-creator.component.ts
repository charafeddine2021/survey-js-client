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
const defaultJson = {
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "panel",
          "name": "panel5",
          "elements": [
            {
              "type": "expression",
              "name": "question19",
              "title": "E-COMMERCE PRIORITY, POSITIONING AND IMPORTANCE"
            },
            {
              "type": "slider",
              "name": "question18",
              "title": "completion",
              "setValueExpression": "{question3}+{question4}",
              "defaultValueExpression": "question3 + question4",
              "readOnly": true,
              "minRangeLength": -1,
              "labelFormat": "{0}%",
              "allowSwap": false
            }
          ]
        },
        {
          "type": "panel",
          "name": "panel1",
          "title": "E-Commerce prioritization and resource (headcount and budget) allocation",
          "elements": [
            {
              "type": "html",
              "name": "question2",
              "minWidth": "400px",
              "html": "<table><tbody><tr height=\"105\"><td height=\"105\" class=\"xl70\" width=\"177\"><font face=\"Arial\" size=\"3\" color=\"#4a90e2\">Level 1<br>Beginner</font></td><td class=\"xl70\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl71\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 2<br>Intermediate</font></td><td class=\"xl71\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl72\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 3<br>Expert</font></td><td class=\"xl72\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl73\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 4<br>Industry Leader</font></td><td class=\"xl73\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl74\" width=\"177\"><font face=\"Arial\" size=\"3\" color=\"#4a90e2\"><br><br></font></td></tr><tr height=\"97\"><td height=\"97\" class=\"xl69\" width=\"177 \" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is prioritized and resourced against, based on current size vs the potential it can bring.</font><br></td><td class=\"xl75\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is declared as a priority channel, but the resourcing (headcount and/or budget) is not in line with this yet today.</font><br></td><td class=\"xl67\" width=\"16\" valign=\"top\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">We are increasingly resourcing behind e-commerce based on future sales potential vs current size.</font></td><td class=\"xl67\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is a high priority from the top down. We resource ahead of the current Net Sales size, as we see the strategic role it plays in future proofing our business and reaching our consumers.</font></td><td class=\"xl76\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl68\" width=\"177\" valign=\"top\"><br></td></tr></tbody></table>"
            },
            {
              "type": "rating",
              "name": "question3",
              "startWithNewLine": false,
              "indent": 3,
              "title": "ASSESSMENT TODAY",
              "rateType": "stars",
              "rateMin": 10,
              "rateMax": 50,
              "rateStep": 10
            },
            {
              "type": "boolean",
              "name": "question17",
              "minWidth": "50px",
              "maxWidth": "50px",
              "startWithNewLine": false,
              "title": " ",
              "description": "N/A",
              "renderAs": "checkbox"
            },
            {
              "type": "rating",
              "name": "question4",
              "startWithNewLine": false,
              "indent": 3,
              "title": "TARGET(Y+1)",
              "rateType": "stars",
              "rateMin": 10,
              "rateMax": 50,
              "rateStep": 10
            },
            {
              "type": "boolean",
              "name": "question5",
              "minWidth": "50px",
              "maxWidth": "150px",
              "startWithNewLine": false,
              "title": "BUSINESS PRIORITIES",
              "description": "",
              "renderAs": "checkbox"
            }
          ]
        },
        {
          "type": "panel",
          "name": "panel2",
          "title": "Positioning of e-commerce as a key driver of brand-building & digitally influenced sales",
          "elements": [
            {
              "type": "html",
              "name": "question1",
              "minWidth": "400px",
              "html": "<table><tbody><tr height=\"105\"><td height=\"105\" class=\"xl70\" width=\"177\"><font face=\"Arial\" size=\"3\" color=\"#4a90e2\">Level 1<br>Beginner</font></td><td class=\"xl70\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl71\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 2<br>Intermediate</font></td><td class=\"xl71\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl72\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 3<br>Expert</font></td><td class=\"xl72\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl73\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 4<br>Industry Leader</font></td><td class=\"xl73\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl74\" width=\"177\"><font face=\"Arial\" size=\"3\" color=\"#4a90e2\"><br><br></font></td></tr><tr height=\"97\"><td height=\"97\" class=\"xl69\" width=\"177 \" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is prioritized and resourced against, based on current size vs the potential it can bring.</font><br></td><td class=\"xl75\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is declared as a priority channel, but the resourcing (headcount and/or budget) is not in line with this yet today.</font><br></td><td class=\"xl67\" width=\"16\" valign=\"top\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">We are increasingly resourcing behind e-commerce based on future sales potential vs current size.</font></td><td class=\"xl67\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is a high priority from the top down. We resource ahead of the current Net Sales size, as we see the strategic role it plays in future proofing our business and reaching our consumers.</font></td><td class=\"xl76\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl68\" width=\"177\" valign=\"top\"><br></td></tr></tbody></table>"
            },
            {
              "type": "rating",
              "name": "question6",
              "startWithNewLine": false,
              "indent": 3,
              "title": "ASSESSMENT TODAY",
              "rateType": "stars",
              "rateMin": 10,
              "rateMax": 50,
              "rateStep": 10
            },
            {
              "type": "boolean",
              "name": "question7",
              "minWidth": "50px",
              "maxWidth": "50px",
              "startWithNewLine": false,
              "title": " ",
              "description": "N/A",
              "renderAs": "checkbox"
            },
            {
              "type": "rating",
              "name": "question8",
              "startWithNewLine": false,
              "indent": 3,
              "title": "TARGET(Y+1)",
              "rateType": "stars",
              "rateMin": 10,
              "rateMax": 50,
              "rateStep": 10
            },
            {
              "type": "boolean",
              "name": "question9",
              "minWidth": "50px",
              "maxWidth": "150px",
              "startWithNewLine": false,
              "title": "BUSINESS PRIORITIES",
              "description": "",
              "renderAs": "checkbox"
            }
          ]
        },
        {
          "type": "panel",
          "name": "panel3",
          "title": "Long term e-Commerce strategy with clear growth drivers and size of the prize",
          "elements": [
            {
              "type": "html",
              "name": "question10",
              "minWidth": "400px",
              "html": "<table><tbody><tr height=\"105\"><td height=\"105\" class=\"xl70\" width=\"177\"><font face=\"Arial\" size=\"3\" color=\"#4a90e2\">Level 1<br>Beginner</font></td><td class=\"xl70\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl71\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 2<br>Intermediate</font></td><td class=\"xl71\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl72\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 3<br>Expert</font></td><td class=\"xl72\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl73\" width=\"177\"><font color=\"#4a90e2\" face=\"Arial\" size=\"3\">Level 4<br>Industry Leader</font></td><td class=\"xl73\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl74\" width=\"177\"><font face=\"Arial\" size=\"3\" color=\"#4a90e2\"><br><br></font></td></tr><tr height=\"97\"><td height=\"97\" class=\"xl69\" width=\"177 \" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is prioritized and resourced against, based on current size vs the potential it can bring.</font><br></td><td class=\"xl75\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is declared as a priority channel, but the resourcing (headcount and/or budget) is not in line with this yet today.</font><br></td><td class=\"xl67\" width=\"16\" valign=\"top\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">We are increasingly resourcing behind e-commerce based on future sales potential vs current size.</font></td><td class=\"xl67\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl67\" width=\"177\" valign=\"top\"><font face=\"Arial\" size=\"2\">E-commerce is a high priority from the top down. We resource ahead of the current Net Sales size, as we see the strategic role it plays in future proofing our business and reaching our consumers.</font></td><td class=\"xl76\" width=\"16\"><font size=\"2\" face=\"Arial\">&nbsp;</font></td><td class=\"xl68\" width=\"177\" valign=\"top\"><br></td></tr></tbody></table>"
            },
            {
              "type": "rating",
              "name": "question11",
              "startWithNewLine": false,
              "indent": 3,
              "title": "ASSESSMENT TODAY",
              "rateType": "stars",
              "rateMin": 10,
              "rateMax": 50,
              "rateStep": 10
            },
            {
              "type": "boolean",
              "name": "question12",
              "minWidth": "50px",
              "maxWidth": "50px",
              "startWithNewLine": false,
              "title": " ",
              "description": "N/A",
              "renderAs": "checkbox"
            },
            {
              "type": "rating",
              "name": "question13",
              "startWithNewLine": false,
              "indent": 3,
              "title": "TARGET(Y+1)",
              "rateType": "stars",
              "rateMin": 10,
              "rateMax": 50,
              "rateStep": 10
            },
            {
              "type": "boolean",
              "name": "question14",
              "minWidth": "50px",
              "maxWidth": "150px",
              "startWithNewLine": false,
              "title": "BUSINESS PRIORITIES",
              "description": "",
              "renderAs": "checkbox"
            }
          ]
        }
      ]
    }
  ],
  "headerView": "advanced"
}

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
        // localStorage.setItem('form', JSON.stringify(this.creator.JSON))
        const json = this.creator.JSON;
        const year = this.selectedOption
        const body = {
          _id: this._id || null,
          year,
          version: 1,
          label: `Formulaire ${this.selectedOption} - V1`,
          json : json || {},
        }
        localStorage.setItem(`survey-${year}`, JSON.stringify(json))
        window.location.href = '/index';
        // this.http.post<any>(`${path}/${this.action}`, body).subscribe({
        //   next: res => {
        //     console.log(res)
        //     window.location.href = '/index';
        //   }, error: err => {
        //     console.error(err)
        //   }
        // })
      }
    });
  }


  ngOnInit(): void {
    localStorage.setItem('year', this.selectedOption)
    this.getFormByYear(this.selectedOption);
  }

  public onChangeDate = () =>{
    localStorage.setItem('year', this.selectedOption)
    this.getFormByYear(this.selectedOption);
  }

  private getFormByYear = (year: string) =>{
    this.isLoading = true;
    // this.http.get<any>(`http://localhost:3000/?year=${year}`).pipe(first(), finalize(() => this.isLoading = false)).subscribe({
    //   next: res => {
    //     console.log(res)
    //     this.action = res.action;
    //     console.log(this.action)
    //     this._id = res?.json?._id;
    //     this.creator.JSON = res?.json?.json || {};
    //   }
    // })
    // const year = localStorage.getItem('year');
    const lastJsonByYear = localStorage.getItem(`survey-${year}`);
    this.creator.JSON = lastJsonByYear ? JSON.parse(lastJsonByYear) : defaultJson;
    this.isLoading = false
  }
}
