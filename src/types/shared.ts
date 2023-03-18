export enum Status {
    True = "true",
    False = "false"
}

export type AnyQueryOptions = Record<
    string,
    string | string[] | number | number[] | boolean | undefined
  >;

export type ErrorResponse = {
    status: Status;
    description: string;
}