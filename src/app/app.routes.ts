import { Routes } from '@angular/router';
import { SurveyCreatorComponent } from './survey-creator/survey-creator.component';
import { FormLibraryComponent } from './form-library/form-library.component';
import { DetailsComponent } from './details/details.component';
import { ResultComponent } from './result/result.component';
export const routes: Routes = [
    {
        path: 'create',
        component: SurveyCreatorComponent
    },
    {
        path: 'index',
        component: FormLibraryComponent
    }, 
    {
        path:'details',
        component: DetailsComponent
    },
    {
        path:"result",
        component: ResultComponent
    }
];
