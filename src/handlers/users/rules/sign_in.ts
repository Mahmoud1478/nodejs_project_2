const signInRules = () => {
    const schema: { [x: string]: string } = {
        firstname: "required",
        password: "required",
    };
    return schema;
};
export default signInRules;
