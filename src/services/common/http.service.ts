/* eslint-disable @typescript-eslint/no-explicit-any */
import { MusicService } from '../admin/music';
import { MovieService } from '../admin/movie';
import { PartnerService } from '../admin/partner';
import { TrombinoscopeService } from '../admin/trombinoscope';

type HttpOperation = 'update' | 'delete';

export type HttpServiceType =
  | typeof MusicService
  | typeof MovieService
  | typeof PartnerService
  | typeof TrombinoscopeService;

export const serviceOperation = async <T extends HttpServiceType>(
  service: T,
  operation: HttpOperation,
  id: number,
  data?: any
): Promise<any> => {
  if (operation === 'update') {
    return await service.update(id, data);
  } else if (operation === 'delete') {
    return await service.delete(id);
  }
};
