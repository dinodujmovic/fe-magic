import { Subscription } from "rxjs";

import { ManualSubs } from "./manual-subs";

describe("ManualSubs", () => {
    let manualSubs: ManualSubs;
    let sub1: Subscription;
    let sub2: Subscription;

    beforeEach(() => {
        manualSubs = new ManualSubs();
        sub1 = jasmine.createSpyObj("Subscription", ["unsubscribe"]);
        sub2 = jasmine.createSpyObj("Subscription", ["unsubscribe"]);
    });

    it("should unsubscribe from all subscriptions", () => {
        manualSubs.add = sub1;
        manualSubs.add = sub2;
        manualSubs.unsubscribe();
        expect(sub1.unsubscribe).toHaveBeenCalledTimes(1);
        expect(sub2.unsubscribe).toHaveBeenCalledTimes(1);
    });
});
