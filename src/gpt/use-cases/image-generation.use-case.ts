import * as fs from 'fs';
import * as path from 'path';
import OpenAI from "openai";
import { downloadBase64ImageAsPng, downloadImageAsPng } from "src/helpers";

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options;

    console.log({ prompt, originalImage, maskImage });

    // TODO: Verificar original image
    if (!originalImage || !maskImage) {

        const response = await openai.images.generate({
            prompt: prompt,
            model: 'dall-e-2',
            n: 1,
            size: '1024x1024',
            response_format: 'url'
        });

        // TODO: Guardar imagen en FileSystem
        const fileName = await downloadImageAsPng(response.data[0].url);
        const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;
        return {
            url: url, // TODO: http://localhost:3000/
            openAIUrl: response.data[0].url,
            revised_prompt: response.data[0].revised_prompt
        }
    }

    const pngImagenPath = await downloadImageAsPng(originalImage, true);
    const maskPath = await downloadBase64ImageAsPng(maskImage, true);
    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt: prompt,
        image: fs.createReadStream(pngImagenPath),
        mask: fs.createReadStream(maskPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    });

    /* const localImagePath = await downloadImageAsPng(response.data[0].url);
    const fileName = path.basename(localImagePath);
    const publicUrl = `http://localhost:3000/${fileName}`; */
    const fileName = await downloadImageAsPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
        url: url, // TODO: http://localhost:3000/
        openAIUrl: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
    }
}