import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { SynveltMockApiService } from '@synvelt/lib/mock-api';
import { activities as activitiesData } from 'app/mock-api/pages/activities/data';

@Injectable({
    providedIn: 'root',
})
export class ActivitiesMockApi {
    private _activities: any = activitiesData;

    /**
     * Constructor
     */
    constructor(private _synveltMockApiService: SynveltMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Activities - GET
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onGet('api/pages/activities')
            .reply(() => [200, cloneDeep(this._activities)]);
    }
}
