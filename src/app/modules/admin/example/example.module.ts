import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';

const exampleRoutes: Route[] = [
  {
    path: '',
    component: ExampleComponent,
  },
];

@NgModule({
  declarations: [ExampleComponent],
  imports: [RouterModule.forChild(exampleRoutes), MatCardModule],
})
export class ExampleModule {}
