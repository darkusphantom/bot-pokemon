import { Session } from "./session.interface";

export interface CustomContext {
    message: Message
    replyWithPhoto: (arg0: string, arg1: { caption: string; })
        => any; reply: (arg0: any) => any;
    match: any[]
    session: Session
}

export interface Message {
    text: string;
};
