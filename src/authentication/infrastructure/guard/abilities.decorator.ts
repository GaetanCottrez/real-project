import { SetMetadata } from '@nestjs/common';

export const Abilities = (...abilities: string[]) => SetMetadata("abilities", abilities);
