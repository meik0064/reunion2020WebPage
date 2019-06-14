export class ReviewEvent {
    _id: string;
    title: string;
    date: string;
    description: string;
    location: string;
    targetGroupMin: Number;
    targetGroupMax: Number;
    externLink: string;
    imageId: string;
    eventContact: { name: string, email: string, phone: string };
    __v: string;

  }