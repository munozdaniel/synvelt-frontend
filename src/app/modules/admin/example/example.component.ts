import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from 'app/core/user/user.service';
import { IUsuario } from 'app/models/iUsuario';
@UntilDestroy()
@Component({
  selector: 'example',
  templateUrl: './example.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit {
  user: IUsuario;
  /**
   * Constructor
   */
  constructor(private _userService: UserService, private _router: Router) {}
  ngOnInit(): void {
    this._userService.user$
      .pipe(untilDestroyed(this))
      .subscribe((user: IUsuario) => {
        this.user = user;
      });
  }
  redireccionar(url: string) {
    this._router.navigate([url]);
  }
}
