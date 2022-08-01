import { Injectable } from '@angular/core';
import { SynveltDrawerComponent } from '@synvelt/components/drawer/drawer.component';

@Injectable({
    providedIn: 'root',
})
export class SynveltDrawerService {
    private _componentRegistry: Map<string, SynveltDrawerComponent> = new Map<
        string,
        SynveltDrawerComponent
    >();

    /**
     * Constructor
     */
    constructor() {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: SynveltDrawerComponent): void {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): SynveltDrawerComponent | undefined {
        return this._componentRegistry.get(name);
    }
}
