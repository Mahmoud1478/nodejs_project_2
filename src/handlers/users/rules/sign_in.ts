const signInRules = () => {
    const schema: Record<string, string> = {
        firstname: "required",
        password: "required",
    };
    return schema;
};
export default signInRules;
