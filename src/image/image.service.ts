import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImageService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }
}
