export class Wine {
  id: number;
  name: string;
  description: string;
  type: string;
  region: string;
  country: string;
  year: number;
  grapes: string;
  alcohol: number;
  certification: string;
  rating: number;
  state: string;
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
    grapes: string;
    alcohol: number;
    certification: string;
    rating?: number;
    state: string;
    producerId: string;
    batchId: string;
    link: string;
  }) {
    this.id = wine.id || 0;
    this.name = wine.name;
    this.description = wine.description;
    this.type = wine.type;
    this.region = wine.region;
    this.country = wine.country;
    this.year = wine.year;
    this.grapes = wine.grapes;
    this.alcohol = wine.alcohol;
    this.certification = wine.certification;
    this.rating = wine.rating ?? 0;
    this.state = wine.state;
    this.producerId = wine.producerId;
    this.batchId = wine.batchId;

    // Validación simple para asegurarse de que link sea una URL de imagen
    if (!Wine.isValidImageUrl(wine.link)) {  // Método estático
      throw new Error('Link must be a valid image URL');
    }

    this.link = wine.link;
  }

  // Método estático para validar si la URL es una imagen
  static isValidImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }
}
