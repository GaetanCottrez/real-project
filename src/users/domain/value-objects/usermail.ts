import { DomainError } from '../../../shared/domain/domain-error';

export class UserMail {

    readonly MAIL_REGEX = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

    constructor(readonly value: string) {
        this.ensureValidFormat(value);
    }

    private ensureValidFormat(value: string) {
        if (!value.match(this.MAIL_REGEX)) {
            throw new DomainError(`${value} is not a valid email address!`);
        }
    }
}
