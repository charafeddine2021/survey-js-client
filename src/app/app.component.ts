import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SurveyCreatorModule } from 'survey-creator-angular';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SurveyCreatorModule ],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
