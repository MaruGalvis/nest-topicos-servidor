import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
    findAll(
      @Query('limit') limit: number = 5,
      @Query('offset') offset: number = 0,
    ) {
      return this.songsService.findAll(Number(limit), Number(offset));
}
}
