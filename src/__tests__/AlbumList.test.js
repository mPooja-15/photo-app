// AlbumList.test.js
import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AlbumList } from "../pages/AlbumList";
import { api } from "../services/api";

jest.mock("../services/api");

describe("AlbumList", () => {
  const mockedAlbums = [
    {
      userId: 1,
      id: 1,
      title: "quidem molestiae enim",
    },
  ];

  beforeEach(() => {
    api.getAlbums.mockResolvedValue(mockedAlbums);
  });

  test("renders albums list", async () => {
    render(
      <BrowserRouter>
        <AlbumList />
      </BrowserRouter>
    );

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(api.getAlbums).toHaveBeenCalledTimes(1);
    });

    // Check if the albums are rendered
    await mockedAlbums.forEach(async (album) => {
      const albumLink = await screen.findByText(album.title);
      expect(albumLink).toBeInTheDocument();
    });
  });

  test("navigates to album details page on album click", async () => {
    render(
      <BrowserRouter>
        <AlbumList />
      </BrowserRouter>
    );

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(api.getAlbums).toHaveBeenCalledTimes(1);
    });

    const albumLink = await screen.getByText("quidem molestiae enim");
    userEvent.click(albumLink);

    // Wait for the navigation to complete
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  // Add more test cases as needed
});
