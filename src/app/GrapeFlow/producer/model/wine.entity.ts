export class Wine {
  id: number;
  name: string;
  description: string;
  type: string;
  region: string;
  country: string;
  year: number;
  grapes: string[];
  alcoholContent: number;
  certification: string;
  rating: number;
  status: string;
  producerId: string;
  batchId: string;
  link: string;

  constructor(wine: {
    id?: number;
    name: string;
    description: string;
    type: string;
    region: string;
    country: string;
    year: number;
    grapes: string[];
    alcoholContent: number;
    certification: string;
    rating: number;
    status: string;
    producerId: string;
    batchId: string;
    link: string;
  }) {
    this.id = wine.id || 0; // Default value for id is 0
    this.name = wine.name;
    this.description = wine.description;
    this.type = wine.type;
    this.region = wine.region;
    this.country = wine.country;
    this.year = wine.year;
    this.grapes = wine.grapes;
    this.alcoholContent = wine.alcoholContent;
    this.certification = wine.certification;
    this.rating = wine.rating;
    this.status = wine.status;
    this.producerId = wine.producerId;
    this.batchId = wine.batchId;
    this.link = wine.link;
  }
}
