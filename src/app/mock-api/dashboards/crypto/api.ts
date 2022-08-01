import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { SynveltMockApiService } from '@synvelt/lib/mock-api';
import { crypto as cryptoData } from 'app/mock-api/dashboards/crypto/data';

@Injectable({
    providedIn: 'root',
})
export class CryptoMockApi {
    private _crypto: any = cryptoData;

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
        // @ Crypto - GET
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onGet('api/dashboards/crypto')
            .reply(() => [200, cloneDeep(this._crypto)]);
    }
}
