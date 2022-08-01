import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SynveltVerticalNavigationComponent } from '@synvelt/components/navigation/vertical/vertical.component';
import { SynveltNavigationService } from '@synvelt/components/navigation/navigation.service';
import { SynveltNavigationItem } from '@synvelt/components/navigation/navigation.types';

@Component({
    selector: 'synvelt-vertical-navigation-divider-item',
    templateUrl: './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynveltVerticalNavigationDividerItemComponent
    implements OnInit, OnDestroy
{
    @Input() item: SynveltNavigationItem;
    @Input() name: string;

    private _synveltVerticalNavigationComponent: SynveltVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _synveltNavigationService: SynveltNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._synveltVerticalNavigationComponent =
            this._synveltNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._synveltVerticalNavigationComponent.onRefreshed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
