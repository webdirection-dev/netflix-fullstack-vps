export interface IMovieInfo {
    _id: string;
    title: string;
    trailer: string;
    duration: string;
    limit: string;
    year: string;
    description: string;
    genre: string;
    img: string;
    imgTitle: string;
    imgSm: string;
    video: string;
    isSeries: boolean;
}

export interface IList {
    _id: string;
    content: string[];
    genre: string;
    title: string;
    type: string;
}
