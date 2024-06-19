export type TMessage = {
    parts: {text: string, prompt?: string}[];
    role: string;
};