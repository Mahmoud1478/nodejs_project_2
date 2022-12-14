import { Request, Response } from "express";
// import Rule from "./core/classess/Role";
import { ErrorBag, RulesCointainer } from "./core/types";
import container from "./RulesContainer";

class Validator {
    private container: RulesCointainer = container;
    private bag: ErrorBag = {};
    public constructor(private readonly request: Request, private readonly response: Response) {}

    // public async validate(schema: Schema): Promise<void> {
    //     Object.entries(schema).map((part) => {
    //         const location: string = part[0] as string;
    //         const prametars: object = part[1];
    //         Object.entries(prametars).map((part_) => {
    //             const lable: string = part_[0] as string;
    //             const rules = part_[1];
    //             rules.map((rule: string) => {
    //                 const value = (this.request as { [x: string]: string })[location][
    //                     lable as string
    //                 ] as string;
    //                 const ruleObjet = new this.container[rule](
    //                     this.request,
    //                     lable,
    //                     value
    //                 ) as InstanceType<Rule>;
    //             });
    //         });
    //     });
    // }

    public fails(): boolean {
        return !!this.bag;
    }

    public errors(): ErrorBag {
        return this.bag;
    }
}

export default Validator;
