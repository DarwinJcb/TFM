/* src/matches/dto/update-match.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchDto } from './create-match.dto.js';

export class UpdateMatchDto extends PartialType(CreateMatchDto) { }