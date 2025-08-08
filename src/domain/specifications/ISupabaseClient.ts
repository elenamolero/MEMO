export default interface ISupabaseClient {
  auth: any;
  from: (table: string) => any;
  storage: any;
  functions: any;
}
