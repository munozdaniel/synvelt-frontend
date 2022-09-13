import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  constructor(private _userService: UserService) {}
  ngOnInit(): void {
    this._userService.user$
      .pipe(untilDestroyed(this))
      .subscribe((user: IUsuario) => {
        this.user = user;
      });
  }
}
