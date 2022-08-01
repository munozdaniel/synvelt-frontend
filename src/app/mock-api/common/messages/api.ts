import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import {
    SynveltMockApiService,
    SynveltMockApiUtils,
} from '@synvelt/lib/mock-api';
import { messages as messagesData } from 'app/mock-api/common/messages/data';

@Injectable({
    providedIn: 'root',
})
export class MessagesMockApi {
    private _messages: any = messagesData;

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
        // @ Messages - GET
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onGet('api/common/messages')
            .reply(() => [200, cloneDeep(this._messages)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - POST
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onPost('api/common/messages')
            .reply(({ request }) => {
                // Get the message
                const newMessage = cloneDeep(request.body.message);

                // Generate a new GUID
                newMessage.id = SynveltMockApiUtils.guid();

                // Unshift the new message
                this._messages.unshift(newMessage);

                // Return the response
                return [200, newMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onPatch('api/common/messages')
            .reply(({ request }) => {
                // Get the id and message
                const id = request.body.id;
                const message = cloneDeep(request.body.message);

                // Prepare the updated message
                let updatedMessage = null;

                // Find the message and update it
                this._messages.forEach(
                    (item: any, index: number, messages: any[]) => {
                        if (item.id === id) {
                            // Update the message
                            messages[index] = assign(
                                {},
                                messages[index],
                                message
                            );

                            // Store the updated message
                            updatedMessage = messages[index];
                        }
                    }
                );

                // Return the response
                return [200, updatedMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onDelete('api/common/messages')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Prepare the deleted message
                let deletedMessage = null;

                // Find the message
                const index = this._messages.findIndex(
                    (item: any) => item.id === id
                );

                // Store the deleted message
                deletedMessage = cloneDeep(this._messages[index]);

                // Delete the message
                this._messages.splice(index, 1);

                // Return the response
                return [200, deletedMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Mark all as read - GET
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onGet('api/common/messages/mark-all-as-read')
            .reply(() => {
                // Go through all messages
                this._messages.forEach(
                    (item: any, index: number, messages: any[]) => {
                        // Mark it as read
                        messages[index].read = true;
                        messages[index].seen = true;
                    }
                );

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Toggle read status - POST
        // -----------------------------------------------------------------------------------------------------
        this._synveltMockApiService
            .onPost('api/common/messages/toggle-read-status')
            .reply(({ request }) => {
                // Get the message
                const message = cloneDeep(request.body.message);

                // Prepare the updated message
                let updatedMessage = null;

                // Find the message and update it
                this._messages.forEach(
                    (item: any, index: number, messages: any[]) => {
                        if (item.id === message.id) {
                            // Update the message
                            messages[index].read = message.read;

                            // Store the updated message
                            updatedMessage = messages[index];
                        }
                    }
                );

                // Return the response
                return [200, updatedMessage];
            });
    }
}
