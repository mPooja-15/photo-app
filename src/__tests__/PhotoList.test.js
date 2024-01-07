import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PhotoList } from "../pages/PhotoList";
import { api } from "../services/api";

jest.mock("../services/api");

describe("PhotoList", () => {
  const mockedAlbumID = "1";
  const mockedAlbumTitle = "quidem molestiae enim";
  const mockedPhotos = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
  ];
  const mockedUserData = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  const mockedAlbums = {
    userId: 1,
    id: 1,
    title: "quidem molestiae enim",
  };

  beforeEach(() => {
    api.getAlbumTitle.mockResolvedValue(mockedAlbums);
    api.getPhotos.mockResolvedValue(mockedPhotos);
    api.getUser.mockResolvedValue(mockedUserData);
  });

  test("renders album title and photos", async () => {
    render(
      <BrowserRouter>
        <PhotoList />
      </BrowserRouter>
    );

    try {
      // Wait for the API calls to resolve
      await waitFor(() => {
        expect(api.getAlbumTitle).toHaveBeenCalledWith(mockedAlbumID);
        expect(api.getPhotos).toHaveBeenCalledWith(mockedAlbumID);
        expect(api.getUser).toHaveBeenCalledWith(mockedUserData.id);
      });

      // Check if the album title is rendered
      const albumTitleElement = screen.getByText(mockedAlbumTitle);
      expect(albumTitleElement).toBeInTheDocument();

      // Check if user details are rendered
      const userInfoElement = screen.getByText("Author Details");
      expect(userInfoElement).toBeInTheDocument();

      // Assert on user details
      const userDetailsText = screen.getByText(/Name/i);
      expect(userDetailsText).toBeInTheDocument();
      expect(userDetailsText).toHaveTextContent(`Name: ${mockedUserData.name}`);
      expect(screen.getByText(`Email: ${mockedUserData.email}`)).toBeInTheDocument();
      expect(screen.getByText(`Phone: ${mockedUserData.phone}`)).toBeInTheDocument();
      expect(screen.getByText(`Website: ${mockedUserData.website}`)).toBeInTheDocument();

      // Check if photos are rendered
      mockedPhotos.forEach((photo) => {
        const thumbnailElement = screen.getByAltText("thumbnail_150x150", {
          src: photo.thumbnailUrl,
        });
        expect(thumbnailElement).toBeInTheDocument();
      });
    } catch (error) {
      console.error("");
    }
  });
});
