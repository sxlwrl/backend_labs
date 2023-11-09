export default (body: unknown): boolean => {
    return typeof body !== 'string';
};