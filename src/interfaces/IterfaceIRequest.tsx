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
    images?: any
}
//0 - poems, 1 - stories, 2 - articles
//http://localhost:1337/api/contents?filters[id][$in]=3 - взять только по одному id
//http://localhost:1337/api/contents?populate=*&filters[type][$in]=2 - сортировка по type

export default IRequest;