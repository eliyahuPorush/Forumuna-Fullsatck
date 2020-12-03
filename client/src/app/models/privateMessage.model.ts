export class PrivateMessage{
    constructor(
        public idSender: number,
        public idReceiver: number, 
        public content: string
    ){}
}