
import {emailMatcher} from "./email-matcher.validator";
describe('Email-Matcher', () => {

    let control: any;

    beforeEach(() => {
        control = {
            get(s: string): any {
                return null;
            }
        }
    });

    it('should return null if nothing found', () => {
        expect(emailMatcher(control)).toBe(null)
    });

});