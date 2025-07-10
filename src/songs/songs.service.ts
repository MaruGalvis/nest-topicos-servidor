import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { createWriteStream } from 'fs';
import { Model } from 'mongoose';
import { Song } from './entities/song.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SongsService {

  constructor(
    @InjectModel(Song.name)
    private readonly songModel: Model<Song>
  ) {}

  async create(createSongDto: CreateSongDto) {
    createSongDto.Nombre = createSongDto.Nombre.toLocaleLowerCase();

    const pokemon = await this.songModel.create(createSongDto);

    return Song
  }

  async findAll(limit = 5, offset = 0) {
    return await this.songModel.find()
      .skip(offset)
      .limit(limit);
}
}
