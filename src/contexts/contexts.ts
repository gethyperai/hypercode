import { Hyper } from '../hyper';
import type { AllContexts } from './@types';

export class Contexts {
  constructor(private readonly hyper: Hyper) {}

  async list() {
    const res = await this.hyper.get<AllContexts>({
      endpoint: '/contexts',
    });

    return res;
  }
}
