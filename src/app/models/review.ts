export class Review {
    constructor(
        public id: string,
        public userId: string,
        public userFirstName: string,
        public userLastName: string,
        public albumId: string,
        public title: string,
        public reviewText: string,
       ) {}
}
