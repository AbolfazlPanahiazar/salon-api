import { instanceToPlain } from 'class-transformer';

type ObjOrArray<T> = T extends Array<infer U> ? U[] : T;

export function serialize<X extends ObjOrArray<any>>(obj: X): X {
  return instanceToPlain(obj) as X;
}
