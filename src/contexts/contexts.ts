import { Hyper } from '../hyper';
import type { AllContexts } from './@types';

export class Contexts {
  constructor(private readonly hyper: Hyper) {}

  /**
   * Get all of the available contexts. More information: https://docs.gethyper.ai/context#get-v1-contexts
   * @returns All of the available contexts in the Hyper app (https://app.gethyper.ai)
   * @example
   * const { data, error } = await hyper.contexts.all();
   * console.log(data);
   */
  async all() {
    const res = await this.hyper.get<AllContexts>({
      endpoint: '/contexts',
    });

    return res;
  }
}
