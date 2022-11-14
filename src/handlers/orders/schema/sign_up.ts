const signUpRules = (): { [x: string]: string } => {
    const schema: { [x: string]: string } = {
        firstname: "required:unique:users,firstname",
        lastname: "required",
        password: "required",
    };
    return schema;
};
export default signUpRules;
