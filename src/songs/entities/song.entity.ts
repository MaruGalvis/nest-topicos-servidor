import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentSong = Song & Document;

@Schema()
export class Song {
    @Prop({ required: true })
    Nombre: string;

    @Prop({ required: true })
    Artista: string;

    @Prop({ required: true })
    Género: string;

    @Prop({ required: true, type: Number })
    Año_de_salida: number;

    @Prop({ required: true, type: Number })
    Reproducciones: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);
