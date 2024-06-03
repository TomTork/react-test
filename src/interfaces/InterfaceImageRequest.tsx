interface ImageRequest {
    alternativeText?: string,
    caption?: string,
    createdAt?: string,
    ext?: string,
    formats?: any,
    hash: string,
    height: number,
    mime: string,
    name: string,
    previewUrl?: string,
    provider?: string,
    provider_metadata?: string,
    size?: number,
    updatedAt?: string,
    url: string,
    width: number
}

export default ImageRequest;