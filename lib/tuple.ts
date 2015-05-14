/**
 * A generic Tuple type.
 * 
 * @module tuple
 */
 
'use strict';

export default Tuple;

interface Tuple<A, B> {
  fst: A;
  snd: B;
}

module Tuple {
  export function of<A, B>(a: A, b: B): Tuple<A, B> {
    return {fst: a, snd: b};
  }
  
  /** 
   * Converts a binary function to one which accepts a single Tuple argument.
   */
  export function tuple<A,B,R>(fn: (a: A, b: B) => R): (tuple: Tuple<A, B>) => R {
    return function tupled(tuple: Tuple<A, B>): R {
      return fn(tuple.fst, tuple.snd);
    }
  }
  
  /**
   * Converts a function on Tuples into a curried form where the two arguments
   * are passed in stages instead of at once. 
   */
   export function curryTuple<A,B,R>(fn: (tuple: Tuple<A,B>) => R): (fst: A) => (snd: B) => R {
     return function step1(fst: A) {
       return function step2(snd: B) {
         return fn({fst, snd});
       };
     };
   }
   
   /**
    * Another version of curryTuple adapted for operating on the more common
    * binary function signature. Identical to the composition of tuple and curryTuple.
    */
   export function curry<A,B,R>(fn: (a: A, b: B) => R): (fst: A) => (snd: B) => R {
     return function step1(fst: A) {
       return function step2(snd: B) {
         return fn(fst, snd);
       };
     };
   }
}