import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class OrthographyDto {
  @IsString()
  readonly prompt: string;

  @IsInt()
  //@Type(() => Number)
  @IsOptional()
  readonly maxTokens?: number;
}
