// types/next.d.ts
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PageProps<P = {}> = {
 params: P;
 searchParams?: Record<string, string | string[] | undefined>;
};
