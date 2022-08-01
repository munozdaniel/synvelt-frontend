import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { SynveltMockApiService } from '@synvelt/lib/mock-api';
import { user as userData } from 'app/mock-api/common/user/data';

@Injectable({
    providedIn: 'root',
})
export class UserMockApi {
    private _user: any = userData;

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
        // @ User - GET
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onGet('api/common/user')
            .reply(() => [200, cloneDeep(this._user)]);

        // -----------------------------------------------------------------------------------------------------
        // @ User - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onPatch('api/common/user')
            .reply(({ request }) => {
                // Get the user mock-api
                const user = cloneDeep(request.body.user);

                // Update the user mock-api
                this._user = assign({}, this._user, user);

                // Return the response
                return [200, cloneDeep(this._user)];
            });
    }
}
