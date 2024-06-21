interface IRequest {
    label: string,
    base: string,
    likes: number,
    release_date: string,
    type: number,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    users_like: string,
    images: any
}
//0 - poems, 1 - stories, 2 - articles

export default IRequest;