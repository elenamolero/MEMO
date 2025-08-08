export default interface UseCase<Payload, Response> {
  execute(payload: Payload): Response;
}

export { UseCase };
