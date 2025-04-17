export class Note {
    id: number;
    title: string;
    content: string;
    color: string;

    constructor(id: number, title: string, content: string, color: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
    }

    // Méthode "intelligente"
    isEmpty(): boolean {
        return this.title.trim() === '' && this.content.trim() === '';
    }
}
