interface IRequest {
    Label: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    Base: string,
    likes: number,
    users_likes?: string,
    date_release: string,
    Image: any
}

export default IRequest;