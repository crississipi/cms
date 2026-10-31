
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model OrderSync
 * Durable record of a unique order. Stores the minimum validated order data
 * needed to retry sync without requiring the sender to resend the webhook.
 */
export type OrderSync = $Result.DefaultSelection<Prisma.$OrderSyncPayload>
/**
 * Model SyncAttempt
 * Immutable record of a single sync/retry attempt against HubSpot.
 * One OrderSync can have many SyncAttempts. Never duplicates the full
 * order payload — references the parent OrderSync for retry data.
 */
export type SyncAttempt = $Result.DefaultSelection<Prisma.$SyncAttemptPayload>
/**
 * Model SyncJob
 * Durable job record used by the background worker to process syncs.
 */
export type SyncJob = $Result.DefaultSelection<Prisma.$SyncJobPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SyncStatus: {
  RECEIVED: 'RECEIVED',
  PROCESSING: 'PROCESSING',
  SYNCED: 'SYNCED',
  FAILED: 'FAILED'
};

export type SyncStatus = (typeof SyncStatus)[keyof typeof SyncStatus]


export const JobStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

}

export type SyncStatus = $Enums.SyncStatus

export const SyncStatus: typeof $Enums.SyncStatus

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more OrderSyncs
 * const orderSyncs = await prisma.orderSync.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more OrderSyncs
   * const orderSyncs = await prisma.orderSync.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.orderSync`: Exposes CRUD operations for the **OrderSync** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderSyncs
    * const orderSyncs = await prisma.orderSync.findMany()
    * ```
    */
  get orderSync(): Prisma.OrderSyncDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncAttempt`: Exposes CRUD operations for the **SyncAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncAttempts
    * const syncAttempts = await prisma.syncAttempt.findMany()
    * ```
    */
  get syncAttempt(): Prisma.SyncAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncJob`: Exposes CRUD operations for the **SyncJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncJobs
    * const syncJobs = await prisma.syncJob.findMany()
    * ```
    */
  get syncJob(): Prisma.SyncJobDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.1
   * Query Engine version: d1b3f377ca835d73fd50954a5e22128b9ebdd6b8
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    OrderSync: 'OrderSync',
    SyncAttempt: 'SyncAttempt',
    SyncJob: 'SyncJob'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "orderSync" | "syncAttempt" | "syncJob"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      OrderSync: {
        payload: Prisma.$OrderSyncPayload<ExtArgs>
        fields: Prisma.OrderSyncFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderSyncFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderSyncFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>
          }
          findFirst: {
            args: Prisma.OrderSyncFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderSyncFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>
          }
          findMany: {
            args: Prisma.OrderSyncFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>[]
          }
          create: {
            args: Prisma.OrderSyncCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>
          }
          createMany: {
            args: Prisma.OrderSyncCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderSyncCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>[]
          }
          delete: {
            args: Prisma.OrderSyncDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>
          }
          update: {
            args: Prisma.OrderSyncUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>
          }
          deleteMany: {
            args: Prisma.OrderSyncDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderSyncUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderSyncUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>[]
          }
          upsert: {
            args: Prisma.OrderSyncUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncPayload>
          }
          aggregate: {
            args: Prisma.OrderSyncAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderSync>
          }
          groupBy: {
            args: Prisma.OrderSyncGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderSyncGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderSyncCountArgs<ExtArgs>
            result: $Utils.Optional<OrderSyncCountAggregateOutputType> | number
          }
        }
      }
      SyncAttempt: {
        payload: Prisma.$SyncAttemptPayload<ExtArgs>
        fields: Prisma.SyncAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>
          }
          findFirst: {
            args: Prisma.SyncAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>
          }
          findMany: {
            args: Prisma.SyncAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>[]
          }
          create: {
            args: Prisma.SyncAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>
          }
          createMany: {
            args: Prisma.SyncAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>[]
          }
          delete: {
            args: Prisma.SyncAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>
          }
          update: {
            args: Prisma.SyncAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>
          }
          deleteMany: {
            args: Prisma.SyncAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>[]
          }
          upsert: {
            args: Prisma.SyncAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncAttemptPayload>
          }
          aggregate: {
            args: Prisma.SyncAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncAttempt>
          }
          groupBy: {
            args: Prisma.SyncAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<SyncAttemptCountAggregateOutputType> | number
          }
        }
      }
      SyncJob: {
        payload: Prisma.$SyncJobPayload<ExtArgs>
        fields: Prisma.SyncJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>
          }
          findFirst: {
            args: Prisma.SyncJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>
          }
          findMany: {
            args: Prisma.SyncJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>[]
          }
          create: {
            args: Prisma.SyncJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>
          }
          createMany: {
            args: Prisma.SyncJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>[]
          }
          delete: {
            args: Prisma.SyncJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>
          }
          update: {
            args: Prisma.SyncJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>
          }
          deleteMany: {
            args: Prisma.SyncJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>[]
          }
          upsert: {
            args: Prisma.SyncJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncJobPayload>
          }
          aggregate: {
            args: Prisma.SyncJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncJob>
          }
          groupBy: {
            args: Prisma.SyncJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncJobCountArgs<ExtArgs>
            result: $Utils.Optional<SyncJobCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    orderSync?: OrderSyncOmit
    syncAttempt?: SyncAttemptOmit
    syncJob?: SyncJobOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrderSyncCountOutputType
   */

  export type OrderSyncCountOutputType = {
    attempts: number
    jobs: number
  }

  export type OrderSyncCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | OrderSyncCountOutputTypeCountAttemptsArgs
    jobs?: boolean | OrderSyncCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * OrderSyncCountOutputType without action
   */
  export type OrderSyncCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncCountOutputType
     */
    select?: OrderSyncCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderSyncCountOutputType without action
   */
  export type OrderSyncCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncAttemptWhereInput
  }

  /**
   * OrderSyncCountOutputType without action
   */
  export type OrderSyncCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncJobWhereInput
  }


  /**
   * Models
   */

  /**
   * Model OrderSync
   */

  export type AggregateOrderSync = {
    _count: OrderSyncCountAggregateOutputType | null
    _min: OrderSyncMinAggregateOutputType | null
    _max: OrderSyncMaxAggregateOutputType | null
  }

  export type OrderSyncMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.SyncStatus | null
    hubspotContactId: string | null
    hubspotDealId: string | null
    claimedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
  }

  export type OrderSyncMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.SyncStatus | null
    hubspotContactId: string | null
    hubspotDealId: string | null
    claimedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
  }

  export type OrderSyncCountAggregateOutputType = {
    id: number
    orderId: number
    orderData: number
    status: number
    hubspotContactId: number
    hubspotDealId: number
    claimedUntil: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    _all: number
  }


  export type OrderSyncMinAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    hubspotContactId?: true
    hubspotDealId?: true
    claimedUntil?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
  }

  export type OrderSyncMaxAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    hubspotContactId?: true
    hubspotDealId?: true
    claimedUntil?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
  }

  export type OrderSyncCountAggregateInputType = {
    id?: true
    orderId?: true
    orderData?: true
    status?: true
    hubspotContactId?: true
    hubspotDealId?: true
    claimedUntil?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    _all?: true
  }

  export type OrderSyncAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderSync to aggregate.
     */
    where?: OrderSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncs to fetch.
     */
    orderBy?: OrderSyncOrderByWithRelationInput | OrderSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderSyncs
    **/
    _count?: true | OrderSyncCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderSyncMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderSyncMaxAggregateInputType
  }

  export type GetOrderSyncAggregateType<T extends OrderSyncAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderSync]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderSync[P]>
      : GetScalarType<T[P], AggregateOrderSync[P]>
  }




  export type OrderSyncGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderSyncWhereInput
    orderBy?: OrderSyncOrderByWithAggregationInput | OrderSyncOrderByWithAggregationInput[]
    by: OrderSyncScalarFieldEnum[] | OrderSyncScalarFieldEnum
    having?: OrderSyncScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderSyncCountAggregateInputType | true
    _min?: OrderSyncMinAggregateInputType
    _max?: OrderSyncMaxAggregateInputType
  }

  export type OrderSyncGroupByOutputType = {
    id: string
    orderId: string
    orderData: JsonValue
    status: $Enums.SyncStatus
    hubspotContactId: string | null
    hubspotDealId: string | null
    claimedUntil: Date | null
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    _count: OrderSyncCountAggregateOutputType | null
    _min: OrderSyncMinAggregateOutputType | null
    _max: OrderSyncMaxAggregateOutputType | null
  }

  type GetOrderSyncGroupByPayload<T extends OrderSyncGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderSyncGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderSyncGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderSyncGroupByOutputType[P]>
            : GetScalarType<T[P], OrderSyncGroupByOutputType[P]>
        }
      >
    >


  export type OrderSyncSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    orderData?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    claimedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    attempts?: boolean | OrderSync$attemptsArgs<ExtArgs>
    jobs?: boolean | OrderSync$jobsArgs<ExtArgs>
    _count?: boolean | OrderSyncCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderSync"]>

  export type OrderSyncSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    orderData?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    claimedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["orderSync"]>

  export type OrderSyncSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    orderData?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    claimedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["orderSync"]>

  export type OrderSyncSelectScalar = {
    id?: boolean
    orderId?: boolean
    orderData?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    claimedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }

  export type OrderSyncOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "orderData" | "status" | "hubspotContactId" | "hubspotDealId" | "claimedUntil" | "createdAt" | "updatedAt" | "syncedAt", ExtArgs["result"]["orderSync"]>
  export type OrderSyncInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | OrderSync$attemptsArgs<ExtArgs>
    jobs?: boolean | OrderSync$jobsArgs<ExtArgs>
    _count?: boolean | OrderSyncCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderSyncIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrderSyncIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrderSyncPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderSync"
    objects: {
      attempts: Prisma.$SyncAttemptPayload<ExtArgs>[]
      jobs: Prisma.$SyncJobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      orderData: Prisma.JsonValue
      status: $Enums.SyncStatus
      hubspotContactId: string | null
      hubspotDealId: string | null
      claimedUntil: Date | null
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
    }, ExtArgs["result"]["orderSync"]>
    composites: {}
  }

  type OrderSyncGetPayload<S extends boolean | null | undefined | OrderSyncDefaultArgs> = $Result.GetResult<Prisma.$OrderSyncPayload, S>

  type OrderSyncCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderSyncFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderSyncCountAggregateInputType | true
    }

  export interface OrderSyncDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderSync'], meta: { name: 'OrderSync' } }
    /**
     * Find zero or one OrderSync that matches the filter.
     * @param {OrderSyncFindUniqueArgs} args - Arguments to find a OrderSync
     * @example
     * // Get one OrderSync
     * const orderSync = await prisma.orderSync.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderSyncFindUniqueArgs>(args: SelectSubset<T, OrderSyncFindUniqueArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderSync that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderSyncFindUniqueOrThrowArgs} args - Arguments to find a OrderSync
     * @example
     * // Get one OrderSync
     * const orderSync = await prisma.orderSync.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderSyncFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderSyncFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderSync that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncFindFirstArgs} args - Arguments to find a OrderSync
     * @example
     * // Get one OrderSync
     * const orderSync = await prisma.orderSync.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderSyncFindFirstArgs>(args?: SelectSubset<T, OrderSyncFindFirstArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderSync that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncFindFirstOrThrowArgs} args - Arguments to find a OrderSync
     * @example
     * // Get one OrderSync
     * const orderSync = await prisma.orderSync.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderSyncFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderSyncFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderSyncs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderSyncs
     * const orderSyncs = await prisma.orderSync.findMany()
     * 
     * // Get first 10 OrderSyncs
     * const orderSyncs = await prisma.orderSync.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderSyncWithIdOnly = await prisma.orderSync.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderSyncFindManyArgs>(args?: SelectSubset<T, OrderSyncFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderSync.
     * @param {OrderSyncCreateArgs} args - Arguments to create a OrderSync.
     * @example
     * // Create one OrderSync
     * const OrderSync = await prisma.orderSync.create({
     *   data: {
     *     // ... data to create a OrderSync
     *   }
     * })
     * 
     */
    create<T extends OrderSyncCreateArgs>(args: SelectSubset<T, OrderSyncCreateArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderSyncs.
     * @param {OrderSyncCreateManyArgs} args - Arguments to create many OrderSyncs.
     * @example
     * // Create many OrderSyncs
     * const orderSync = await prisma.orderSync.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderSyncCreateManyArgs>(args?: SelectSubset<T, OrderSyncCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderSyncs and returns the data saved in the database.
     * @param {OrderSyncCreateManyAndReturnArgs} args - Arguments to create many OrderSyncs.
     * @example
     * // Create many OrderSyncs
     * const orderSync = await prisma.orderSync.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderSyncs and only return the `id`
     * const orderSyncWithIdOnly = await prisma.orderSync.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderSyncCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderSyncCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderSync.
     * @param {OrderSyncDeleteArgs} args - Arguments to delete one OrderSync.
     * @example
     * // Delete one OrderSync
     * const OrderSync = await prisma.orderSync.delete({
     *   where: {
     *     // ... filter to delete one OrderSync
     *   }
     * })
     * 
     */
    delete<T extends OrderSyncDeleteArgs>(args: SelectSubset<T, OrderSyncDeleteArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderSync.
     * @param {OrderSyncUpdateArgs} args - Arguments to update one OrderSync.
     * @example
     * // Update one OrderSync
     * const orderSync = await prisma.orderSync.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderSyncUpdateArgs>(args: SelectSubset<T, OrderSyncUpdateArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderSyncs.
     * @param {OrderSyncDeleteManyArgs} args - Arguments to filter OrderSyncs to delete.
     * @example
     * // Delete a few OrderSyncs
     * const { count } = await prisma.orderSync.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderSyncDeleteManyArgs>(args?: SelectSubset<T, OrderSyncDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderSyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderSyncs
     * const orderSync = await prisma.orderSync.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderSyncUpdateManyArgs>(args: SelectSubset<T, OrderSyncUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderSyncs and returns the data updated in the database.
     * @param {OrderSyncUpdateManyAndReturnArgs} args - Arguments to update many OrderSyncs.
     * @example
     * // Update many OrderSyncs
     * const orderSync = await prisma.orderSync.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderSyncs and only return the `id`
     * const orderSyncWithIdOnly = await prisma.orderSync.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderSyncUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderSyncUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderSync.
     * @param {OrderSyncUpsertArgs} args - Arguments to update or create a OrderSync.
     * @example
     * // Update or create a OrderSync
     * const orderSync = await prisma.orderSync.upsert({
     *   create: {
     *     // ... data to create a OrderSync
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderSync we want to update
     *   }
     * })
     */
    upsert<T extends OrderSyncUpsertArgs>(args: SelectSubset<T, OrderSyncUpsertArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderSyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncCountArgs} args - Arguments to filter OrderSyncs to count.
     * @example
     * // Count the number of OrderSyncs
     * const count = await prisma.orderSync.count({
     *   where: {
     *     // ... the filter for the OrderSyncs we want to count
     *   }
     * })
    **/
    count<T extends OrderSyncCountArgs>(
      args?: Subset<T, OrderSyncCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderSyncCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderSync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderSyncAggregateArgs>(args: Subset<T, OrderSyncAggregateArgs>): Prisma.PrismaPromise<GetOrderSyncAggregateType<T>>

    /**
     * Group by OrderSync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderSyncGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderSyncGroupByArgs['orderBy'] }
        : { orderBy?: OrderSyncGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderSyncGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderSyncGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderSync model
   */
  readonly fields: OrderSyncFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderSync.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderSyncClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempts<T extends OrderSync$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, OrderSync$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobs<T extends OrderSync$jobsArgs<ExtArgs> = {}>(args?: Subset<T, OrderSync$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderSync model
   */
  interface OrderSyncFieldRefs {
    readonly id: FieldRef<"OrderSync", 'String'>
    readonly orderId: FieldRef<"OrderSync", 'String'>
    readonly orderData: FieldRef<"OrderSync", 'Json'>
    readonly status: FieldRef<"OrderSync", 'SyncStatus'>
    readonly hubspotContactId: FieldRef<"OrderSync", 'String'>
    readonly hubspotDealId: FieldRef<"OrderSync", 'String'>
    readonly claimedUntil: FieldRef<"OrderSync", 'DateTime'>
    readonly createdAt: FieldRef<"OrderSync", 'DateTime'>
    readonly updatedAt: FieldRef<"OrderSync", 'DateTime'>
    readonly syncedAt: FieldRef<"OrderSync", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderSync findUnique
   */
  export type OrderSyncFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * Filter, which OrderSync to fetch.
     */
    where: OrderSyncWhereUniqueInput
  }

  /**
   * OrderSync findUniqueOrThrow
   */
  export type OrderSyncFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * Filter, which OrderSync to fetch.
     */
    where: OrderSyncWhereUniqueInput
  }

  /**
   * OrderSync findFirst
   */
  export type OrderSyncFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * Filter, which OrderSync to fetch.
     */
    where?: OrderSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncs to fetch.
     */
    orderBy?: OrderSyncOrderByWithRelationInput | OrderSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderSyncs.
     */
    cursor?: OrderSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderSyncs.
     */
    distinct?: OrderSyncScalarFieldEnum | OrderSyncScalarFieldEnum[]
  }

  /**
   * OrderSync findFirstOrThrow
   */
  export type OrderSyncFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * Filter, which OrderSync to fetch.
     */
    where?: OrderSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncs to fetch.
     */
    orderBy?: OrderSyncOrderByWithRelationInput | OrderSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderSyncs.
     */
    cursor?: OrderSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderSyncs.
     */
    distinct?: OrderSyncScalarFieldEnum | OrderSyncScalarFieldEnum[]
  }

  /**
   * OrderSync findMany
   */
  export type OrderSyncFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * Filter, which OrderSyncs to fetch.
     */
    where?: OrderSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncs to fetch.
     */
    orderBy?: OrderSyncOrderByWithRelationInput | OrderSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderSyncs.
     */
    cursor?: OrderSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderSyncs.
     */
    distinct?: OrderSyncScalarFieldEnum | OrderSyncScalarFieldEnum[]
  }

  /**
   * OrderSync create
   */
  export type OrderSyncCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderSync.
     */
    data: XOR<OrderSyncCreateInput, OrderSyncUncheckedCreateInput>
  }

  /**
   * OrderSync createMany
   */
  export type OrderSyncCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderSyncs.
     */
    data: OrderSyncCreateManyInput | OrderSyncCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderSync createManyAndReturn
   */
  export type OrderSyncCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * The data used to create many OrderSyncs.
     */
    data: OrderSyncCreateManyInput | OrderSyncCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderSync update
   */
  export type OrderSyncUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderSync.
     */
    data: XOR<OrderSyncUpdateInput, OrderSyncUncheckedUpdateInput>
    /**
     * Choose, which OrderSync to update.
     */
    where: OrderSyncWhereUniqueInput
  }

  /**
   * OrderSync updateMany
   */
  export type OrderSyncUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderSyncs.
     */
    data: XOR<OrderSyncUpdateManyMutationInput, OrderSyncUncheckedUpdateManyInput>
    /**
     * Filter which OrderSyncs to update
     */
    where?: OrderSyncWhereInput
    /**
     * Limit how many OrderSyncs to update.
     */
    limit?: number
  }

  /**
   * OrderSync updateManyAndReturn
   */
  export type OrderSyncUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * The data used to update OrderSyncs.
     */
    data: XOR<OrderSyncUpdateManyMutationInput, OrderSyncUncheckedUpdateManyInput>
    /**
     * Filter which OrderSyncs to update
     */
    where?: OrderSyncWhereInput
    /**
     * Limit how many OrderSyncs to update.
     */
    limit?: number
  }

  /**
   * OrderSync upsert
   */
  export type OrderSyncUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderSync to update in case it exists.
     */
    where: OrderSyncWhereUniqueInput
    /**
     * In case the OrderSync found by the `where` argument doesn't exist, create a new OrderSync with this data.
     */
    create: XOR<OrderSyncCreateInput, OrderSyncUncheckedCreateInput>
    /**
     * In case the OrderSync was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderSyncUpdateInput, OrderSyncUncheckedUpdateInput>
  }

  /**
   * OrderSync delete
   */
  export type OrderSyncDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
    /**
     * Filter which OrderSync to delete.
     */
    where: OrderSyncWhereUniqueInput
  }

  /**
   * OrderSync deleteMany
   */
  export type OrderSyncDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderSyncs to delete
     */
    where?: OrderSyncWhereInput
    /**
     * Limit how many OrderSyncs to delete.
     */
    limit?: number
  }

  /**
   * OrderSync.attempts
   */
  export type OrderSync$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    where?: SyncAttemptWhereInput
    orderBy?: SyncAttemptOrderByWithRelationInput | SyncAttemptOrderByWithRelationInput[]
    cursor?: SyncAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SyncAttemptScalarFieldEnum | SyncAttemptScalarFieldEnum[]
  }

  /**
   * OrderSync.jobs
   */
  export type OrderSync$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    where?: SyncJobWhereInput
    orderBy?: SyncJobOrderByWithRelationInput | SyncJobOrderByWithRelationInput[]
    cursor?: SyncJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SyncJobScalarFieldEnum | SyncJobScalarFieldEnum[]
  }

  /**
   * OrderSync without action
   */
  export type OrderSyncDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSync
     */
    select?: OrderSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSync
     */
    omit?: OrderSyncOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncInclude<ExtArgs> | null
  }


  /**
   * Model SyncAttempt
   */

  export type AggregateSyncAttempt = {
    _count: SyncAttemptCountAggregateOutputType | null
    _avg: SyncAttemptAvgAggregateOutputType | null
    _sum: SyncAttemptSumAggregateOutputType | null
    _min: SyncAttemptMinAggregateOutputType | null
    _max: SyncAttemptMaxAggregateOutputType | null
  }

  export type SyncAttemptAvgAggregateOutputType = {
    attemptNumber: number | null
  }

  export type SyncAttemptSumAggregateOutputType = {
    attemptNumber: number | null
  }

  export type SyncAttemptMinAggregateOutputType = {
    id: string | null
    orderSyncId: string | null
    attemptNumber: number | null
    status: $Enums.SyncStatus | null
    hubspotContactId: string | null
    hubspotDealId: string | null
    errorCategory: string | null
    errorMessage: string | null
    startedAt: Date | null
    finishedAt: Date | null
  }

  export type SyncAttemptMaxAggregateOutputType = {
    id: string | null
    orderSyncId: string | null
    attemptNumber: number | null
    status: $Enums.SyncStatus | null
    hubspotContactId: string | null
    hubspotDealId: string | null
    errorCategory: string | null
    errorMessage: string | null
    startedAt: Date | null
    finishedAt: Date | null
  }

  export type SyncAttemptCountAggregateOutputType = {
    id: number
    orderSyncId: number
    attemptNumber: number
    status: number
    hubspotContactId: number
    hubspotDealId: number
    errorCategory: number
    errorMessage: number
    startedAt: number
    finishedAt: number
    _all: number
  }


  export type SyncAttemptAvgAggregateInputType = {
    attemptNumber?: true
  }

  export type SyncAttemptSumAggregateInputType = {
    attemptNumber?: true
  }

  export type SyncAttemptMinAggregateInputType = {
    id?: true
    orderSyncId?: true
    attemptNumber?: true
    status?: true
    hubspotContactId?: true
    hubspotDealId?: true
    errorCategory?: true
    errorMessage?: true
    startedAt?: true
    finishedAt?: true
  }

  export type SyncAttemptMaxAggregateInputType = {
    id?: true
    orderSyncId?: true
    attemptNumber?: true
    status?: true
    hubspotContactId?: true
    hubspotDealId?: true
    errorCategory?: true
    errorMessage?: true
    startedAt?: true
    finishedAt?: true
  }

  export type SyncAttemptCountAggregateInputType = {
    id?: true
    orderSyncId?: true
    attemptNumber?: true
    status?: true
    hubspotContactId?: true
    hubspotDealId?: true
    errorCategory?: true
    errorMessage?: true
    startedAt?: true
    finishedAt?: true
    _all?: true
  }

  export type SyncAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncAttempt to aggregate.
     */
    where?: SyncAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncAttempts to fetch.
     */
    orderBy?: SyncAttemptOrderByWithRelationInput | SyncAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncAttempts
    **/
    _count?: true | SyncAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncAttemptMaxAggregateInputType
  }

  export type GetSyncAttemptAggregateType<T extends SyncAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncAttempt[P]>
      : GetScalarType<T[P], AggregateSyncAttempt[P]>
  }




  export type SyncAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncAttemptWhereInput
    orderBy?: SyncAttemptOrderByWithAggregationInput | SyncAttemptOrderByWithAggregationInput[]
    by: SyncAttemptScalarFieldEnum[] | SyncAttemptScalarFieldEnum
    having?: SyncAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncAttemptCountAggregateInputType | true
    _avg?: SyncAttemptAvgAggregateInputType
    _sum?: SyncAttemptSumAggregateInputType
    _min?: SyncAttemptMinAggregateInputType
    _max?: SyncAttemptMaxAggregateInputType
  }

  export type SyncAttemptGroupByOutputType = {
    id: string
    orderSyncId: string
    attemptNumber: number
    status: $Enums.SyncStatus
    hubspotContactId: string | null
    hubspotDealId: string | null
    errorCategory: string | null
    errorMessage: string | null
    startedAt: Date
    finishedAt: Date | null
    _count: SyncAttemptCountAggregateOutputType | null
    _avg: SyncAttemptAvgAggregateOutputType | null
    _sum: SyncAttemptSumAggregateOutputType | null
    _min: SyncAttemptMinAggregateOutputType | null
    _max: SyncAttemptMaxAggregateOutputType | null
  }

  type GetSyncAttemptGroupByPayload<T extends SyncAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], SyncAttemptGroupByOutputType[P]>
        }
      >
    >


  export type SyncAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderSyncId?: boolean
    attemptNumber?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    errorCategory?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["syncAttempt"]>

  export type SyncAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderSyncId?: boolean
    attemptNumber?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    errorCategory?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["syncAttempt"]>

  export type SyncAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderSyncId?: boolean
    attemptNumber?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    errorCategory?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["syncAttempt"]>

  export type SyncAttemptSelectScalar = {
    id?: boolean
    orderSyncId?: boolean
    attemptNumber?: boolean
    status?: boolean
    hubspotContactId?: boolean
    hubspotDealId?: boolean
    errorCategory?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    finishedAt?: boolean
  }

  export type SyncAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderSyncId" | "attemptNumber" | "status" | "hubspotContactId" | "hubspotDealId" | "errorCategory" | "errorMessage" | "startedAt" | "finishedAt", ExtArgs["result"]["syncAttempt"]>
  export type SyncAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }
  export type SyncAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }
  export type SyncAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }

  export type $SyncAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncAttempt"
    objects: {
      orderSync: Prisma.$OrderSyncPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderSyncId: string
      attemptNumber: number
      status: $Enums.SyncStatus
      hubspotContactId: string | null
      hubspotDealId: string | null
      errorCategory: string | null
      errorMessage: string | null
      startedAt: Date
      finishedAt: Date | null
    }, ExtArgs["result"]["syncAttempt"]>
    composites: {}
  }

  type SyncAttemptGetPayload<S extends boolean | null | undefined | SyncAttemptDefaultArgs> = $Result.GetResult<Prisma.$SyncAttemptPayload, S>

  type SyncAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncAttemptCountAggregateInputType | true
    }

  export interface SyncAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncAttempt'], meta: { name: 'SyncAttempt' } }
    /**
     * Find zero or one SyncAttempt that matches the filter.
     * @param {SyncAttemptFindUniqueArgs} args - Arguments to find a SyncAttempt
     * @example
     * // Get one SyncAttempt
     * const syncAttempt = await prisma.syncAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncAttemptFindUniqueArgs>(args: SelectSubset<T, SyncAttemptFindUniqueArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncAttemptFindUniqueOrThrowArgs} args - Arguments to find a SyncAttempt
     * @example
     * // Get one SyncAttempt
     * const syncAttempt = await prisma.syncAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncAttemptFindFirstArgs} args - Arguments to find a SyncAttempt
     * @example
     * // Get one SyncAttempt
     * const syncAttempt = await prisma.syncAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncAttemptFindFirstArgs>(args?: SelectSubset<T, SyncAttemptFindFirstArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncAttemptFindFirstOrThrowArgs} args - Arguments to find a SyncAttempt
     * @example
     * // Get one SyncAttempt
     * const syncAttempt = await prisma.syncAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncAttempts
     * const syncAttempts = await prisma.syncAttempt.findMany()
     * 
     * // Get first 10 SyncAttempts
     * const syncAttempts = await prisma.syncAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncAttemptWithIdOnly = await prisma.syncAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncAttemptFindManyArgs>(args?: SelectSubset<T, SyncAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncAttempt.
     * @param {SyncAttemptCreateArgs} args - Arguments to create a SyncAttempt.
     * @example
     * // Create one SyncAttempt
     * const SyncAttempt = await prisma.syncAttempt.create({
     *   data: {
     *     // ... data to create a SyncAttempt
     *   }
     * })
     * 
     */
    create<T extends SyncAttemptCreateArgs>(args: SelectSubset<T, SyncAttemptCreateArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncAttempts.
     * @param {SyncAttemptCreateManyArgs} args - Arguments to create many SyncAttempts.
     * @example
     * // Create many SyncAttempts
     * const syncAttempt = await prisma.syncAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncAttemptCreateManyArgs>(args?: SelectSubset<T, SyncAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncAttempts and returns the data saved in the database.
     * @param {SyncAttemptCreateManyAndReturnArgs} args - Arguments to create many SyncAttempts.
     * @example
     * // Create many SyncAttempts
     * const syncAttempt = await prisma.syncAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncAttempts and only return the `id`
     * const syncAttemptWithIdOnly = await prisma.syncAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncAttempt.
     * @param {SyncAttemptDeleteArgs} args - Arguments to delete one SyncAttempt.
     * @example
     * // Delete one SyncAttempt
     * const SyncAttempt = await prisma.syncAttempt.delete({
     *   where: {
     *     // ... filter to delete one SyncAttempt
     *   }
     * })
     * 
     */
    delete<T extends SyncAttemptDeleteArgs>(args: SelectSubset<T, SyncAttemptDeleteArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncAttempt.
     * @param {SyncAttemptUpdateArgs} args - Arguments to update one SyncAttempt.
     * @example
     * // Update one SyncAttempt
     * const syncAttempt = await prisma.syncAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncAttemptUpdateArgs>(args: SelectSubset<T, SyncAttemptUpdateArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncAttempts.
     * @param {SyncAttemptDeleteManyArgs} args - Arguments to filter SyncAttempts to delete.
     * @example
     * // Delete a few SyncAttempts
     * const { count } = await prisma.syncAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncAttemptDeleteManyArgs>(args?: SelectSubset<T, SyncAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncAttempts
     * const syncAttempt = await prisma.syncAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncAttemptUpdateManyArgs>(args: SelectSubset<T, SyncAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncAttempts and returns the data updated in the database.
     * @param {SyncAttemptUpdateManyAndReturnArgs} args - Arguments to update many SyncAttempts.
     * @example
     * // Update many SyncAttempts
     * const syncAttempt = await prisma.syncAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncAttempts and only return the `id`
     * const syncAttemptWithIdOnly = await prisma.syncAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncAttempt.
     * @param {SyncAttemptUpsertArgs} args - Arguments to update or create a SyncAttempt.
     * @example
     * // Update or create a SyncAttempt
     * const syncAttempt = await prisma.syncAttempt.upsert({
     *   create: {
     *     // ... data to create a SyncAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncAttempt we want to update
     *   }
     * })
     */
    upsert<T extends SyncAttemptUpsertArgs>(args: SelectSubset<T, SyncAttemptUpsertArgs<ExtArgs>>): Prisma__SyncAttemptClient<$Result.GetResult<Prisma.$SyncAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncAttemptCountArgs} args - Arguments to filter SyncAttempts to count.
     * @example
     * // Count the number of SyncAttempts
     * const count = await prisma.syncAttempt.count({
     *   where: {
     *     // ... the filter for the SyncAttempts we want to count
     *   }
     * })
    **/
    count<T extends SyncAttemptCountArgs>(
      args?: Subset<T, SyncAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncAttemptAggregateArgs>(args: Subset<T, SyncAttemptAggregateArgs>): Prisma.PrismaPromise<GetSyncAttemptAggregateType<T>>

    /**
     * Group by SyncAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncAttemptGroupByArgs['orderBy'] }
        : { orderBy?: SyncAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncAttempt model
   */
  readonly fields: SyncAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orderSync<T extends OrderSyncDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderSyncDefaultArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncAttempt model
   */
  interface SyncAttemptFieldRefs {
    readonly id: FieldRef<"SyncAttempt", 'String'>
    readonly orderSyncId: FieldRef<"SyncAttempt", 'String'>
    readonly attemptNumber: FieldRef<"SyncAttempt", 'Int'>
    readonly status: FieldRef<"SyncAttempt", 'SyncStatus'>
    readonly hubspotContactId: FieldRef<"SyncAttempt", 'String'>
    readonly hubspotDealId: FieldRef<"SyncAttempt", 'String'>
    readonly errorCategory: FieldRef<"SyncAttempt", 'String'>
    readonly errorMessage: FieldRef<"SyncAttempt", 'String'>
    readonly startedAt: FieldRef<"SyncAttempt", 'DateTime'>
    readonly finishedAt: FieldRef<"SyncAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncAttempt findUnique
   */
  export type SyncAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * Filter, which SyncAttempt to fetch.
     */
    where: SyncAttemptWhereUniqueInput
  }

  /**
   * SyncAttempt findUniqueOrThrow
   */
  export type SyncAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * Filter, which SyncAttempt to fetch.
     */
    where: SyncAttemptWhereUniqueInput
  }

  /**
   * SyncAttempt findFirst
   */
  export type SyncAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * Filter, which SyncAttempt to fetch.
     */
    where?: SyncAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncAttempts to fetch.
     */
    orderBy?: SyncAttemptOrderByWithRelationInput | SyncAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncAttempts.
     */
    cursor?: SyncAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncAttempts.
     */
    distinct?: SyncAttemptScalarFieldEnum | SyncAttemptScalarFieldEnum[]
  }

  /**
   * SyncAttempt findFirstOrThrow
   */
  export type SyncAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * Filter, which SyncAttempt to fetch.
     */
    where?: SyncAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncAttempts to fetch.
     */
    orderBy?: SyncAttemptOrderByWithRelationInput | SyncAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncAttempts.
     */
    cursor?: SyncAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncAttempts.
     */
    distinct?: SyncAttemptScalarFieldEnum | SyncAttemptScalarFieldEnum[]
  }

  /**
   * SyncAttempt findMany
   */
  export type SyncAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * Filter, which SyncAttempts to fetch.
     */
    where?: SyncAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncAttempts to fetch.
     */
    orderBy?: SyncAttemptOrderByWithRelationInput | SyncAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncAttempts.
     */
    cursor?: SyncAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncAttempts.
     */
    distinct?: SyncAttemptScalarFieldEnum | SyncAttemptScalarFieldEnum[]
  }

  /**
   * SyncAttempt create
   */
  export type SyncAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a SyncAttempt.
     */
    data: XOR<SyncAttemptCreateInput, SyncAttemptUncheckedCreateInput>
  }

  /**
   * SyncAttempt createMany
   */
  export type SyncAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncAttempts.
     */
    data: SyncAttemptCreateManyInput | SyncAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncAttempt createManyAndReturn
   */
  export type SyncAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many SyncAttempts.
     */
    data: SyncAttemptCreateManyInput | SyncAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncAttempt update
   */
  export type SyncAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a SyncAttempt.
     */
    data: XOR<SyncAttemptUpdateInput, SyncAttemptUncheckedUpdateInput>
    /**
     * Choose, which SyncAttempt to update.
     */
    where: SyncAttemptWhereUniqueInput
  }

  /**
   * SyncAttempt updateMany
   */
  export type SyncAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncAttempts.
     */
    data: XOR<SyncAttemptUpdateManyMutationInput, SyncAttemptUncheckedUpdateManyInput>
    /**
     * Filter which SyncAttempts to update
     */
    where?: SyncAttemptWhereInput
    /**
     * Limit how many SyncAttempts to update.
     */
    limit?: number
  }

  /**
   * SyncAttempt updateManyAndReturn
   */
  export type SyncAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * The data used to update SyncAttempts.
     */
    data: XOR<SyncAttemptUpdateManyMutationInput, SyncAttemptUncheckedUpdateManyInput>
    /**
     * Filter which SyncAttempts to update
     */
    where?: SyncAttemptWhereInput
    /**
     * Limit how many SyncAttempts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncAttempt upsert
   */
  export type SyncAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the SyncAttempt to update in case it exists.
     */
    where: SyncAttemptWhereUniqueInput
    /**
     * In case the SyncAttempt found by the `where` argument doesn't exist, create a new SyncAttempt with this data.
     */
    create: XOR<SyncAttemptCreateInput, SyncAttemptUncheckedCreateInput>
    /**
     * In case the SyncAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncAttemptUpdateInput, SyncAttemptUncheckedUpdateInput>
  }

  /**
   * SyncAttempt delete
   */
  export type SyncAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
    /**
     * Filter which SyncAttempt to delete.
     */
    where: SyncAttemptWhereUniqueInput
  }

  /**
   * SyncAttempt deleteMany
   */
  export type SyncAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncAttempts to delete
     */
    where?: SyncAttemptWhereInput
    /**
     * Limit how many SyncAttempts to delete.
     */
    limit?: number
  }

  /**
   * SyncAttempt without action
   */
  export type SyncAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncAttempt
     */
    select?: SyncAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncAttempt
     */
    omit?: SyncAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncAttemptInclude<ExtArgs> | null
  }


  /**
   * Model SyncJob
   */

  export type AggregateSyncJob = {
    _count: SyncJobCountAggregateOutputType | null
    _avg: SyncJobAvgAggregateOutputType | null
    _sum: SyncJobSumAggregateOutputType | null
    _min: SyncJobMinAggregateOutputType | null
    _max: SyncJobMaxAggregateOutputType | null
  }

  export type SyncJobAvgAggregateOutputType = {
    attempts: number | null
  }

  export type SyncJobSumAggregateOutputType = {
    attempts: number | null
  }

  export type SyncJobMinAggregateOutputType = {
    id: string | null
    orderSyncId: string | null
    status: $Enums.JobStatus | null
    attempts: number | null
    nextRetryAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SyncJobMaxAggregateOutputType = {
    id: string | null
    orderSyncId: string | null
    status: $Enums.JobStatus | null
    attempts: number | null
    nextRetryAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SyncJobCountAggregateOutputType = {
    id: number
    orderSyncId: number
    status: number
    attempts: number
    nextRetryAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SyncJobAvgAggregateInputType = {
    attempts?: true
  }

  export type SyncJobSumAggregateInputType = {
    attempts?: true
  }

  export type SyncJobMinAggregateInputType = {
    id?: true
    orderSyncId?: true
    status?: true
    attempts?: true
    nextRetryAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SyncJobMaxAggregateInputType = {
    id?: true
    orderSyncId?: true
    status?: true
    attempts?: true
    nextRetryAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SyncJobCountAggregateInputType = {
    id?: true
    orderSyncId?: true
    status?: true
    attempts?: true
    nextRetryAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SyncJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncJob to aggregate.
     */
    where?: SyncJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncJobs to fetch.
     */
    orderBy?: SyncJobOrderByWithRelationInput | SyncJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncJobs
    **/
    _count?: true | SyncJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncJobMaxAggregateInputType
  }

  export type GetSyncJobAggregateType<T extends SyncJobAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncJob[P]>
      : GetScalarType<T[P], AggregateSyncJob[P]>
  }




  export type SyncJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncJobWhereInput
    orderBy?: SyncJobOrderByWithAggregationInput | SyncJobOrderByWithAggregationInput[]
    by: SyncJobScalarFieldEnum[] | SyncJobScalarFieldEnum
    having?: SyncJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncJobCountAggregateInputType | true
    _avg?: SyncJobAvgAggregateInputType
    _sum?: SyncJobSumAggregateInputType
    _min?: SyncJobMinAggregateInputType
    _max?: SyncJobMaxAggregateInputType
  }

  export type SyncJobGroupByOutputType = {
    id: string
    orderSyncId: string
    status: $Enums.JobStatus
    attempts: number
    nextRetryAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SyncJobCountAggregateOutputType | null
    _avg: SyncJobAvgAggregateOutputType | null
    _sum: SyncJobSumAggregateOutputType | null
    _min: SyncJobMinAggregateOutputType | null
    _max: SyncJobMaxAggregateOutputType | null
  }

  type GetSyncJobGroupByPayload<T extends SyncJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncJobGroupByOutputType[P]>
            : GetScalarType<T[P], SyncJobGroupByOutputType[P]>
        }
      >
    >


  export type SyncJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderSyncId?: boolean
    status?: boolean
    attempts?: boolean
    nextRetryAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["syncJob"]>

  export type SyncJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderSyncId?: boolean
    status?: boolean
    attempts?: boolean
    nextRetryAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["syncJob"]>

  export type SyncJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderSyncId?: boolean
    status?: boolean
    attempts?: boolean
    nextRetryAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["syncJob"]>

  export type SyncJobSelectScalar = {
    id?: boolean
    orderSyncId?: boolean
    status?: boolean
    attempts?: boolean
    nextRetryAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SyncJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderSyncId" | "status" | "attempts" | "nextRetryAt" | "createdAt" | "updatedAt", ExtArgs["result"]["syncJob"]>
  export type SyncJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }
  export type SyncJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }
  export type SyncJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderSync?: boolean | OrderSyncDefaultArgs<ExtArgs>
  }

  export type $SyncJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncJob"
    objects: {
      orderSync: Prisma.$OrderSyncPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderSyncId: string
      status: $Enums.JobStatus
      attempts: number
      nextRetryAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["syncJob"]>
    composites: {}
  }

  type SyncJobGetPayload<S extends boolean | null | undefined | SyncJobDefaultArgs> = $Result.GetResult<Prisma.$SyncJobPayload, S>

  type SyncJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncJobCountAggregateInputType | true
    }

  export interface SyncJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncJob'], meta: { name: 'SyncJob' } }
    /**
     * Find zero or one SyncJob that matches the filter.
     * @param {SyncJobFindUniqueArgs} args - Arguments to find a SyncJob
     * @example
     * // Get one SyncJob
     * const syncJob = await prisma.syncJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncJobFindUniqueArgs>(args: SelectSubset<T, SyncJobFindUniqueArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncJobFindUniqueOrThrowArgs} args - Arguments to find a SyncJob
     * @example
     * // Get one SyncJob
     * const syncJob = await prisma.syncJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncJobFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncJobFindFirstArgs} args - Arguments to find a SyncJob
     * @example
     * // Get one SyncJob
     * const syncJob = await prisma.syncJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncJobFindFirstArgs>(args?: SelectSubset<T, SyncJobFindFirstArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncJobFindFirstOrThrowArgs} args - Arguments to find a SyncJob
     * @example
     * // Get one SyncJob
     * const syncJob = await prisma.syncJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncJobFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncJobs
     * const syncJobs = await prisma.syncJob.findMany()
     * 
     * // Get first 10 SyncJobs
     * const syncJobs = await prisma.syncJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncJobWithIdOnly = await prisma.syncJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncJobFindManyArgs>(args?: SelectSubset<T, SyncJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncJob.
     * @param {SyncJobCreateArgs} args - Arguments to create a SyncJob.
     * @example
     * // Create one SyncJob
     * const SyncJob = await prisma.syncJob.create({
     *   data: {
     *     // ... data to create a SyncJob
     *   }
     * })
     * 
     */
    create<T extends SyncJobCreateArgs>(args: SelectSubset<T, SyncJobCreateArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncJobs.
     * @param {SyncJobCreateManyArgs} args - Arguments to create many SyncJobs.
     * @example
     * // Create many SyncJobs
     * const syncJob = await prisma.syncJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncJobCreateManyArgs>(args?: SelectSubset<T, SyncJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncJobs and returns the data saved in the database.
     * @param {SyncJobCreateManyAndReturnArgs} args - Arguments to create many SyncJobs.
     * @example
     * // Create many SyncJobs
     * const syncJob = await prisma.syncJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncJobs and only return the `id`
     * const syncJobWithIdOnly = await prisma.syncJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncJobCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncJob.
     * @param {SyncJobDeleteArgs} args - Arguments to delete one SyncJob.
     * @example
     * // Delete one SyncJob
     * const SyncJob = await prisma.syncJob.delete({
     *   where: {
     *     // ... filter to delete one SyncJob
     *   }
     * })
     * 
     */
    delete<T extends SyncJobDeleteArgs>(args: SelectSubset<T, SyncJobDeleteArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncJob.
     * @param {SyncJobUpdateArgs} args - Arguments to update one SyncJob.
     * @example
     * // Update one SyncJob
     * const syncJob = await prisma.syncJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncJobUpdateArgs>(args: SelectSubset<T, SyncJobUpdateArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncJobs.
     * @param {SyncJobDeleteManyArgs} args - Arguments to filter SyncJobs to delete.
     * @example
     * // Delete a few SyncJobs
     * const { count } = await prisma.syncJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncJobDeleteManyArgs>(args?: SelectSubset<T, SyncJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncJobs
     * const syncJob = await prisma.syncJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncJobUpdateManyArgs>(args: SelectSubset<T, SyncJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncJobs and returns the data updated in the database.
     * @param {SyncJobUpdateManyAndReturnArgs} args - Arguments to update many SyncJobs.
     * @example
     * // Update many SyncJobs
     * const syncJob = await prisma.syncJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncJobs and only return the `id`
     * const syncJobWithIdOnly = await prisma.syncJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncJobUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncJob.
     * @param {SyncJobUpsertArgs} args - Arguments to update or create a SyncJob.
     * @example
     * // Update or create a SyncJob
     * const syncJob = await prisma.syncJob.upsert({
     *   create: {
     *     // ... data to create a SyncJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncJob we want to update
     *   }
     * })
     */
    upsert<T extends SyncJobUpsertArgs>(args: SelectSubset<T, SyncJobUpsertArgs<ExtArgs>>): Prisma__SyncJobClient<$Result.GetResult<Prisma.$SyncJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncJobCountArgs} args - Arguments to filter SyncJobs to count.
     * @example
     * // Count the number of SyncJobs
     * const count = await prisma.syncJob.count({
     *   where: {
     *     // ... the filter for the SyncJobs we want to count
     *   }
     * })
    **/
    count<T extends SyncJobCountArgs>(
      args?: Subset<T, SyncJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncJobAggregateArgs>(args: Subset<T, SyncJobAggregateArgs>): Prisma.PrismaPromise<GetSyncJobAggregateType<T>>

    /**
     * Group by SyncJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncJobGroupByArgs['orderBy'] }
        : { orderBy?: SyncJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncJob model
   */
  readonly fields: SyncJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orderSync<T extends OrderSyncDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderSyncDefaultArgs<ExtArgs>>): Prisma__OrderSyncClient<$Result.GetResult<Prisma.$OrderSyncPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncJob model
   */
  interface SyncJobFieldRefs {
    readonly id: FieldRef<"SyncJob", 'String'>
    readonly orderSyncId: FieldRef<"SyncJob", 'String'>
    readonly status: FieldRef<"SyncJob", 'JobStatus'>
    readonly attempts: FieldRef<"SyncJob", 'Int'>
    readonly nextRetryAt: FieldRef<"SyncJob", 'DateTime'>
    readonly createdAt: FieldRef<"SyncJob", 'DateTime'>
    readonly updatedAt: FieldRef<"SyncJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncJob findUnique
   */
  export type SyncJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * Filter, which SyncJob to fetch.
     */
    where: SyncJobWhereUniqueInput
  }

  /**
   * SyncJob findUniqueOrThrow
   */
  export type SyncJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * Filter, which SyncJob to fetch.
     */
    where: SyncJobWhereUniqueInput
  }

  /**
   * SyncJob findFirst
   */
  export type SyncJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * Filter, which SyncJob to fetch.
     */
    where?: SyncJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncJobs to fetch.
     */
    orderBy?: SyncJobOrderByWithRelationInput | SyncJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncJobs.
     */
    cursor?: SyncJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncJobs.
     */
    distinct?: SyncJobScalarFieldEnum | SyncJobScalarFieldEnum[]
  }

  /**
   * SyncJob findFirstOrThrow
   */
  export type SyncJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * Filter, which SyncJob to fetch.
     */
    where?: SyncJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncJobs to fetch.
     */
    orderBy?: SyncJobOrderByWithRelationInput | SyncJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncJobs.
     */
    cursor?: SyncJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncJobs.
     */
    distinct?: SyncJobScalarFieldEnum | SyncJobScalarFieldEnum[]
  }

  /**
   * SyncJob findMany
   */
  export type SyncJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * Filter, which SyncJobs to fetch.
     */
    where?: SyncJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncJobs to fetch.
     */
    orderBy?: SyncJobOrderByWithRelationInput | SyncJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncJobs.
     */
    cursor?: SyncJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncJobs.
     */
    distinct?: SyncJobScalarFieldEnum | SyncJobScalarFieldEnum[]
  }

  /**
   * SyncJob create
   */
  export type SyncJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * The data needed to create a SyncJob.
     */
    data: XOR<SyncJobCreateInput, SyncJobUncheckedCreateInput>
  }

  /**
   * SyncJob createMany
   */
  export type SyncJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncJobs.
     */
    data: SyncJobCreateManyInput | SyncJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncJob createManyAndReturn
   */
  export type SyncJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * The data used to create many SyncJobs.
     */
    data: SyncJobCreateManyInput | SyncJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncJob update
   */
  export type SyncJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * The data needed to update a SyncJob.
     */
    data: XOR<SyncJobUpdateInput, SyncJobUncheckedUpdateInput>
    /**
     * Choose, which SyncJob to update.
     */
    where: SyncJobWhereUniqueInput
  }

  /**
   * SyncJob updateMany
   */
  export type SyncJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncJobs.
     */
    data: XOR<SyncJobUpdateManyMutationInput, SyncJobUncheckedUpdateManyInput>
    /**
     * Filter which SyncJobs to update
     */
    where?: SyncJobWhereInput
    /**
     * Limit how many SyncJobs to update.
     */
    limit?: number
  }

  /**
   * SyncJob updateManyAndReturn
   */
  export type SyncJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * The data used to update SyncJobs.
     */
    data: XOR<SyncJobUpdateManyMutationInput, SyncJobUncheckedUpdateManyInput>
    /**
     * Filter which SyncJobs to update
     */
    where?: SyncJobWhereInput
    /**
     * Limit how many SyncJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncJob upsert
   */
  export type SyncJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * The filter to search for the SyncJob to update in case it exists.
     */
    where: SyncJobWhereUniqueInput
    /**
     * In case the SyncJob found by the `where` argument doesn't exist, create a new SyncJob with this data.
     */
    create: XOR<SyncJobCreateInput, SyncJobUncheckedCreateInput>
    /**
     * In case the SyncJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncJobUpdateInput, SyncJobUncheckedUpdateInput>
  }

  /**
   * SyncJob delete
   */
  export type SyncJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
    /**
     * Filter which SyncJob to delete.
     */
    where: SyncJobWhereUniqueInput
  }

  /**
   * SyncJob deleteMany
   */
  export type SyncJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncJobs to delete
     */
    where?: SyncJobWhereInput
    /**
     * Limit how many SyncJobs to delete.
     */
    limit?: number
  }

  /**
   * SyncJob without action
   */
  export type SyncJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncJob
     */
    select?: SyncJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncJob
     */
    omit?: SyncJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncJobInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrderSyncScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    orderData: 'orderData',
    status: 'status',
    hubspotContactId: 'hubspotContactId',
    hubspotDealId: 'hubspotDealId',
    claimedUntil: 'claimedUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt'
  };

  export type OrderSyncScalarFieldEnum = (typeof OrderSyncScalarFieldEnum)[keyof typeof OrderSyncScalarFieldEnum]


  export const SyncAttemptScalarFieldEnum: {
    id: 'id',
    orderSyncId: 'orderSyncId',
    attemptNumber: 'attemptNumber',
    status: 'status',
    hubspotContactId: 'hubspotContactId',
    hubspotDealId: 'hubspotDealId',
    errorCategory: 'errorCategory',
    errorMessage: 'errorMessage',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt'
  };

  export type SyncAttemptScalarFieldEnum = (typeof SyncAttemptScalarFieldEnum)[keyof typeof SyncAttemptScalarFieldEnum]


  export const SyncJobScalarFieldEnum: {
    id: 'id',
    orderSyncId: 'orderSyncId',
    status: 'status',
    attempts: 'attempts',
    nextRetryAt: 'nextRetryAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SyncJobScalarFieldEnum = (typeof SyncJobScalarFieldEnum)[keyof typeof SyncJobScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'SyncStatus'
   */
  export type EnumSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncStatus'>
    


  /**
   * Reference to a field of type 'SyncStatus[]'
   */
  export type ListEnumSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrderSyncWhereInput = {
    AND?: OrderSyncWhereInput | OrderSyncWhereInput[]
    OR?: OrderSyncWhereInput[]
    NOT?: OrderSyncWhereInput | OrderSyncWhereInput[]
    id?: StringFilter<"OrderSync"> | string
    orderId?: StringFilter<"OrderSync"> | string
    orderData?: JsonFilter<"OrderSync">
    status?: EnumSyncStatusFilter<"OrderSync"> | $Enums.SyncStatus
    hubspotContactId?: StringNullableFilter<"OrderSync"> | string | null
    hubspotDealId?: StringNullableFilter<"OrderSync"> | string | null
    claimedUntil?: DateTimeNullableFilter<"OrderSync"> | Date | string | null
    createdAt?: DateTimeFilter<"OrderSync"> | Date | string
    updatedAt?: DateTimeFilter<"OrderSync"> | Date | string
    syncedAt?: DateTimeNullableFilter<"OrderSync"> | Date | string | null
    attempts?: SyncAttemptListRelationFilter
    jobs?: SyncJobListRelationFilter
  }

  export type OrderSyncOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    orderData?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrderInput | SortOrder
    hubspotDealId?: SortOrderInput | SortOrder
    claimedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    attempts?: SyncAttemptOrderByRelationAggregateInput
    jobs?: SyncJobOrderByRelationAggregateInput
  }

  export type OrderSyncWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    AND?: OrderSyncWhereInput | OrderSyncWhereInput[]
    OR?: OrderSyncWhereInput[]
    NOT?: OrderSyncWhereInput | OrderSyncWhereInput[]
    orderData?: JsonFilter<"OrderSync">
    status?: EnumSyncStatusFilter<"OrderSync"> | $Enums.SyncStatus
    hubspotContactId?: StringNullableFilter<"OrderSync"> | string | null
    hubspotDealId?: StringNullableFilter<"OrderSync"> | string | null
    claimedUntil?: DateTimeNullableFilter<"OrderSync"> | Date | string | null
    createdAt?: DateTimeFilter<"OrderSync"> | Date | string
    updatedAt?: DateTimeFilter<"OrderSync"> | Date | string
    syncedAt?: DateTimeNullableFilter<"OrderSync"> | Date | string | null
    attempts?: SyncAttemptListRelationFilter
    jobs?: SyncJobListRelationFilter
  }, "id" | "orderId">

  export type OrderSyncOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    orderData?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrderInput | SortOrder
    hubspotDealId?: SortOrderInput | SortOrder
    claimedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    _count?: OrderSyncCountOrderByAggregateInput
    _max?: OrderSyncMaxOrderByAggregateInput
    _min?: OrderSyncMinOrderByAggregateInput
  }

  export type OrderSyncScalarWhereWithAggregatesInput = {
    AND?: OrderSyncScalarWhereWithAggregatesInput | OrderSyncScalarWhereWithAggregatesInput[]
    OR?: OrderSyncScalarWhereWithAggregatesInput[]
    NOT?: OrderSyncScalarWhereWithAggregatesInput | OrderSyncScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderSync"> | string
    orderId?: StringWithAggregatesFilter<"OrderSync"> | string
    orderData?: JsonWithAggregatesFilter<"OrderSync">
    status?: EnumSyncStatusWithAggregatesFilter<"OrderSync"> | $Enums.SyncStatus
    hubspotContactId?: StringNullableWithAggregatesFilter<"OrderSync"> | string | null
    hubspotDealId?: StringNullableWithAggregatesFilter<"OrderSync"> | string | null
    claimedUntil?: DateTimeNullableWithAggregatesFilter<"OrderSync"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderSync"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrderSync"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"OrderSync"> | Date | string | null
  }

  export type SyncAttemptWhereInput = {
    AND?: SyncAttemptWhereInput | SyncAttemptWhereInput[]
    OR?: SyncAttemptWhereInput[]
    NOT?: SyncAttemptWhereInput | SyncAttemptWhereInput[]
    id?: StringFilter<"SyncAttempt"> | string
    orderSyncId?: StringFilter<"SyncAttempt"> | string
    attemptNumber?: IntFilter<"SyncAttempt"> | number
    status?: EnumSyncStatusFilter<"SyncAttempt"> | $Enums.SyncStatus
    hubspotContactId?: StringNullableFilter<"SyncAttempt"> | string | null
    hubspotDealId?: StringNullableFilter<"SyncAttempt"> | string | null
    errorCategory?: StringNullableFilter<"SyncAttempt"> | string | null
    errorMessage?: StringNullableFilter<"SyncAttempt"> | string | null
    startedAt?: DateTimeFilter<"SyncAttempt"> | Date | string
    finishedAt?: DateTimeNullableFilter<"SyncAttempt"> | Date | string | null
    orderSync?: XOR<OrderSyncScalarRelationFilter, OrderSyncWhereInput>
  }

  export type SyncAttemptOrderByWithRelationInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    attemptNumber?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrderInput | SortOrder
    hubspotDealId?: SortOrderInput | SortOrder
    errorCategory?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    orderSync?: OrderSyncOrderByWithRelationInput
  }

  export type SyncAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderSyncId_attemptNumber?: SyncAttemptOrderSyncIdAttemptNumberCompoundUniqueInput
    AND?: SyncAttemptWhereInput | SyncAttemptWhereInput[]
    OR?: SyncAttemptWhereInput[]
    NOT?: SyncAttemptWhereInput | SyncAttemptWhereInput[]
    orderSyncId?: StringFilter<"SyncAttempt"> | string
    attemptNumber?: IntFilter<"SyncAttempt"> | number
    status?: EnumSyncStatusFilter<"SyncAttempt"> | $Enums.SyncStatus
    hubspotContactId?: StringNullableFilter<"SyncAttempt"> | string | null
    hubspotDealId?: StringNullableFilter<"SyncAttempt"> | string | null
    errorCategory?: StringNullableFilter<"SyncAttempt"> | string | null
    errorMessage?: StringNullableFilter<"SyncAttempt"> | string | null
    startedAt?: DateTimeFilter<"SyncAttempt"> | Date | string
    finishedAt?: DateTimeNullableFilter<"SyncAttempt"> | Date | string | null
    orderSync?: XOR<OrderSyncScalarRelationFilter, OrderSyncWhereInput>
  }, "id" | "orderSyncId_attemptNumber">

  export type SyncAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    attemptNumber?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrderInput | SortOrder
    hubspotDealId?: SortOrderInput | SortOrder
    errorCategory?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    _count?: SyncAttemptCountOrderByAggregateInput
    _avg?: SyncAttemptAvgOrderByAggregateInput
    _max?: SyncAttemptMaxOrderByAggregateInput
    _min?: SyncAttemptMinOrderByAggregateInput
    _sum?: SyncAttemptSumOrderByAggregateInput
  }

  export type SyncAttemptScalarWhereWithAggregatesInput = {
    AND?: SyncAttemptScalarWhereWithAggregatesInput | SyncAttemptScalarWhereWithAggregatesInput[]
    OR?: SyncAttemptScalarWhereWithAggregatesInput[]
    NOT?: SyncAttemptScalarWhereWithAggregatesInput | SyncAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncAttempt"> | string
    orderSyncId?: StringWithAggregatesFilter<"SyncAttempt"> | string
    attemptNumber?: IntWithAggregatesFilter<"SyncAttempt"> | number
    status?: EnumSyncStatusWithAggregatesFilter<"SyncAttempt"> | $Enums.SyncStatus
    hubspotContactId?: StringNullableWithAggregatesFilter<"SyncAttempt"> | string | null
    hubspotDealId?: StringNullableWithAggregatesFilter<"SyncAttempt"> | string | null
    errorCategory?: StringNullableWithAggregatesFilter<"SyncAttempt"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"SyncAttempt"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"SyncAttempt"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"SyncAttempt"> | Date | string | null
  }

  export type SyncJobWhereInput = {
    AND?: SyncJobWhereInput | SyncJobWhereInput[]
    OR?: SyncJobWhereInput[]
    NOT?: SyncJobWhereInput | SyncJobWhereInput[]
    id?: StringFilter<"SyncJob"> | string
    orderSyncId?: StringFilter<"SyncJob"> | string
    status?: EnumJobStatusFilter<"SyncJob"> | $Enums.JobStatus
    attempts?: IntFilter<"SyncJob"> | number
    nextRetryAt?: DateTimeNullableFilter<"SyncJob"> | Date | string | null
    createdAt?: DateTimeFilter<"SyncJob"> | Date | string
    updatedAt?: DateTimeFilter<"SyncJob"> | Date | string
    orderSync?: XOR<OrderSyncScalarRelationFilter, OrderSyncWhereInput>
  }

  export type SyncJobOrderByWithRelationInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    nextRetryAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orderSync?: OrderSyncOrderByWithRelationInput
  }

  export type SyncJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SyncJobWhereInput | SyncJobWhereInput[]
    OR?: SyncJobWhereInput[]
    NOT?: SyncJobWhereInput | SyncJobWhereInput[]
    orderSyncId?: StringFilter<"SyncJob"> | string
    status?: EnumJobStatusFilter<"SyncJob"> | $Enums.JobStatus
    attempts?: IntFilter<"SyncJob"> | number
    nextRetryAt?: DateTimeNullableFilter<"SyncJob"> | Date | string | null
    createdAt?: DateTimeFilter<"SyncJob"> | Date | string
    updatedAt?: DateTimeFilter<"SyncJob"> | Date | string
    orderSync?: XOR<OrderSyncScalarRelationFilter, OrderSyncWhereInput>
  }, "id">

  export type SyncJobOrderByWithAggregationInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    nextRetryAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SyncJobCountOrderByAggregateInput
    _avg?: SyncJobAvgOrderByAggregateInput
    _max?: SyncJobMaxOrderByAggregateInput
    _min?: SyncJobMinOrderByAggregateInput
    _sum?: SyncJobSumOrderByAggregateInput
  }

  export type SyncJobScalarWhereWithAggregatesInput = {
    AND?: SyncJobScalarWhereWithAggregatesInput | SyncJobScalarWhereWithAggregatesInput[]
    OR?: SyncJobScalarWhereWithAggregatesInput[]
    NOT?: SyncJobScalarWhereWithAggregatesInput | SyncJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncJob"> | string
    orderSyncId?: StringWithAggregatesFilter<"SyncJob"> | string
    status?: EnumJobStatusWithAggregatesFilter<"SyncJob"> | $Enums.JobStatus
    attempts?: IntWithAggregatesFilter<"SyncJob"> | number
    nextRetryAt?: DateTimeNullableWithAggregatesFilter<"SyncJob"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SyncJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SyncJob"> | Date | string
  }

  export type OrderSyncCreateInput = {
    id?: string
    orderId: string
    orderData: JsonNullValueInput | InputJsonValue
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    claimedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    attempts?: SyncAttemptCreateNestedManyWithoutOrderSyncInput
    jobs?: SyncJobCreateNestedManyWithoutOrderSyncInput
  }

  export type OrderSyncUncheckedCreateInput = {
    id?: string
    orderId: string
    orderData: JsonNullValueInput | InputJsonValue
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    claimedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    attempts?: SyncAttemptUncheckedCreateNestedManyWithoutOrderSyncInput
    jobs?: SyncJobUncheckedCreateNestedManyWithoutOrderSyncInput
  }

  export type OrderSyncUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: SyncAttemptUpdateManyWithoutOrderSyncNestedInput
    jobs?: SyncJobUpdateManyWithoutOrderSyncNestedInput
  }

  export type OrderSyncUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: SyncAttemptUncheckedUpdateManyWithoutOrderSyncNestedInput
    jobs?: SyncJobUncheckedUpdateManyWithoutOrderSyncNestedInput
  }

  export type OrderSyncCreateManyInput = {
    id?: string
    orderId: string
    orderData: JsonNullValueInput | InputJsonValue
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    claimedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
  }

  export type OrderSyncUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderSyncUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncAttemptCreateInput = {
    id?: string
    attemptNumber: number
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    errorCategory?: string | null
    errorMessage?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    orderSync: OrderSyncCreateNestedOneWithoutAttemptsInput
  }

  export type SyncAttemptUncheckedCreateInput = {
    id?: string
    orderSyncId: string
    attemptNumber: number
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    errorCategory?: string | null
    errorMessage?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    errorCategory?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderSync?: OrderSyncUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type SyncAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderSyncId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    errorCategory?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncAttemptCreateManyInput = {
    id?: string
    orderSyncId: string
    attemptNumber: number
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    errorCategory?: string | null
    errorMessage?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    errorCategory?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderSyncId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    errorCategory?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncJobCreateInput = {
    id?: string
    status?: $Enums.JobStatus
    attempts?: number
    nextRetryAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderSync: OrderSyncCreateNestedOneWithoutJobsInput
  }

  export type SyncJobUncheckedCreateInput = {
    id?: string
    orderSyncId: string
    status?: $Enums.JobStatus
    attempts?: number
    nextRetryAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderSync?: OrderSyncUpdateOneRequiredWithoutJobsNestedInput
  }

  export type SyncJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderSyncId?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncJobCreateManyInput = {
    id?: string
    orderSyncId: string
    status?: $Enums.JobStatus
    attempts?: number
    nextRetryAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderSyncId?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusFilter<$PrismaModel> | $Enums.SyncStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SyncAttemptListRelationFilter = {
    every?: SyncAttemptWhereInput
    some?: SyncAttemptWhereInput
    none?: SyncAttemptWhereInput
  }

  export type SyncJobListRelationFilter = {
    every?: SyncJobWhereInput
    some?: SyncJobWhereInput
    none?: SyncJobWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SyncAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SyncJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderSyncCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    orderData?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrder
    hubspotDealId?: SortOrder
    claimedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type OrderSyncMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrder
    hubspotDealId?: SortOrder
    claimedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type OrderSyncMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrder
    hubspotDealId?: SortOrder
    claimedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OrderSyncScalarRelationFilter = {
    is?: OrderSyncWhereInput
    isNot?: OrderSyncWhereInput
  }

  export type SyncAttemptOrderSyncIdAttemptNumberCompoundUniqueInput = {
    orderSyncId: string
    attemptNumber: number
  }

  export type SyncAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    attemptNumber?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrder
    hubspotDealId?: SortOrder
    errorCategory?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type SyncAttemptAvgOrderByAggregateInput = {
    attemptNumber?: SortOrder
  }

  export type SyncAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    attemptNumber?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrder
    hubspotDealId?: SortOrder
    errorCategory?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type SyncAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    attemptNumber?: SortOrder
    status?: SortOrder
    hubspotContactId?: SortOrder
    hubspotDealId?: SortOrder
    errorCategory?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type SyncAttemptSumOrderByAggregateInput = {
    attemptNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type SyncJobCountOrderByAggregateInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    nextRetryAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncJobAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type SyncJobMaxOrderByAggregateInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    nextRetryAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncJobMinOrderByAggregateInput = {
    id?: SortOrder
    orderSyncId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    nextRetryAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncJobSumOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type SyncAttemptCreateNestedManyWithoutOrderSyncInput = {
    create?: XOR<SyncAttemptCreateWithoutOrderSyncInput, SyncAttemptUncheckedCreateWithoutOrderSyncInput> | SyncAttemptCreateWithoutOrderSyncInput[] | SyncAttemptUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncAttemptCreateOrConnectWithoutOrderSyncInput | SyncAttemptCreateOrConnectWithoutOrderSyncInput[]
    createMany?: SyncAttemptCreateManyOrderSyncInputEnvelope
    connect?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
  }

  export type SyncJobCreateNestedManyWithoutOrderSyncInput = {
    create?: XOR<SyncJobCreateWithoutOrderSyncInput, SyncJobUncheckedCreateWithoutOrderSyncInput> | SyncJobCreateWithoutOrderSyncInput[] | SyncJobUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncJobCreateOrConnectWithoutOrderSyncInput | SyncJobCreateOrConnectWithoutOrderSyncInput[]
    createMany?: SyncJobCreateManyOrderSyncInputEnvelope
    connect?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
  }

  export type SyncAttemptUncheckedCreateNestedManyWithoutOrderSyncInput = {
    create?: XOR<SyncAttemptCreateWithoutOrderSyncInput, SyncAttemptUncheckedCreateWithoutOrderSyncInput> | SyncAttemptCreateWithoutOrderSyncInput[] | SyncAttemptUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncAttemptCreateOrConnectWithoutOrderSyncInput | SyncAttemptCreateOrConnectWithoutOrderSyncInput[]
    createMany?: SyncAttemptCreateManyOrderSyncInputEnvelope
    connect?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
  }

  export type SyncJobUncheckedCreateNestedManyWithoutOrderSyncInput = {
    create?: XOR<SyncJobCreateWithoutOrderSyncInput, SyncJobUncheckedCreateWithoutOrderSyncInput> | SyncJobCreateWithoutOrderSyncInput[] | SyncJobUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncJobCreateOrConnectWithoutOrderSyncInput | SyncJobCreateOrConnectWithoutOrderSyncInput[]
    createMany?: SyncJobCreateManyOrderSyncInputEnvelope
    connect?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumSyncStatusFieldUpdateOperationsInput = {
    set?: $Enums.SyncStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SyncAttemptUpdateManyWithoutOrderSyncNestedInput = {
    create?: XOR<SyncAttemptCreateWithoutOrderSyncInput, SyncAttemptUncheckedCreateWithoutOrderSyncInput> | SyncAttemptCreateWithoutOrderSyncInput[] | SyncAttemptUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncAttemptCreateOrConnectWithoutOrderSyncInput | SyncAttemptCreateOrConnectWithoutOrderSyncInput[]
    upsert?: SyncAttemptUpsertWithWhereUniqueWithoutOrderSyncInput | SyncAttemptUpsertWithWhereUniqueWithoutOrderSyncInput[]
    createMany?: SyncAttemptCreateManyOrderSyncInputEnvelope
    set?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    disconnect?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    delete?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    connect?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    update?: SyncAttemptUpdateWithWhereUniqueWithoutOrderSyncInput | SyncAttemptUpdateWithWhereUniqueWithoutOrderSyncInput[]
    updateMany?: SyncAttemptUpdateManyWithWhereWithoutOrderSyncInput | SyncAttemptUpdateManyWithWhereWithoutOrderSyncInput[]
    deleteMany?: SyncAttemptScalarWhereInput | SyncAttemptScalarWhereInput[]
  }

  export type SyncJobUpdateManyWithoutOrderSyncNestedInput = {
    create?: XOR<SyncJobCreateWithoutOrderSyncInput, SyncJobUncheckedCreateWithoutOrderSyncInput> | SyncJobCreateWithoutOrderSyncInput[] | SyncJobUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncJobCreateOrConnectWithoutOrderSyncInput | SyncJobCreateOrConnectWithoutOrderSyncInput[]
    upsert?: SyncJobUpsertWithWhereUniqueWithoutOrderSyncInput | SyncJobUpsertWithWhereUniqueWithoutOrderSyncInput[]
    createMany?: SyncJobCreateManyOrderSyncInputEnvelope
    set?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    disconnect?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    delete?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    connect?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    update?: SyncJobUpdateWithWhereUniqueWithoutOrderSyncInput | SyncJobUpdateWithWhereUniqueWithoutOrderSyncInput[]
    updateMany?: SyncJobUpdateManyWithWhereWithoutOrderSyncInput | SyncJobUpdateManyWithWhereWithoutOrderSyncInput[]
    deleteMany?: SyncJobScalarWhereInput | SyncJobScalarWhereInput[]
  }

  export type SyncAttemptUncheckedUpdateManyWithoutOrderSyncNestedInput = {
    create?: XOR<SyncAttemptCreateWithoutOrderSyncInput, SyncAttemptUncheckedCreateWithoutOrderSyncInput> | SyncAttemptCreateWithoutOrderSyncInput[] | SyncAttemptUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncAttemptCreateOrConnectWithoutOrderSyncInput | SyncAttemptCreateOrConnectWithoutOrderSyncInput[]
    upsert?: SyncAttemptUpsertWithWhereUniqueWithoutOrderSyncInput | SyncAttemptUpsertWithWhereUniqueWithoutOrderSyncInput[]
    createMany?: SyncAttemptCreateManyOrderSyncInputEnvelope
    set?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    disconnect?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    delete?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    connect?: SyncAttemptWhereUniqueInput | SyncAttemptWhereUniqueInput[]
    update?: SyncAttemptUpdateWithWhereUniqueWithoutOrderSyncInput | SyncAttemptUpdateWithWhereUniqueWithoutOrderSyncInput[]
    updateMany?: SyncAttemptUpdateManyWithWhereWithoutOrderSyncInput | SyncAttemptUpdateManyWithWhereWithoutOrderSyncInput[]
    deleteMany?: SyncAttemptScalarWhereInput | SyncAttemptScalarWhereInput[]
  }

  export type SyncJobUncheckedUpdateManyWithoutOrderSyncNestedInput = {
    create?: XOR<SyncJobCreateWithoutOrderSyncInput, SyncJobUncheckedCreateWithoutOrderSyncInput> | SyncJobCreateWithoutOrderSyncInput[] | SyncJobUncheckedCreateWithoutOrderSyncInput[]
    connectOrCreate?: SyncJobCreateOrConnectWithoutOrderSyncInput | SyncJobCreateOrConnectWithoutOrderSyncInput[]
    upsert?: SyncJobUpsertWithWhereUniqueWithoutOrderSyncInput | SyncJobUpsertWithWhereUniqueWithoutOrderSyncInput[]
    createMany?: SyncJobCreateManyOrderSyncInputEnvelope
    set?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    disconnect?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    delete?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    connect?: SyncJobWhereUniqueInput | SyncJobWhereUniqueInput[]
    update?: SyncJobUpdateWithWhereUniqueWithoutOrderSyncInput | SyncJobUpdateWithWhereUniqueWithoutOrderSyncInput[]
    updateMany?: SyncJobUpdateManyWithWhereWithoutOrderSyncInput | SyncJobUpdateManyWithWhereWithoutOrderSyncInput[]
    deleteMany?: SyncJobScalarWhereInput | SyncJobScalarWhereInput[]
  }

  export type OrderSyncCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<OrderSyncCreateWithoutAttemptsInput, OrderSyncUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: OrderSyncCreateOrConnectWithoutAttemptsInput
    connect?: OrderSyncWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderSyncUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<OrderSyncCreateWithoutAttemptsInput, OrderSyncUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: OrderSyncCreateOrConnectWithoutAttemptsInput
    upsert?: OrderSyncUpsertWithoutAttemptsInput
    connect?: OrderSyncWhereUniqueInput
    update?: XOR<XOR<OrderSyncUpdateToOneWithWhereWithoutAttemptsInput, OrderSyncUpdateWithoutAttemptsInput>, OrderSyncUncheckedUpdateWithoutAttemptsInput>
  }

  export type OrderSyncCreateNestedOneWithoutJobsInput = {
    create?: XOR<OrderSyncCreateWithoutJobsInput, OrderSyncUncheckedCreateWithoutJobsInput>
    connectOrCreate?: OrderSyncCreateOrConnectWithoutJobsInput
    connect?: OrderSyncWhereUniqueInput
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type OrderSyncUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<OrderSyncCreateWithoutJobsInput, OrderSyncUncheckedCreateWithoutJobsInput>
    connectOrCreate?: OrderSyncCreateOrConnectWithoutJobsInput
    upsert?: OrderSyncUpsertWithoutJobsInput
    connect?: OrderSyncWhereUniqueInput
    update?: XOR<XOR<OrderSyncUpdateToOneWithWhereWithoutJobsInput, OrderSyncUpdateWithoutJobsInput>, OrderSyncUncheckedUpdateWithoutJobsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusFilter<$PrismaModel> | $Enums.SyncStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type SyncAttemptCreateWithoutOrderSyncInput = {
    id?: string
    attemptNumber: number
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    errorCategory?: string | null
    errorMessage?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncAttemptUncheckedCreateWithoutOrderSyncInput = {
    id?: string
    attemptNumber: number
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    errorCategory?: string | null
    errorMessage?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncAttemptCreateOrConnectWithoutOrderSyncInput = {
    where: SyncAttemptWhereUniqueInput
    create: XOR<SyncAttemptCreateWithoutOrderSyncInput, SyncAttemptUncheckedCreateWithoutOrderSyncInput>
  }

  export type SyncAttemptCreateManyOrderSyncInputEnvelope = {
    data: SyncAttemptCreateManyOrderSyncInput | SyncAttemptCreateManyOrderSyncInput[]
    skipDuplicates?: boolean
  }

  export type SyncJobCreateWithoutOrderSyncInput = {
    id?: string
    status?: $Enums.JobStatus
    attempts?: number
    nextRetryAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncJobUncheckedCreateWithoutOrderSyncInput = {
    id?: string
    status?: $Enums.JobStatus
    attempts?: number
    nextRetryAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncJobCreateOrConnectWithoutOrderSyncInput = {
    where: SyncJobWhereUniqueInput
    create: XOR<SyncJobCreateWithoutOrderSyncInput, SyncJobUncheckedCreateWithoutOrderSyncInput>
  }

  export type SyncJobCreateManyOrderSyncInputEnvelope = {
    data: SyncJobCreateManyOrderSyncInput | SyncJobCreateManyOrderSyncInput[]
    skipDuplicates?: boolean
  }

  export type SyncAttemptUpsertWithWhereUniqueWithoutOrderSyncInput = {
    where: SyncAttemptWhereUniqueInput
    update: XOR<SyncAttemptUpdateWithoutOrderSyncInput, SyncAttemptUncheckedUpdateWithoutOrderSyncInput>
    create: XOR<SyncAttemptCreateWithoutOrderSyncInput, SyncAttemptUncheckedCreateWithoutOrderSyncInput>
  }

  export type SyncAttemptUpdateWithWhereUniqueWithoutOrderSyncInput = {
    where: SyncAttemptWhereUniqueInput
    data: XOR<SyncAttemptUpdateWithoutOrderSyncInput, SyncAttemptUncheckedUpdateWithoutOrderSyncInput>
  }

  export type SyncAttemptUpdateManyWithWhereWithoutOrderSyncInput = {
    where: SyncAttemptScalarWhereInput
    data: XOR<SyncAttemptUpdateManyMutationInput, SyncAttemptUncheckedUpdateManyWithoutOrderSyncInput>
  }

  export type SyncAttemptScalarWhereInput = {
    AND?: SyncAttemptScalarWhereInput | SyncAttemptScalarWhereInput[]
    OR?: SyncAttemptScalarWhereInput[]
    NOT?: SyncAttemptScalarWhereInput | SyncAttemptScalarWhereInput[]
    id?: StringFilter<"SyncAttempt"> | string
    orderSyncId?: StringFilter<"SyncAttempt"> | string
    attemptNumber?: IntFilter<"SyncAttempt"> | number
    status?: EnumSyncStatusFilter<"SyncAttempt"> | $Enums.SyncStatus
    hubspotContactId?: StringNullableFilter<"SyncAttempt"> | string | null
    hubspotDealId?: StringNullableFilter<"SyncAttempt"> | string | null
    errorCategory?: StringNullableFilter<"SyncAttempt"> | string | null
    errorMessage?: StringNullableFilter<"SyncAttempt"> | string | null
    startedAt?: DateTimeFilter<"SyncAttempt"> | Date | string
    finishedAt?: DateTimeNullableFilter<"SyncAttempt"> | Date | string | null
  }

  export type SyncJobUpsertWithWhereUniqueWithoutOrderSyncInput = {
    where: SyncJobWhereUniqueInput
    update: XOR<SyncJobUpdateWithoutOrderSyncInput, SyncJobUncheckedUpdateWithoutOrderSyncInput>
    create: XOR<SyncJobCreateWithoutOrderSyncInput, SyncJobUncheckedCreateWithoutOrderSyncInput>
  }

  export type SyncJobUpdateWithWhereUniqueWithoutOrderSyncInput = {
    where: SyncJobWhereUniqueInput
    data: XOR<SyncJobUpdateWithoutOrderSyncInput, SyncJobUncheckedUpdateWithoutOrderSyncInput>
  }

  export type SyncJobUpdateManyWithWhereWithoutOrderSyncInput = {
    where: SyncJobScalarWhereInput
    data: XOR<SyncJobUpdateManyMutationInput, SyncJobUncheckedUpdateManyWithoutOrderSyncInput>
  }

  export type SyncJobScalarWhereInput = {
    AND?: SyncJobScalarWhereInput | SyncJobScalarWhereInput[]
    OR?: SyncJobScalarWhereInput[]
    NOT?: SyncJobScalarWhereInput | SyncJobScalarWhereInput[]
    id?: StringFilter<"SyncJob"> | string
    orderSyncId?: StringFilter<"SyncJob"> | string
    status?: EnumJobStatusFilter<"SyncJob"> | $Enums.JobStatus
    attempts?: IntFilter<"SyncJob"> | number
    nextRetryAt?: DateTimeNullableFilter<"SyncJob"> | Date | string | null
    createdAt?: DateTimeFilter<"SyncJob"> | Date | string
    updatedAt?: DateTimeFilter<"SyncJob"> | Date | string
  }

  export type OrderSyncCreateWithoutAttemptsInput = {
    id?: string
    orderId: string
    orderData: JsonNullValueInput | InputJsonValue
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    claimedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    jobs?: SyncJobCreateNestedManyWithoutOrderSyncInput
  }

  export type OrderSyncUncheckedCreateWithoutAttemptsInput = {
    id?: string
    orderId: string
    orderData: JsonNullValueInput | InputJsonValue
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    claimedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    jobs?: SyncJobUncheckedCreateNestedManyWithoutOrderSyncInput
  }

  export type OrderSyncCreateOrConnectWithoutAttemptsInput = {
    where: OrderSyncWhereUniqueInput
    create: XOR<OrderSyncCreateWithoutAttemptsInput, OrderSyncUncheckedCreateWithoutAttemptsInput>
  }

  export type OrderSyncUpsertWithoutAttemptsInput = {
    update: XOR<OrderSyncUpdateWithoutAttemptsInput, OrderSyncUncheckedUpdateWithoutAttemptsInput>
    create: XOR<OrderSyncCreateWithoutAttemptsInput, OrderSyncUncheckedCreateWithoutAttemptsInput>
    where?: OrderSyncWhereInput
  }

  export type OrderSyncUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: OrderSyncWhereInput
    data: XOR<OrderSyncUpdateWithoutAttemptsInput, OrderSyncUncheckedUpdateWithoutAttemptsInput>
  }

  export type OrderSyncUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobs?: SyncJobUpdateManyWithoutOrderSyncNestedInput
  }

  export type OrderSyncUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobs?: SyncJobUncheckedUpdateManyWithoutOrderSyncNestedInput
  }

  export type OrderSyncCreateWithoutJobsInput = {
    id?: string
    orderId: string
    orderData: JsonNullValueInput | InputJsonValue
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    claimedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    attempts?: SyncAttemptCreateNestedManyWithoutOrderSyncInput
  }

  export type OrderSyncUncheckedCreateWithoutJobsInput = {
    id?: string
    orderId: string
    orderData: JsonNullValueInput | InputJsonValue
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    claimedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
    attempts?: SyncAttemptUncheckedCreateNestedManyWithoutOrderSyncInput
  }

  export type OrderSyncCreateOrConnectWithoutJobsInput = {
    where: OrderSyncWhereUniqueInput
    create: XOR<OrderSyncCreateWithoutJobsInput, OrderSyncUncheckedCreateWithoutJobsInput>
  }

  export type OrderSyncUpsertWithoutJobsInput = {
    update: XOR<OrderSyncUpdateWithoutJobsInput, OrderSyncUncheckedUpdateWithoutJobsInput>
    create: XOR<OrderSyncCreateWithoutJobsInput, OrderSyncUncheckedCreateWithoutJobsInput>
    where?: OrderSyncWhereInput
  }

  export type OrderSyncUpdateToOneWithWhereWithoutJobsInput = {
    where?: OrderSyncWhereInput
    data: XOR<OrderSyncUpdateWithoutJobsInput, OrderSyncUncheckedUpdateWithoutJobsInput>
  }

  export type OrderSyncUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: SyncAttemptUpdateManyWithoutOrderSyncNestedInput
  }

  export type OrderSyncUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    orderData?: JsonNullValueInput | InputJsonValue
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: SyncAttemptUncheckedUpdateManyWithoutOrderSyncNestedInput
  }

  export type SyncAttemptCreateManyOrderSyncInput = {
    id?: string
    attemptNumber: number
    status?: $Enums.SyncStatus
    hubspotContactId?: string | null
    hubspotDealId?: string | null
    errorCategory?: string | null
    errorMessage?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncJobCreateManyOrderSyncInput = {
    id?: string
    status?: $Enums.JobStatus
    attempts?: number
    nextRetryAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncAttemptUpdateWithoutOrderSyncInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    errorCategory?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncAttemptUncheckedUpdateWithoutOrderSyncInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    errorCategory?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncAttemptUncheckedUpdateManyWithoutOrderSyncInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    hubspotContactId?: NullableStringFieldUpdateOperationsInput | string | null
    hubspotDealId?: NullableStringFieldUpdateOperationsInput | string | null
    errorCategory?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncJobUpdateWithoutOrderSyncInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncJobUncheckedUpdateWithoutOrderSyncInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncJobUncheckedUpdateManyWithoutOrderSyncInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}