interface IMailProvider {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void>;
}

export { IMailProvider };
