import { IsOptional } from 'class-validator';

export class QueryUserParamsDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  search?: number;
}
