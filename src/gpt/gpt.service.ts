import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

// OPENAI
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Solo llamar casos de uso
  async orthograpthyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai,{
      prompt: orthographyDto.prompt,
    });
  }
}
