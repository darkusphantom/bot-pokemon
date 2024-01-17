import { translate } from "../config";

const errorHandlerMessage = (error: any, text: string) => {
    if (error instanceof Error) {
        console.error(error.name, error.message);
        if (error.name === "TypeError") {
            return translate(text)
        }

        if (error.name === "Error") {
            translate("error.default");
        }
    }

    return translate("error.default");
}

export {
    errorHandlerMessage
}