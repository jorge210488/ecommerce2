import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/AuthGuard";

@Controller()
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @UseGuards(AuthGuard)
    @Post("/files/uploadImage/:id")
    @UseInterceptors(FileInterceptor("image"))
    async uploadImg(
        @Param("id", new ParseUUIDPipe()) id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                        message: "El archivo debe ser menor a 100kb",
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    }),
                ],
            }),
        ) file: Express.Multer.File  
    ) {
        return this.cloudinaryService.uploadImage(id, file); 
    }
}
