export class Event {
    _id: string;
    title: string;
    date: Date;
    description: string;
    location: string;
    targetGroupMin: Number;
    targetGroupMax: Number;
    externLink: string;
    imageId: string;
    status: string;
    eventContact: { name: string, email: string, phone: string };
    __v: string;

  }