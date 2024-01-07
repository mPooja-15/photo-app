import axios from "axios"
const axiosInstance = axios.create({ baseURL: `https://jsonplaceholder.typicode.com/` })

export const api = {
  async getAlbums() {
    const response = await axiosInstance(`/albums`)
    return response.data
  },

  async getAlbumTitle(albumID) {
    const response = await axiosInstance(`/albums/${albumID}`)
    return response.data
  },

  async getPhotos(albumID) {
    const response = await axiosInstance(`albums/${albumID}/photos`)
    return response.data
  },

  async getPhoto(photoID) {
    const response = await axiosInstance(`/photos/${photoID}`)
    return response.data
  },
  async getUser(userId) {
    const response = await axiosInstance(`/users/${userId}`)
    return response.data
  }
}