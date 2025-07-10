import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateSongDto {
    @IsString()
    Nombre: string;

    @IsString()
    Artista: string;

    @IsString()
    Género: string;

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear() + 1) 
    Año_de_salida: number;

    @IsInt()
    @Min(0)
    Reproducciones: number;
}
