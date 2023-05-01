import { RuntimePipe } from "./runtime.pipe";

describe("RuntimePipe", () => {
    let pipe: RuntimePipe;

    beforeEach(() => {
        pipe = new RuntimePipe();
    });

    it("should create an instance", () => {
        expect(pipe).toBeTruthy();
    });

    it("should transform a valid number value to hours and minutes format", () => {
        expect(pipe.transform(120)).toEqual("2h 0m");
        expect(pipe.transform(90)).toEqual("1h 30m");
        expect(pipe.transform(30)).toEqual("0h 30m");
        expect(pipe.transform(0)).toEqual("0h 0m");
        expect(pipe.transform(1439)).toEqual("23h 59m");
    });
});
