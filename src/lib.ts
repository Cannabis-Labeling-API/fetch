export const parsePathComponents = (path: string, pathDefinition: string) => {
    const keys = pathDefinition.split('/');
    const values = path.split('/');

    if (keys.length != values.length) {
        throw new Error("path and definition mismatch")
    }

    const variables = {};
    for (let i = 1; i < keys.length; i++) {
        let key = keys[i];
        let foundKey = false;
        if (key.indexOf('{') !== -1) {
            key = key.split('{')[1];
            key = key.split('}')[0];
            foundKey = true;
        }
        if (key.indexOf(':') !== -1) {
            key = key.split(':')[1];
            foundKey = true;
        }
        if (foundKey) {
            variables[key] = values[i];
        }
    }

    // console.log("Vars from", path, pathDefinition, variables)
    return variables;
}

export const applyPathComponents = (path: string, variables: any) => {
    const pathComponents = path.split('/');
    if (pathComponents.length != pathComponents.length) {
        throw new Error("path and definition mismatch")
    }
    for (let i = 1; i < pathComponents.length; i++) {
        let key = pathComponents[i];
        let foundKey = false;
        if (key.indexOf('{') !== -1) {
            key = key.split('{')[1];
            key = key.split('}')[0];
            foundKey = true;
        }
        if (key.indexOf(':') !== -1) {
            key = key.split(':')[1];
            foundKey = true;
        }
        if (foundKey) {
            // console.log("foundKey", key)
            if (variables[key] !== undefined) {
                pathComponents[i] = variables[key];
            }
        }
    }

    // console.log("Vars to", variables, path, pathComponents.join('/'));

    return pathComponents.join('/');
}