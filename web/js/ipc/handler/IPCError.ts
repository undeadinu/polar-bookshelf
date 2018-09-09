/**
 * Represents the fact that an IPC error failed.
 */
import {Preconditions} from '../../Preconditions';

export class IPCError {

    public readonly message: string;

    private constructor(message: string) {
        Preconditions.assertString(message, 'msg');
        this.message = message;
    }

    public static create(err: Error | string): IPCError {

        if (err instanceof Error) {
            return new IPCError(err.message);
        }

        return new IPCError(err);

    }

}
