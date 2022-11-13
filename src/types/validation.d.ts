export type ValidatorPrem = {
  [key: string]: string[];
};
export type ValidationResult = {
  value: boolean;
  msg: string;
};
export type RulesObject = {
  [key: string]: CallableFunction;
};
