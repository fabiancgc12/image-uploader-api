import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':path')
  get(@Param('path') path: string, @Res() res: Response) {
    res.sendFile(path, { root: './uploads' });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, callback) {
          const [name, ext] = file.originalname.split('.');
          const newName =
            name.split(' ').join('') + Date.now().toString() + '.' + ext;
          callback(null, newName);
        },
      }),
      fileFilter(
        req: Request,
        file: {
          mimetype: string;
        },
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        if (!file.mimetype.includes('image'))
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        return callback(null, true);
      },
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    return {
      path: file.filename,
      mimetype: file.mimetype,
    };
  }
}
