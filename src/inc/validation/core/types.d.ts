import Rule from "./classess/Role";

export type ErrorBag = {
  [lable: string]: string[];
};

export type Schema = {
  body?: {
    [lable: string]: string[];
  };
  prams?: {
    [lable: string]: string[];
  };
  query?: {
    [lable: string]: string[];
  };
};

export type RulesCointainer = {
  [lable: string]: typeof Rule;
};
